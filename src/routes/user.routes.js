const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  getUserStats
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

router.get('/', protect, authorize('admin'), getUsers);
router.get('/stats', protect, authorize('admin'), getUserStats);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, authorize('admin', 'teacher'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;