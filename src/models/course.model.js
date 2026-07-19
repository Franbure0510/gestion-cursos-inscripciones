const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del curso es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [2000, 'La descripción no puede exceder 2000 caracteres']
  },
  instructor: {
    type: String,
    required: [true, 'El instructor es requerido'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
    trim: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: String,
    required: [true, 'La duración es requerida']
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'El precio no puede ser negativo']
  },
  maxStudents: {
    type: Number,
    default: 30,
    min: [1, 'Debe permitir al menos 1 estudiante']
  },
  currentStudents: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  syllabus: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

courseSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Course', courseSchema);