import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  originalPrice: Number,
  image: String,
  slug: String,
  quantity: Number,
  customization: {
    name: String,
    date: String,
    message: String,
  },
}, { _id: false });

const TimelineEntrySchema = new mongoose.Schema({
  status: String,
  date: { type: Date, default: Date.now },
  note: String,
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    default: 'guest',
  },
  items: [OrderItemSchema],
  shipping: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  subtotal: Number,
  shippingCost: Number,
  total: Number,
  paymentMethod: {
    type: String,
    default: 'razorpay',
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  timeline: [TimelineEntrySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
