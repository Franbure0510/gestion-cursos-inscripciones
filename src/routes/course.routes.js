const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getTeacherCourses
} = require('../controllers/course.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.get('/teacher/my-courses', protect, authorize('teacher'), getTeacherCourses);

router.get('/', protect, getCourses);
router.get('/:id', protect, getCourseById);
router.post('/', protect, authorize('admin', 'teacher'), createCourse);
router.put('/:id', protect, authorize('admin', 'teacher'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;