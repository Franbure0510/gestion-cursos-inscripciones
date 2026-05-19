const Course = require('../models/course.model');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration, teacher, schedule, maxStudents } = req.body;

    const course = await Course.create({
      title,
      description,
      duration,
      teacher,
      schedule,
      maxStudents
    });

    res.status(201).json(course);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error al crear curso', error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const { isActive } = req.query;

    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const courses = await Course.find(query)
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos', error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener curso', error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, duration, schedule, maxStudents, isActive } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (duration) course.duration = duration;
    if (schedule) course.schedule = schedule;
    if (maxStudents) course.maxStudents = maxStudents;
    if (isActive !== undefined) course.isActive = isActive;

    const updatedCourse = await course.save();

    res.json(updatedCourse);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error al actualizar curso', error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    await course.deleteOne();

    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar curso', error: error.message });
  }
};

exports.getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id })
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos del docente', error: error.message });
  }
};