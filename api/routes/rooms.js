import express from 'express';
import { createRoom, deletRoom, getAllRoom, getRoom, updateAvailabilityRoom, updateRoom } from '../controllers/room.js';
import { verifyIsAdmin } from '../verifyToken.js';

const router = express.Router()


router.post('/:hotelid', verifyIsAdmin, createRoom)

router.put('/:id', verifyIsAdmin, updateRoom)
router.put('/availability/:id', updateAvailabilityRoom)
router.delete('/:id/:hotelid', verifyIsAdmin, deletRoom)
router.get('/:id', getRoom)
router.get('/', getAllRoom)

export default router