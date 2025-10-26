import {
  createPage,
  getPages,
  getPageById,
  getPageBySlug,
  updatePage,
  deletePage,
} from '../repositories/PageRepository.js';

export const createPageService = async (data) => {
  return await createPage(data);
};

export const listPagesService = async () => {
  return await getPages();
};

export const getPageByIdService = async (id) => {
  const page = await getPageById(id);
  if (!page) throw new Error('Page not found');
  return page;
};

export const getPageBySlugService = async (slug) => {
  const page = await getPageBySlug(slug);
  if (!page) throw new Error('Page not found');
  return page;
};

export const updatePageService = async (id, data) => {
  const page = await updatePage(id, data);
  if (!page) throw new Error('Page not found');
  return page;
};

export const deletePageService = async (id) => {
  const page = await deletePage(id);
  if (!page) throw new Error('Page not found');
  return { message: 'Page deleted' };
};

