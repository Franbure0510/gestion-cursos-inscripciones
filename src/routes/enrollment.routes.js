const express = require('express');
const router = express.Router();
const {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  getMyEnrollments
} = require('../controllers/enrollment.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.get('/my-enrollments', protect, getMyEnrollments);

router.get('/', protect, authorize('admin', 'teacher'), getEnrollments);
router.get('/all', protect, authorize('admin', 'teacher'), getEnrollments);
router.get('/:id', protect, getEnrollmentById);
router.post('/', protect, authorize('student'), createEnrollment);
router.put('/:id', protect, authorize('admin', 'teacher'), updateEnrollment);
router.delete('/:id', protect, deleteEnrollment);

module.exports = router;