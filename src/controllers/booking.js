import {
  createBookingRequest,
  getAllBookings,
  getBookingByEmail,
} from '../services/booking.js';
import { getAllSchedules } from '../services/schedule.js';
import dayjs from 'dayjs';

export const createBookingRequestController = async (req, res) => {
  const { email } = req.body;

  const existingBookingByEmail = await getBookingByEmail(email);

  if (existingBookingByEmail) {
    return res.status(400).json({
      success: false,
      message: 'Booking with this email already exists',
    });
  }

  const booking = await createBookingRequest(req.body);

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking,
  });
};

export const getAllBookingsController = async (req, res) => {
  const bookings = await getAllBookings();

  res.status(200).json({
    success: true,
    data: bookings,
  });
};

export const getBookedCalendarController = async (req, res) => {
  console.log(req.query);
  try {
    const booked = await getAllBookings();
    const scheduledDates = await getAllSchedules();

    const serviceDuration = req.query.time ? parseInt(req.query.time, 10) : 60;

    const bookedSlots = booked.map((item) => ({
      date: dayjs(item.sessionDate).format('YYYY-MM-DD'),
      startTime: item.time,
      duration: serviceDuration,
      user: { name: item.name, email: item.email, phone: item.phone },
    }));

    const updatedSchedule = scheduledDates.map((schedule) => {
      const scheduleDate = dayjs(schedule.date).format('YYYY-MM-DD');

      // генеруємо слоти між time_from і time_to
      const slots = [];
      let current = dayjs(
        `${scheduleDate} ${schedule.time_from}`,
        'YYYY-MM-DD HH:mm',
      );
      const end = dayjs(
        `${scheduleDate} ${schedule.time_to}`,
        'YYYY-MM-DD HH:mm',
      );

      while (current.isBefore(end)) {
        slots.push(current.format('HH:mm'));
        current = current.add(serviceDuration, 'minute');
      }

      // позначаємо заброньовані
      const hoursWithStatus = slots.map((slot) => {
        let isBooked = false;
        let bookedUser = null;

        bookedSlots.forEach((b) => {
          const start = dayjs(`${b.date} ${b.startTime}`, 'YYYY-MM-DD HH:mm');
          const end = start.add(b.duration, 'minute');
          const current = dayjs(`${b.date} ${slot}`, 'YYYY-MM-DD HH:mm');

          if (
            current.isSame(start) ||
            (current.isAfter(start) && current.isBefore(end))
          ) {
            isBooked = true;
            bookedUser = b.user;
          }
        });

        return isBooked
          ? { hour: slot, booked: true, user: bookedUser }
          : { hour: slot, booked: false };
      });

      return {
        ...schedule._doc,
        time: hoursWithStatus,
      };
    });

    res.status(200).json({
      data: updatedSchedule,
    });
  } catch (error) {
    console.error('Error in getBookedCalendarController:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні даних календаря',
      error: error.message || error,
    });
  }
};
