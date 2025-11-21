# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Free QR Code Generator - A completely free, no-paywall QR code generator built with Next.js 16, TypeScript, and Tailwind CSS. The application generates QR codes entirely client-side with customizable colors and multiple export formats (PNG, SVG).

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Create production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with custom design tokens
- **QR Generation**: qrcode library
- **Icons**: lucide-react

### Project Structure

```
/app                    - Next.js App Router pages
  layout.tsx           - Root layout with metadata
  page.tsx             - Home page with QRGenerator
  globals.css          - Tailwind imports and CSS variables
/components            - React components
  QRGenerator.tsx      - Main QR code generation UI (client component)
  OliveBranch.tsx      - Decorative SVG element
/lib
  utils.ts             - Utility functions (cn helper for classnames)
```

### Design System: "Not Alchemy"

This project follows a distinctive editorial design system with warm, organic aesthetics. The color palette and design tokens are defined in `app/globals.css`:

**Core Colors (HSL)**:
- `--background`: Warm cream (#F7F7F0)
- `--foreground`: Deep navy (#0A0720)
- `--primary`: Deep green (#284023)
- `--accent`: Warm brown (#B9896C)
- `--secondary`/`--muted`: Light beige (#D2C4AE)

Always reference colors using `hsl(var(--token))` to maintain design consistency.

### Key Implementation Details

**QRGenerator Component** (`components/QRGenerator.tsx`):
- Client-side component ('use client')
- Generates QR codes using the qrcode library
- Supports both PNG (toDataURL) and SVG (toString) formats
- Uses refs for canvas element (hidden utility canvas)
- Error correction level: 'H' (highest)
- Default QR size: 400x400px with 2-unit margin

**Path Aliases**:
- `@/*` maps to root directory (configured in `tsconfig.json`)
- Example: `import { QRGenerator } from '@/components/QRGenerator'`

**Styling Approach**:
- Tailwind CSS with inline theme definitions
- Use `cn()` utility from `lib/utils.ts` for conditional classnames
- Custom CSS variables for design tokens
- No external UI library dependencies

## TypeScript Configuration

- Strict mode enabled
- JSX transform: 'react-jsx' (no need to import React in components)
- Module resolution: 'bundler'
- Target: ES2017

## ESLint

Uses Next.js recommended ESLint config with TypeScript support. Configuration is in `eslint.config.mjs`.
