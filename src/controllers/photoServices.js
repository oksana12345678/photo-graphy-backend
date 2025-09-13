import {
  createPhotoService,
  getAllServices,
} from '../services/photoServices.js';

export const getAllServicesController = async (req, res) => {
  const services = await getAllServices();
  res.status(200).json({
    data: services,
  });
};

export const createPhotoServiceController = async (req, res) => {
  const service = await createPhotoService(req.body);
  res.status(201).json({
    message: 'Service created successfully',
    data: service,
  });
};
