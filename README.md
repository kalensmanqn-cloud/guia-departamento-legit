# 🏠 Guía de Departamento KALEN

Una aplicación web de bienvenida para huéspedes del Departamento KALEN en San Martín de los Andes, Neuquén. Diseñada para reemplazar la clásica carpeta física de información con una experiencia digital moderna y accesible.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)

## ✨ Características

- 🌐 **Multilenguaje**: Soporte completo para Español e Inglés
- 🌙 **Tema Oscuro/Claro**: Detecta preferencia del sistema automáticamente
- 📱 **Responsive**: Optimizado para móviles, tablets y desktop
- 🎨 **Animaciones fluidas**: Transiciones suaves con Framer Motion

## 📋 Secciones

| Sección | Descripción |
|---------|-------------|
| **Reglas de Convivencia** | Normas de la casa para una estadía armoniosa |
| **Check-in / Check-out** | Horarios e instrucciones de ingreso y salida |
| **WiFi** | Credenciales de red con botón de copiar |
| **Tu Anfitrión** | Contacto directo vía WhatsApp y email |
| **Emergencias** | Números de emergencia locales y dirección |
| **Guía Turística** | Recomendaciones gastronómicas, actividades y mapa interactivo |
| **Estacionamiento** | Información sobre el sistema de estacionamiento medido |

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   └── page.tsx              # Página principal
├── components/
│   ├── ui/                   # Componentes reutilizables (Modal, CopyButton)
│   └── modals/               # Contenido de cada modal/sección
├── lib/
│   ├── translations.ts       # Textos en ES/EN
│   ├── constants.ts          # Datos de categorías
│   ├── types.ts              # Tipos TypeScript
│   └── utils.ts              # Utilidades (cn)
└── ...
```

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React

## 📄 Licencia

Proyecto privado - © 2026 Departamento KALEN
