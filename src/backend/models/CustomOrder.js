import mongoose from 'mongoose';

const CustomOrderSchema = new mongoose.Schema({
  queryId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    default: '',
  },
  personName: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'approved', 'completed', 'cancelled'],
    default: 'pending',
  },
  adminNotes: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CustomOrder || mongoose.model('CustomOrder', CustomOrderSchema);
