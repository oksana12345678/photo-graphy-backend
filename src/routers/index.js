import { Router } from 'express';
import { booking } from './booking.js';

const router = Router();

router.use('/booking', booking);

export default router;
