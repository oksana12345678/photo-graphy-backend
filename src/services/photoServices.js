import ServicesModel from '../db/models/services.js';

export const getAllServices = () => {
  return ServicesModel.find({});
};

export const createPhotoService = (servicesData) => {
  return ServicesModel.create(servicesData);
};
