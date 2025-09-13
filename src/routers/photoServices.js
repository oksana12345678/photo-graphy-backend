import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createPhotoServiceController,
  getAllServicesController,
} from '../controllers/photoServices.js';

export const photoService = Router();

photoService.post('/create', ctrlWrapper(createPhotoServiceController));

photoService.get('/', ctrlWrapper(getAllServicesController));
