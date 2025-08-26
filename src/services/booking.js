import BookingModel from '../db/models/booking.js';

export const createBookingRequest = (bookingData) => {
  return BookingModel.create(bookingData);
};

export const getAllBookings = () => {
  return BookingModel.find();
};
