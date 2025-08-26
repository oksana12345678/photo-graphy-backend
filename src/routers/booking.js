import { Router } from 'express';
import {
  createBookingRequestController,
  getAllBookingsController,
} from '../controllers/booking.js';

export const booking = Router();

booking.post('/', createBookingRequestController);

booking.get('/', getAllBookingsController);
