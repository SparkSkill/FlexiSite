import Service from '../models/Service.js';

export const createService = async (data) => {
  const service = new Service(data);
  return await service.save();
};

export const getServices = async () => {
  return await Service.find().sort({ createdAt: -1 });
};

export const getServiceById = async (id) => {
  return await Service.findById(id);
};

export const updateService = async (id, data) => {
  return await Service.findByIdAndUpdate(id, data, { new: true });
};

export const deleteService = async (id) => {
  return await Service.findByIdAndDelete(id);
};

