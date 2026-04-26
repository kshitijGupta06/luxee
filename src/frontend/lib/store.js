'use client';

const STORAGE_KEYS = {
  CART: 'emkay_cart',
  USER: 'emkay_user',
  ADMIN: 'emkay_admin',
};

function getFromStorage(key) {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function setToStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Failed to save to localStorage');
  }
}

// === CART (stays in localStorage — user-local) ===
export function getCart() {
  return getFromStorage(STORAGE_KEYS.CART) || [];
}

export function addToCart(product, quantity = 1, customization = {}) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item =>
    item.productId === product.id &&
    JSON.stringify(item.customization) === JSON.stringify(customization)
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      slug: product.slug,
      quantity,
      customization
    });
  }

  setToStorage(STORAGE_KEYS.CART, cart);
  window.dispatchEvent(new Event('cartUpdated'));
  return cart;
}

export function updateCartQuantity(index, quantity) {
  const cart = getCart();
  if (quantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quantity;
  }
  setToStorage(STORAGE_KEYS.CART, cart);
  window.dispatchEvent(new Event('cartUpdated'));
  return cart;
}

export function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  setToStorage(STORAGE_KEYS.CART, cart);
  window.dispatchEvent(new Event('cartUpdated'));
  return cart;
}

export function clearCart() {
  setToStorage(STORAGE_KEYS.CART, []);
  window.dispatchEvent(new Event('cartUpdated'));
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// === USER AUTH (API-backed, session stored in localStorage) ===
export function getUser() {
  return getFromStorage(STORAGE_KEYS.USER);
}

export async function registerUser(userData) {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    if (data.success) {
      setToStorage(STORAGE_KEYS.USER, data.user);
      window.dispatchEvent(new Event('authUpdated'));
    }

    return data;
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success) {
      setToStorage(STORAGE_KEYS.USER, data.user);
      window.dispatchEvent(new Event('authUpdated'));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed. Please try again.' };
  }
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  window.dispatchEvent(new Event('authUpdated'));
}

export function updateUserAddress(address) {
  const user = getUser();
  if (!user) return;
  user.addresses = user.addresses || [];
  user.addresses.push(address);
  setToStorage(STORAGE_KEYS.USER, user);
}

// === ORDERS (API-backed) ===
export async function createOrder(orderData) {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();

    if (data.success) {
      return { id: data.order.id, ...data.order };
    }

    return null;
  } catch (error) {
    console.error('Create order error:', error);
    return null;
  }
}

export async function getUserOrders() {
  const user = getUser();
  if (!user) return [];

  try {
    const res = await fetch(`/api/orders?userId=${user.id}`);
    const data = await res.json();
    return data.success ? data.orders : [];
  } catch (error) {
    console.error('Fetch orders error:', error);
    return [];
  }
}

export async function updateOrderStatus(orderId, status, note = '') {
  const admin = getFromStorage(STORAGE_KEYS.ADMIN);
  if (!admin?.loggedIn) return null;

  try {
    const res = await fetch(`/api/orders/${orderId}?adminKey=${admin.password}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note }),
    });
    const data = await res.json();
    return data.success ? data.order : null;
  } catch (error) {
    console.error('Update order error:', error);
    return null;
  }
}

// === CUSTOM ORDERS (API-backed) ===
export async function createCustomOrder(data) {
  try {
    const res = await fetch('/api/custom-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.success) {
      return { id: result.order.id, ...result.order };
    }

    return null;
  } catch (error) {
    console.error('Custom order error:', error);
    return null;
  }
}

export async function getCustomOrders() {
  const admin = getFromStorage(STORAGE_KEYS.ADMIN);
  if (!admin?.loggedIn) return [];

  try {
    const res = await fetch(`/api/custom-orders?adminKey=${admin.password}`);
    const data = await res.json();
    return data.success ? data.orders : [];
  } catch (error) {
    console.error('Fetch custom orders error:', error);
    return [];
  }
}

// === ADMIN ===
const ADMIN_CREDENTIALS = { email: 'admin@emkayhome.in', password: 'admin123' };

export function adminLogin(email, password) {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    setToStorage(STORAGE_KEYS.ADMIN, { loggedIn: true, email, password });
    return { success: true };
  }
  return { success: false, message: 'Invalid admin credentials' };
}

export function isAdminLoggedIn() {
  const admin = getFromStorage(STORAGE_KEYS.ADMIN);
  return admin?.loggedIn === true;
}

export function adminLogout() {
  localStorage.removeItem(STORAGE_KEYS.ADMIN);
}
