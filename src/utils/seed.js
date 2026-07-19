require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Course = require('../models/course.model');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    await User.deleteMany({});
    await Course.deleteMany({});

    const admin = await User.create({
      name: 'Administrador',
      email: 'admin@coursehub.com',
      password: 'admin123',
      role: 'admin'
    });

    const student = await User.create({
      name: 'Juan Estudiante',
      email: 'student@coursehub.com',
      password: 'student123',
      role: 'student'
    });

    const courses = await Course.insertMany([
      {
        title: 'Introducción a JavaScript',
        description: 'Aprende los fundamentos de JavaScript desde cero. Variables, funciones, objetos, arrays y más.',
        instructor: 'Carlos García',
        category: 'Programación',
        level: 'beginner',
        duration: '40 horas',
        price: 0,
        maxStudents: 50,
        syllabus: ['Variables y tipos de datos', 'Funciones', 'Arrays y objetos', 'DOM y eventos']
      },
      {
        title: 'Angular Avanzado',
        description: 'Domina Angular con RxJS, NgRx, Lazy Loading y buenas prácticas empresariales.',
        instructor: 'María López',
        category: 'Frontend',
        level: 'advanced',
        duration: '60 horas',
        price: 199.99,
        maxStudents: 30,
        syllabus: ['Componentes avanzados', 'RxJS y Observables', 'NgRx State Management', 'Testing']
      },
      {
        title: 'React y Hooks',
        description: 'Construye aplicaciones modernas con React, Hooks, Context API y React Router.',
        instructor: 'Pedro Martínez',
        category: 'Frontend',
        level: 'intermediate',
        duration: '50 horas',
        price: 149.99,
        maxStudents: 40,
        syllabus: ['JSX y componentes', 'Hooks personalizados', 'Context API', 'React Router']
      },
      {
        title: 'Node.js y Express',
        description: 'Desarrollo de APIs REST con Node.js, Express, MongoDB y autenticación JWT.',
        instructor: 'Ana Rodríguez',
        category: 'Backend',
        level: 'intermediate',
        duration: '45 horas',
        price: 179.99,
        maxStudents: 35,
        syllabus: ['Express y routing', 'MongoDB y Mongoose', 'Autenticación JWT', 'Deploy']
      },
      {
        title: 'Next.js Completo',
        description: 'SSR, SSG, ISR y todo lo que necesitas para dominar Next.js en producción.',
        instructor: 'Luis Hernández',
        category: 'Fullstack',
        level: 'advanced',
        duration: '55 horas',
        price: 229.99,
        maxStudents: 25,
        syllabus: ['Pages Router', 'App Router', 'SSR/SSG', 'API Routes']
      },
      {
        title: 'TypeScript desde cero',
        description: 'Aprende TypeScript para escribir código más seguro y mantenible.',
        instructor: 'Carlos García',
        category: 'Programación',
        level: 'beginner',
        duration: '30 horas',
        price: 0,
        maxStudents: 60,
        syllabus: ['Tipos básicos', 'Interfaces y tipos', 'Generics', 'Decorators']
      }
    ]);

    console.log('Seed completado:');
    console.log('  Admin: admin@coursehub.com / admin123');
    console.log('  Student: student@coursehub.com / student123');
    console.log(`  ${courses.length} cursos creados`);

    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
};

seed();
