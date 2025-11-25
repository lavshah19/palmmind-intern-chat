import { Router } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect); // All routes are protected

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;