'use client';
import { useState, useEffect } from 'react';

let toastId = 0;
const listeners = new Set();

export function showToast(message, type = 'success') {
  const toast = { id: ++toastId, message, type };
  listeners.forEach(fn => fn(toast));
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (toast) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    };

    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
