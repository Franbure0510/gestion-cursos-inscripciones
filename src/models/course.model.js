const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del curso es requerido'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  duration: {
    type: Number,
    required: [true, 'La duración es requerida'],
    min: [1, 'La duración debe ser al menos 1 hora']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El docente es requerido']
  },
  schedule: {
    type: String,
    required: [true, 'El horario es requerido']
  },
  maxStudents: {
    type: Number,
    default: 30,
    min: [1, 'Debe permitir al menos 1 estudiante']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);