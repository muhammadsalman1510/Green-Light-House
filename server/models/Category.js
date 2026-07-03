import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const CategorySchema = new Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, default: '' },
  image:       { type: String, default: null },
  bgColor:     { type: String, default: '#0E1A0B' },
  parent:      { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  order:       { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

CategorySchema.index({ parent: 1 });

export default models.Category || model('Category', CategorySchema);
