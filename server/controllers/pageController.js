import {
  createPageService,
  listPagesService,
  getPageByIdService,
  getPageBySlugService,
  updatePageService,
  deletePageService,
} from '../services/pageService.js';

export const createPage = async (req, res) => {
  try {
    const page = await createPageService(req.body);
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPages = async (_req, res) => {
  try {
    const pages = await listPagesService();
    res.json(pages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPageById = async (req, res) => {
  try {
    const page = await getPageByIdService(req.params.id);
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPageBySlug = async (req, res) => {
  try {
    const page = await getPageBySlugService(req.params.slug);
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePage = async (req, res) => {
  try {
    const page = await updatePageService(req.params.id, req.body);
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePage = async (req, res) => {
  try {
    const result = await deletePageService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

