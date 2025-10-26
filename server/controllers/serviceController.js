import {
  createServiceService,
  listServicesService,
  getServiceByIdService,
  updateServiceService,
  deleteServiceService,
} from '../services/serviceService.js';

export const createService = async (req, res) => {
  try {
    const service = await createServiceService(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getServices = async (_req, res) => {
  try {
    const services = await listServicesService();
    res.json(services);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await getServiceByIdService(req.params.id);
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await updateServiceService(req.params.id, req.body);
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const result = await deleteServiceService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

