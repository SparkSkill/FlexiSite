import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  type: { type: String, default: 'text' }, // e.g. hero, text, image, etc.
  heading: String,
  content: String,
  image: String,
});

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // Display name
    slug: { type: String, required: true, unique: true }, // Used in URL, e.g. "home"
    sections: [sectionSchema], // Flexible sections per page
    meta: {
      description: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Page', pageSchema);
