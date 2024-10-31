import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/', login);

// add logout
// router.post('/logout', authenticate, logout); // Exemplo para logout

export default router;
