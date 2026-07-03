import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const OrderItemSchema = new Schema({
  product:   { type: Schema.Types.ObjectId, ref: 'Product' },
  name:      { type: String, required: true },
  sku:       { type: String, default: '' },
  price:     { type: Number, required: true },
  salePrice: { type: Number, default: null },
  qty:       { type: Number, required: true, min: 1 },
  image:     { type: String, default: '' },
}, { _id: false });

const OrderSchema = new Schema({
  customer: {
    name:  { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city:  { type: String, required: true, trim: true },
    notes: { type: String, default: '' },
  },
  items:   { type: [OrderItemSchema], required: true },
  total:   { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['new', 'processing', 'completed', 'cancelled'],
    default: 'new',
  },
  whatsappSent: { type: Boolean, default: false },
  orderNumber:  { type: String, unique: true },
}, { timestamps: true });

OrderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `GLH-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default models.Order || model('Order', OrderSchema);
