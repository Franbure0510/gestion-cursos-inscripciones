const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');

exports.createEnrollment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user._id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    if (!course.isActive) {
      return res.status(400).json({ message: 'El curso no está activo' });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
    }

    const enrollmentCount = await Enrollment.countDocuments({ course: courseId, status: 'active' });

    if (enrollmentCount >= course.maxStudents) {
      return res.status(400).json({ message: 'El curso ha alcanzado su límite de estudiantes' });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });

    course.currentStudents = (course.currentStudents || 0) + 1;
    await course.save();

    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate('student', 'name email')
      .populate('course', 'title description schedule');

    res.status(201).json(populatedEnrollment);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
    }
    res.status(500).json({ message: 'Error al crear inscripción', error: error.message });
  }
};

exports.getEnrollments = async (req, res) => {
  try {
    const { student, course, status } = req.query;

    const query = {};

    if (student) query.student = student;
    if (course) query.course = course;
    if (status) query.status = status;

    const enrollments = await Enrollment.find(query)
      .populate('student', 'name email')
      .populate('course', 'title description schedule duration')
      .sort({ enrollmentDate: -1 });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inscripciones', error: error.message });
  }
};

exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('student', 'name email')
      .populate('course', 'title description schedule duration');

    if (!enrollment) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inscripción', error: error.message });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const { status, grade } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    if (status) enrollment.status = status;
    if (grade !== undefined) enrollment.grade = grade;

    const updatedEnrollment = await enrollment.save();

    const populatedEnrollment = await Enrollment.findById(updatedEnrollment._id)
      .populate('student', 'name email')
      .populate('course', 'title description schedule');

    res.json(populatedEnrollment);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar inscripción', error: error.message });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    if (req.user.role !== 'admin' && enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta inscripción' });
    }

    if (enrollment.status !== 'cancelled') {
      const course = await Course.findById(enrollment.course);
      if (course && course.currentStudents > 0) {
        course.currentStudents -= 1;
        await course.save();
      }
    }

    await enrollment.deleteOne();

    res.json({ message: 'Inscripción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar inscripción', error: error.message });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate('course', 'title description category level instructor duration price currentStudents maxStudents')
      .sort({ enrollmentDate: -1 });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tus inscripciones', error: error.message });
  }
};