const Course = require('../models/course.model');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, category, level, duration, price, maxStudents, syllabus, isActive } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor,
      category,
      level,
      duration,
      price,
      maxStudents,
      syllabus,
      isActive
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
    const { isActive, search, category, level, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    if (category) {
      query.category = category;
    }
    if (level) {
      query.level = level;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      courses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos', error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

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
    const { title, description, instructor, category, level, duration, price, maxStudents, syllabus, isActive } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (instructor !== undefined) course.instructor = instructor;
    if (category !== undefined) course.category = category;
    if (level !== undefined) course.level = level;
    if (duration !== undefined) course.duration = duration;
    if (price !== undefined) course.price = price;
    if (maxStudents !== undefined) course.maxStudents = maxStudents;
    if (syllabus !== undefined) course.syllabus = syllabus;
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

exports.getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

exports.getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.name })
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos del docente', error: error.message });
  }
};