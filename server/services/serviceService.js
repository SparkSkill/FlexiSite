import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from '../repositories/ServiceRepository.js';

export const createServiceService = async (data) => {
  return await createService(data);
};

export const listServicesService = async () => {
  return await getServices();
};

export const getServiceByIdService = async (id) => {
  const service = await getServiceById(id);
  if (!service) throw new Error('Service not found');
  return service;
};

export const updateServiceService = async (id, data) => {
  const service = await updateService(id, data);
  if (!service) throw new Error('Service not found');
  return service;
};

export const deleteServiceService = async (id) => {
  const service = await deleteService(id);
  if (!service) throw new Error('Service not found');
  return { message: 'Service deleted' };
};

