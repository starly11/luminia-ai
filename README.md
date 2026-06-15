# Luminia AI — Premium WebXR Experience

## 🎨 Project Overview

A stunning, immersive WebXR showcase featuring:
- **4,000 interactive particles** with custom GLSL shaders
- **Floating crystal formation** with real-time refraction effects
- **Bloom post-processing** for luxury glow
- **Smooth scroll** with Lenis integration
- **GSAP animations** for cinematic transitions

## 💰 Value Proposition

This is a **$5,000-$15,000+ premium showcase piece** that demonstrates:
- Advanced WebGL/Three.js expertise
- Custom shader programming (GLSL)
- Performance-optimized 3D rendering
- Luxury design aesthetics
- Conversion-optimized UX

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── shaders/
│   └── shaders.ts          # Custom GLSL vertex & fragment shaders
├── components/
│   ├── ParticleNebula.tsx  # 4K interactive particle system
│   └── FloatingCrystal.tsx # Animated crystal formation
├── sections/
│   ├── ImmersiveScene.tsx  # Main 3D canvas with post-processing
│   └── HeroSection.tsx     # GSAP-animated hero content
├── hooks/
│   └── useSmoothScroll.ts  # Lenis smooth scroll integration
├── App.tsx                 # Main application component
├── main.tsx                # Entry point
└── index.css               # Tailwind + custom styles
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| 3D Engine | Three.js + React Three Fiber |
| 3D Helpers | Drei |
| Post-Processing | @react-three/postprocessing |
| Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| Styling | TailwindCSS |
| Build Tool | Vite |

## 🎯 Key Features

### Custom GLSL Shaders
- Simplex noise for organic particle motion
- Mouse-responsive displacement
- Fresnel effects on crystals
- Additive blending for ethereal glow

### Interactive Elements
- Particles react to mouse movement
- Scroll-triggered animations
- Parallax sections
- Hover effects with golden glow

### Performance Optimizations
- BufferGeometry for efficient rendering
- Instanced rendering ready
- Responsive DPR scaling
- Lazy loading compatible

## 🎨 Design System

### Colors
- **Midnight**: `#0F0F0F` — Deep luxury base
- **Gold**: `#D4AF37` — Primary accent
- **Gold Light**: `#F4D06F` — Highlight accent

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body**: Inter (sans-serif, clean)

### Motion Principles
- Duration: 0.8s – 1.2s
- Easing: `power3.out` for entrances
- Scroll-synced parallax

## 📄 License

Private — All rights reserved. This is a premium commercial project.

## 🤝 Contact

For licensing or customization inquiries, contact the repository owner.
