/**
 * ============================================================================
 * VIBRA — CONFIGURACIÓN MULTIMEDIA Y CONTENIDOS (FÁCIL EDICIÓN)
 * ============================================================================
 * ¡Hola profes de VibraMas!
 * Este archivo permite actualizar fácilmente los videos, horarios, profesores,
 * noticias y productos de la página sin necesidad de tocar código HTML ni CSS.
 * 
 * Simplemente cambien los textos o enlaces entre comillas "" y guarden el archivo.
 * ============================================================================
 */

window.VIBRA_CONFIG = {
  // 1. INFORMACIÓN INSTITUCIONAL Y DE MARCA
  brand: {
    name: "VIBRA",
    tagline: "MOVIMIENTO · BIENESTAR · PRESENCIA",
    city: "Necochea, Buenos Aires, Argentina",
    shopifyStoreUrl: "https://vibramas.store",
    instagramUrl: "https://www.instagram.com/vibramas_yoga/",
    instagramStoreUrl: "https://www.instagram.com/vibramas_tienda/",
    youtubeChannelUrl: "https://www.youtube.com/@vibramas_yoga",
    facebookUrl: "https://www.facebook.com/vibramas.necochea"
  },

  // 2. VIDEO DEMOSTRATIVO PRINCIPAL (Modificable fácilmente por las profesoras)
  // Pueden poner un ID de YouTube, enlace de video o enlace a Google Drive
  featuredVideo: {
    title: "Movimiento desde Cero — Clase Guiada Completa",
    subtitle: "Una práctica de 25 minutos pensada para liberar tensiones, respirar profundo y habitar tu cuerpo con amabilidad.",
    // Para cambiar el video de YouTube, solo reemplacen el ID aquí (lo que viene después de v= o share):
    youtubeVideoId: "inpok4MKVLM", // Video ID o link embed
    fallbackThumbnail: "assets/video-thumbnail.png",
    driveDownloadGuideUrl: "https://drive.google.com/drive/folders/vibramas-guias-gratuitas",
    duration: "25 min",
    level: "Todos los niveles (Sin experiencia previa)"
  },

  // 3. NOVEDADES DE PORTADA (Carrusel continuo interactivo con lectura automática)
  heroAnnouncements: [
    {
      id: "online",
      badge: "Comunidad Online",
      title: "VibraMas Online: Descubrí la plataforma digital",
      description: "Prácticas grabadas y en vivo para acompañar tu rutina cotidiana estés donde estés.",
      linkUrl: "acerca.html#digital",
      linkText: "Conocer más ↗",
      bgClass: "slide-sage"
    },
    {
      id: "inicia",
      badge: "Clase Abierta",
      title: "¡Iniciá tu práctica hoy! Reservá tu primera clase",
      description: "Probá una clase diagnóstica de Yoga o Pilates sin cargo con nuestras profesoras.",
      linkUrl: "quienes-somos.html#horarios",
      linkText: "Ver horarios y reservar ↗",
      bgClass: "slide-gold"
    },
    {
      id: "equipo",
      badge: "Equipo Humano",
      title: "¿Sos profe de movimiento? Conocé nuestro equipo",
      description: "Abrimos convocatoria continua para profesores de Pilates, Yoga y movilidad.",
      linkUrl: "contacto.html#unirse",
      linkText: "Sumate al equipo ↗",
      bgClass: "slide-terracotta"
    },
    {
      id: "tienda",
      badge: "Vibra Store",
      title: "¿Ya conocés nuestra tienda online oficial?",
      description: "Mats de caucho natural, bolsters artesanales, velas de soja y packs de clases.",
      linkUrl: "tienda.html",
      linkText: "Ir a vibramas.store ↗",
      bgClass: "slide-sand"
    }
  ],

  // 4. EQUIPO DOCENTE & ESTRUCTURA ORGANIZATIVA
  // Permite hasta 3 imágenes por profesor para efecto hover (Color, Blanco & Negro, Pose activa)
  team: [
    {
      id: "joana",
      name: "Joana González",
      age: "32 años",
      role: "Co-Fundadora & Directora de Prácticas",
      discipline: "Hatha Yoga & Vinyasa Flow Consciente",
      practiceStyle: "Fluidez articular, alineación biomecánica y respiración diafragmática profunda.",
      affiliation: "Alianza Argentina de Yoga (AAY) & Yoga Alliance RYT-500",
      bio: "Con más de 9 años guiando prácticas en Necochea y Buenos Aires, Joana concibe el yoga no como una postura gimnástica, sino como una herramienta cotidiana de presencia, calma mental y arraigo.",
      photoColor: "assets/joana-pose.jpg",
      photoBW: "assets/joana-pose.jpg", // Filtrado dinámico a B/N vía CSS
      photoAction: "assets/clases-photo.png",
      colorTag: "#4F5E4B", // Verde Salvia Vibra
      socialHandle: "@joana_vibramas",
      scheduleHighlight: "Lunes, Miércoles y Viernes mañanas"
    },
    {
      id: "yoshi",
      name: "Yoshi Martí",
      age: "31 años",
      role: "Co-Fundadora & Coordinadora de Movimiento",
      discipline: "Pilates Mat, Biomecánica & Movilidad Articular",
      practiceStyle: "Fuerza de centro (core), descompresión de columna y reeducación postural activa.",
      affiliation: "Certificación Internacional PMA (Pilates Method Alliance)",
      bio: "Especialista en movilidad consciente y recuperación funcional. Yoshi fusiona la precisión del método Pilates clásico con transiciones orgánicas adaptadas a todos los cuerpos y edades.",
      photoColor: "assets/yoshi-pose.jpg",
      photoBW: "assets/yoshi-pose.jpg",
      photoAction: "assets/pillars-section.jpg",
      colorTag: "#B9735A", // Terracota cálido
      socialHandle: "@yoshi_pilates",
      scheduleHighlight: "Martes y Jueves tardes"
    },
    {
      id: "lucia",
      name: "Lucía Carrizo",
      age: "29 años",
      role: "Instructora Senior",
      discipline: "Yin Yoga & Meditación con Sonido",
      practiceStyle: "Sostén de asanas profundas, liberación miofascial y relajación sonora con cuencos.",
      affiliation: "Instituto Sudamericano de Mindfulness & Yin Yoga",
      bio: "Dedicada a crear pausas reparadoras para personas con ritmo de vida acelerado o estrés crónico. Sus clases invitan a bajar el ritmo y escuchar el cuerpo sin juicios.",
      photoColor: "assets/meditation-hands.jpg",
      photoBW: "assets/meditation-hands.jpg",
      photoAction: "assets/hero-woman-beach.jpg",
      colorTag: "#C59B69", // Oro suave / Ocre
      socialHandle: "@lucia_yinyoga",
      scheduleHighlight: "Lunes y Miércoles 19:00 hs"
    },
    {
      id: "sofia",
      name: "Sofía Bianchi",
      age: "27 años",
      role: "Instructora de Iniciación",
      discipline: "Movimiento desde Cero & Stretching Suave",
      practiceStyle: "Pautas sencillas, adaptaciones con sillas y apoyos, pedagogía paciente y cercana.",
      affiliation: "Profesorado Nacional de Educación Física & Movilidad Funcional",
      bio: "Apasionada por acompañar a quienes sienten que 'no tienen flexibilidad' o que nunca hicieron actividad física. Su lema: todo cuerpo puede florecer en movimiento.",
      photoColor: "assets/workshop-group.jpg",
      photoBW: "assets/workshop-group.jpg",
      photoAction: "assets/studio-space.jpg",
      colorTag: "#6F7F6A", // Salvia claro
      socialHandle: "@sofi_movimiento",
      scheduleHighlight: "Sábados 10:00 hs"
    }
  ],

  // 5. HORARIOS SEMANALES PARA PLANILLA INTERACTIVA Y PDF
  schedules: [
    { day: "Lunes", time: "08:30 - 09:30", classType: "Vinyasa Flow Consciente", teacherId: "joana", room: "Sala Océano" },
    { day: "Lunes", time: "10:00 - 11:00", classType: "Movimiento desde Cero", teacherId: "sofia", room: "Sala Dunas" },
    { day: "Lunes", time: "18:00 - 19:00", classType: "Pilates Mat & Core", teacherId: "yoshi", room: "Sala Océano" },
    { day: "Lunes", time: "19:15 - 20:30", classType: "Yin Yoga & Cuencos", teacherId: "lucia", room: "Sala Serena" },

    { day: "Martes", time: "09:00 - 10:00", classType: "Pilates Fuerza & Postura", teacherId: "yoshi", room: "Sala Océano" },
    { day: "Martes", time: "17:30 - 18:30", classType: "Hatha Yoga Alineación", teacherId: "joana", room: "Sala Océano" },
    { day: "Martes", time: "19:00 - 20:00", classType: "Stretching Profundo", teacherId: "sofia", room: "Sala Dunas" },

    { day: "Miércoles", time: "08:30 - 09:30", classType: "Vinyasa Flow Energizante", teacherId: "joana", room: "Sala Océano" },
    { day: "Miércoles", time: "10:00 - 11:00", classType: "Movimiento desde Cero", teacherId: "sofia", room: "Sala Dunas" },
    { day: "Miércoles", time: "18:00 - 19:00", classType: "Pilates Mat Progresivo", teacherId: "yoshi", room: "Sala Océano" },
    { day: "Miércoles", time: "19:15 - 20:30", classType: "Yin Yoga & Respiración", teacherId: "lucia", room: "Sala Serena" },

    { day: "Jueves", time: "09:00 - 10:00", classType: "Pilates Movilidad Integral", teacherId: "yoshi", room: "Sala Océano" },
    { day: "Jueves", time: "17:30 - 18:30", classType: "Hatha Yoga & Pranayama", teacherId: "joana", room: "Sala Océano" },
    { day: "Jueves", time: "19:00 - 20:00", classType: "Stretching & Liberación Miofascial", teacherId: "sofia", room: "Sala Dunas" },

    { day: "Viernes", time: "08:30 - 09:30", classType: "Yoga Suave & Arraigo", teacherId: "joana", room: "Sala Océano" },
    { day: "Viernes", time: "18:00 - 19:15", classType: "Masterclass Mensual / Rotativa", teacherId: "yoshi", room: "Sala Océano" },

    { day: "Sábado", time: "10:00 - 11:15", classType: "Práctica Abierta Comunitaria", teacherId: "sofia", room: "Sala Océano" },
    { day: "Sábado", time: "11:30 - 13:00", classType: "Workshops Especiales", teacherId: "joana", room: "Sala Océano" }
  ],

  // 6. TIENDA Y WORKSHOPS FUTUROS (vibramas.store Shopify)
  store: {
    shopUrl: "https://vibramas.store",
    featuredProducts: [
      {
        id: "pack-8",
        name: "Pase Mensual 8 Clases (Presencial / Híbrido)",
        category: "Servicios",
        price: "$32.000 ARS",
        description: "Acceso libre a clases de Yoga y Pilates. Incluye reserva prioritaria y sala climatizada.",
        image: "assets/clases-photo.png",
        shopifyLink: "https://vibramas.store/products/pase-8-clases"
      },
      {
        id: "mat-ecologico",
        name: "Mat Vibra de Caucho Natural 5mm",
        category: "Equipamiento",
        price: "$58.000 ARS",
        description: "Superficie antideslizante grabada con guías de alineación láser. Biodegradable y libre de PVC.",
        image: "assets/tienda-photo.png",
        shopifyLink: "https://vibramas.store/products/mat-vibra-caucho"
      },
      {
        id: "bolster-lino",
        name: "Bolster Orgánico con Funda de Lino Lavable",
        category: "Props & Confort",
        price: "$29.500 ARS",
        description: "Relleno de estopa de algodón natural para un apoyo firme en aperturas de pecho y relajación.",
        image: "assets/tienda-candle.jpg",
        shopifyLink: "https://vibramas.store/products/bolster-lino"
      },
      {
        id: "pack-online",
        name: "Membresía Vibra Online Ilimitada",
        category: "Membresía Digital",
        price: "$19.000 ARS / mes",
        description: "Biblioteca con más de 120 prácticas en video de 15 a 60 minutos + 4 clases en vivo semanales.",
        image: "assets/hero-full.jpg",
        shopifyLink: "https://vibramas.store/products/membresia-online"
      }
    ],
    workshops: [
      {
        title: "Taller Inmersivo de Pranayama & Biomecánica Respiratoria",
        date: "Sábado 14 de Noviembre, 2026",
        time: "15:00 a 18:30 hs",
        instructor: "Joana González & Médico Deportólogo Invitado",
        location: "Estudio VibraMas, Necochea & Transmisión Online",
        spots: "Cupo limitado a 16 personas",
        status: "Inscripciones Abiertas",
        link: "https://vibramas.store/products/taller-pranayama-2026"
      },
      {
        title: "Retiro Costero de Fin de Semana: Silencio, Movimiento & Mar",
        date: "5 al 7 de Diciembre, 2026",
        time: "Viernes a Domingo",
        instructor: "Equipo Completo VibraMas",
        location: "Médanos y Costa Salvaje de Necochea",
        spots: "12 plazas exclusivas",
        status: "Preventa Activa",
        link: "https://vibramas.store/products/retiro-costero-diciembre"
      }
    ]
  }
};
