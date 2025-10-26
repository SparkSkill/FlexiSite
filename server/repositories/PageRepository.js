import Page from '../models/Page.js';

export const createPage = async (data) => {
  const page = new Page(data);
  return await page.save();
};

export const getPages = async () => {
  return await Page.find().sort({ createdAt: -1 });
};

export const getPageById = async (id) => {
  return await Page.findById(id);
};

export const getPageBySlug = async (slug) => {
  return await Page.findOne({ slug });
};

export const updatePage = async (id, data) => {
  return await Page.findByIdAndUpdate(id, data, { new: true });
};

export const deletePage = async (id) => {
  return await Page.findByIdAndDelete(id);
};

