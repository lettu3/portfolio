import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    title: $localize`Generación de Contenido con IA`,
    description: $localize`Módulo de generación de contenido visual con inteligencia artificial, desarrollado en Inverte. Integra la API de OpenAI para generación de imágenes, creación de logos con vectorización automática a SVG y virtual staging de propiedades (amueblado y limpieza de fotos con IA). Incluye presets de estilo, enriquecimiento automático de contexto con datos del proyecto y sistema de metering con límites mensuales por usuario.`,
    techStack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'OpenAI API', 'PostgreSQL'],
    imageUrl: 'assets/projects/inverte-ai.webp',
    category: 'fullstack',
    featured: true,
  },
    {
    title: $localize`CRM Inmobiliario`,
    description: $localize`Módulo CRM inmobiliario full-stack desarrollado en Inverte. Incluye tablero Kanban drag & drop para seguimiento de leads con distintos estados, libreta de contactos con búsqueda y filtrado, registro de actividades por lead y generación automática de leads cuando los clientes se contactan desde las planimetrías web — integrando el frontend 3D con el pipeline comercial mediante API REST segura con API Keys.`,
    techStack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL'],
    imageUrl: 'assets/projects/inverte-crm.webp',
    category: 'fullstack',
    featured: true,
  },
  {
    title: $localize`Planimetría Interactiva de Edificio`,
    description: $localize`Aplicación web profesional desarrollada en Inverte para visualización inmobiliaria. Integra un modelo 3D WebGL del edificio (PlayCanvas) con una vista panorámica 360° del entorno y actualizaciones de disponibilidad en tiempo real vía WebSockets. Permite consultar unidades, ver estados (disponible, reservado, vendido, etc.) y contactar brokers, todo desde un entorno 3D inmersivo.`,
    techStack: ['React', 'TypeScript', 'PlayCanvas', 'Redux', 'WebSockets', 'Vite'],
    imageUrl: 'assets/projects/edificio.webp',
    demoUrl: 'https://apps.mundoinverte.com/caldenchacabuco/',
    category: 'frontend',
    featured: true,
  },
  {
    title: $localize`El Switcher`,
    description: $localize`Desarrollo del juego de mesa "El Switcher" usando metodología ágil SCRUM. División frontend/backend con equipo de 6 integrantes para la materia Ingeniería del Software I.`,
    techStack: ['React', 'Python', 'SQLite', 'SCRUM'],
    imageUrl: 'assets/projects/el-switcher.webp',
    category: 'fullstack',
    featured: true
  },
  {
    title: $localize`Java RSS Pipeline`,
    description: $localize`Pipeline de extracción de datos de feeds RSS de noticias que computa entidades nombradas. Incluye implementación paralela con Apache Spark para procesamiento distribuido.`,
    techStack: ['Java', 'Apache Spark', 'RSS', 'NER'],
    imageUrl: 'assets/projects/rss-pipeline.webp',
    repoUrl: 'https://github.com/lettu3/Paradigmas-Programacion24',
    category: 'data',
    featured: true
  },
  {
    title: $localize`Escher DSL`,
    description: $localize`Diseño e implementación de un DSL en Haskell que permite generar figuras recursivas al estilo de M.C. Escher, componiendo transformaciones geométricas sobre figuras base.`,
    techStack: ['Haskell', 'DSL', 'Programación Funcional'],
    imageUrl: 'assets/projects/escher-dsl.webp',
    repoUrl: 'https://github.com/lettu3/Paradigmas-Programacion24',
    category: 'functional',
    featured: true
  },
  {
    title: $localize`MyBash`,
    description: $localize`Codificación de un shell al estilo Bash en C. Soporta ejecución de comandos en foreground y background, redirección de entrada/salida estándar, y pipes entre comandos.`,
    techStack: ['C', 'POSIX', 'Shell', 'Unix'],
    imageUrl: 'assets/projects/mybash.webp',
    repoUrl: 'https://github.com/lettu3/Sistemas-Operativos23/tree/main/LAB1',
    category: 'systems',
    featured: true
  },
  {
    title: $localize`ARM Videogame`,
    description: $localize`Implementación del clásico juego del dinosaurio de Google Chrome en LEGv8 Assembly. Proyecto académico de Organización del Computador usando framebuffer en QEMU emulando una Raspberry Pi.`,
    techStack: ['LEGv8 Assembly', 'QEMU', 'Raspberry Pi', 'Framebuffer'],
    imageUrl: 'assets/projects/arm-videogame.webp',
    repoUrl: 'https://github.com/lettu3/OC-ARMv8',
    category: 'systems',
    featured: true
  },
];
