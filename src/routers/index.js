import { Router } from 'express';
import { booking } from './booking.js';
import { schedule } from './schedule.js';
import { photoService } from './photoServices.js';

const router = Router();

router.use('/booking', booking);
router.use('/schedule', schedule);
router.use('/services', photoService);
export default router;
