import express from 'express';
import { signup, login, getMe, toggleFavorite } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getMe);
router.post('/favorites/:productId', auth, toggleFavorite);

export default router;
