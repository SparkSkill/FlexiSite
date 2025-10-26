import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'FlexiSite' },
    logoUrl: String,
    contactEmail: String,
    phone: String,
    address: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
