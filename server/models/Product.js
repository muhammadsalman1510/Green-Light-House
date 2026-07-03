import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const SpecsSchema = new Schema({
  wattage:    String,
  lumens:     String,
  colorTemp:  String,
  fitting:    String,
  ipRating:   String,
  dimensions: String,
  material:   String,
  dimmable:   Boolean,
  warranty:   String,
}, { _id: false });

const ProductSchema = new Schema({
  name:         { type: String, required: true, trim: true },
  slug:         { type: String, required: true, unique: true, lowercase: true, trim: true },
  sku:          { type: String, default: '' },
  shortDesc:    { type: String, default: '' },
  description:  { type: String, default: '' },
  category:     { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  images:       { type: [String], default: [] },
  price:        { type: Number, required: true, min: 0 },
  salePrice:    { type: Number, default: null },
  stockStatus:  {
    type: String,
    enum: ['inStock', 'outOfStock', 'limitedStock'],
    default: 'inStock',
  },
  isFeatured:   { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isActive:     { type: Boolean, default: true },
  specs:        { type: SpecsSchema, default: () => ({}) },
  avgRating:    { type: Number, default: 0, min: 0, max: 5 },
  reviewCount:  { type: Number, default: 0, min: 0 },
}, { timestamps: true });

ProductSchema.index({ category: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ isNewArrival: 1 });
ProductSchema.index({ price: 1 });

export default models.Product || model('Product', ProductSchema);
