import { createBookingRequest, getAllBookings } from '../services/booking.js';

export const createBookingRequestController = async (req, res) => {
  try {
    const booking = await createBookingRequest({ ...req.body });

    res.status(201).json({
      message: 'Бронювання успішно створено',
      data: booking,
    });
  } catch (error) {
    console.error('Booking error:', error);

    res.status(500).json({
      message: 'Помилка при створенні бронювання',
      error: error.message || error,
    });
  }
};

export const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await getAllBookings();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('Get bookings error:', error);

    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні бронювань',
      error: error.message || error,
    });
  }
};
