import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const ReviewSchema = new Schema({
  product:    { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name:       { type: String, required: true, trim: true },
  city:       { type: String, default: '', trim: true },
  rating:     { type: Number, required: true, min: 1, max: 5 },
  title:      { type: String, default: '', trim: true },
  body:       { type: String, required: true, trim: true, minlength: 10 },
  photos:     { type: [String], default: [] },
  isApproved: { type: Boolean, default: false },
  adminReply: { type: String, default: '' },
}, { timestamps: true });

ReviewSchema.index({ product: 1, isApproved: 1 });

export default models.Review || model('Review', ReviewSchema);
