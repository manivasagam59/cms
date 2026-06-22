# OrbitCMS Development Knowledge Base

This document serves as a persistent memory for AI development on the OrbitCMS platform. It contains architectural decisions, UI styling guidelines, and feature roadmaps.

## 🎨 UI & Design System

The application follows a premium, modern "SaaS-ready" aesthetic characterized by vibrant colors, high-quality typography, and subtle micro-animations.

### Core Branding
- **Product Name**: OpenCMS
- **Logo Icon**: `LayoutTemplate` (from `lucide-react`)
- **Main Palette**: 
    - Primary: Indigo (`#4F46E5` / `indigo-600`)
    - Secondary: Slate (`#0F172A` / `slate-900`)
    - Accents: Emerald (Success), Violet (Creative), Amber (Warning)
- **Background**: `#FDFEFF` (Main platform) / `#0F172A` (Rich sidebars/visual sections)

### Typography
- **Primary Font**: Poppins (Sans-serif)
- **Heading Styles**: `font-extrabold`, `tracking-tight`
- **Text Content**: `font-medium`, `text-slate-500` for subtitles

### Component Design Tokens
- **Border Radius**: `rounded-2xl` (Standard), `rounded-xl` (Buttons/Icon-wrappers)
- **Inputs**: 
    - `bg-slate-50`, `border-slate-200`, `rounded-2xl`
    - Focus: `ring-4 ring-indigo-600/10`, `border-indigo-600`
- **Buttons**:
    - Primary: `bg-indigo-600`, `shadow-lg shadow-indigo-600/25`
    - Selection/Hover: `active:scale-[0.98]`
- **Cards**: `bg-white`, `border-slate-100`, `shadow-sm`, `hover:shadow-md`

### Visual Effects (The "Premium" Feel)
- **Glows**: Large radial gradients with `blur-[120px]` and `mix-blend-screen` (Indigo/Violet)
- **Gradients**: `from-indigo-400 to-violet-300` text clipping or backgrounds
- **Glassmorphism**: `backdrop-blur-md bg-white/80` or `bg-slate-800/80`
- **Animations**:
    - `transition-all duration-1000` for page entry
    - Smooth sidebar sub-menu expands (using CSS grid-rows trick)
    - Pulse and hover rotations for interactive elements

## 🏗️ Architecture

- **Core Framework**: React (Vite-based)
- **Styling**: Tailwind CSS (with arbitrary value support)
- **Icons**: `lucide-react`, `react-icons`
- **Layout System**: `RootLayout` with sticky Header and persistent Sidebar
- **Routing**: `react-router-dom` v6

## 🚀 Memory & Progress

### Latest Tasks Completed
- Created CMS-focused Dashboard with Traffic analysis and Recent Content.
- Rebranded from "MedPrime" to "OrbitCMS".
- Implemented smooth expand/collapse animations for Sidebar sub-menus.
- Synchronized theme colors (Indigo/Slate) across all core components.

### Implementation Patterns
- When creating charts, use SVG-like bar structures within `flex` containers for maximum styling control rather than heavy library dependencies where simple visuals suffice.
- Use the `cn` utility for conditional tailwind classes.
- Maintain consistent spacing: `p-6` for page containers, `gap-6` or `gap-8` for grid layouts.
