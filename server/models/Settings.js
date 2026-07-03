import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const SettingsSchema = new Schema({
  storeName:       { type: String, default: 'Green Light House' },
  tagline:         { type: String, default: 'Illuminating beautiful spaces since 2019.' },
  address:         { type: String, default: 'Shop 7, 10-1-BII, Khokhar Chowk, College Road, Township, Lahore' },
  phone:           { type: String, default: '0323-4641691' },
  whatsappNumbers: { type: [String], default: ['923234641691'] },
  businessHours:   { type: String, default: 'Monday – Saturday, 10:00 AM – 8:00 PM' },
  deliveryPolicy:  { type: String, default: '' },
  aboutText:       { type: String, default: '' },
  mapEmbedUrl:     { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: 'https://www.instagram.com/greenlight.lhr' },
    facebook:  { type: String, default: 'https://www.facebook.com/greeenlighthouse' },
    tiktok:    { type: String, default: 'https://www.tiktok.com/@greeenlighthouse' },
    youtube:   { type: String, default: 'https://www.youtube.com/@greeenlighthouse' },
  },
}, { timestamps: true });

export default models.Settings || model('Settings', SettingsSchema);
