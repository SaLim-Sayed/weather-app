# 🌦️ Weather App

![React](https://img.shields.io/badge/React-19.0.0-blue)
![Expo](https://img.shields.io/badge/Expo-51.0.0-black)
![Vite](https://img.shields.io/badge/Vite-6.0.3-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Zustand](https://img.shields.io/badge/Zustand-5.0.1-lightgrey)
![React Query](https://img.shields.io/badge/TanStack_Query-5.55.4-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-06B6D4)
![NativeWind](https://img.shields.io/badge/NativeWind-4.0.0-38BDF8)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-FFF)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

A **cross-platform Weather Application** built inside a **monorepo** using **React (Vite Web)** and **Expo (React Native Mobile)**.  
Featuring real-time weather data, smooth UI, modern design system, and robust state management.

---

## 📑 Table of Contents

- [✨ Demo](#-demo)  
- [📸 Preview](#-application-preview)  
- [🚀 Features](#-features)  
- [📦 Tech Stack](#-tech-stack)  
- [📂 Project Structure](#-project-structure)  
- [⚙️ Installation](#️-installation)  
- [🛠️ Deployment](#️-deployment)  
- [🤝 Contributing](#-contributing)  
- [📄 License](#-license)  

---

## ✨ Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-Access_Now-FF6B6B)](https://weather-app-web-peach.vercel.app/)

---

## 📸 Application Preview

| Web (Vite) | Mobile (Expo) |
|------------|---------------|
| ![Web Screenshot](./public/images/web-preview.png) | ![Mobile Screenshot](./public/images/mobile-preview.png) |

---

## 🚀 Features

- **Cross-Platform**: Web (React + Vite) + Mobile (React Native + Expo).
- **Design System**: **shadcn/ui** for web + **NativeWind** for mobile.
- **State Management**: Centralized store using **Zustand**.
- **Data Layer**: Smart fetching & caching with **TanStack React Query**.
- **Weather API Integration**: [OpenWeather API](https://openweathermap.org/).
- **Offline Support**: Local persistence via **AsyncStorage** + custom MobileStorage abstraction.
- **Location Support**: Automatic location detection with **expo-location**.
- **Animations**: Smooth & delightful transitions (Framer Motion on web).
- **Scalable Architecture**: Shared logic in `@weather-app/core`.
- **Responsive UI**: TailwindCSS for web + NativeWind for native.

---

## 📦 Tech Stack

- **Frameworks**: React 19, Expo 51, Vite 6  
- **Styling**: TailwindCSS (Web), NativeWind (Mobile), shadcn/ui  
- **State Management**: Zustand  
- **Data Fetching**: TanStack React Query  
- **Persistence**: AsyncStorage, MobileStorage (custom)  
- **APIs**: OpenWeather API  
- **Tooling**: TypeScript, ESLint, Turborepo  

---

## 📂 Project Structure

```bash
weather-app/
│── apps/
│   ├── web/                  # React + Vite Web App
│   ├── mobile/               # Expo React Native Mobile App
│
│── packages/
│   ├── core/                 # Shared business logic (hooks, API clients, utils)
│   ├── tailwind-config/      # Shared Tailwind CSS configuration
│   ├── config/               # Shared configs (eslint, tsconfig, etc.)
│
│── turbo.json                # Turborepo configuration
│── package.json              # Monorepo root
│── README.md


## 📦 Installation

# Clone the repository
git clone https://github.com/SaLim-Sayed/weather-app
cd weather-app

# Install dependencies
npm install

# Run Web (Vite)
cd apps/web
npm run dev

# Run Mobile (Expo)
cd apps/mobile
npm run start

🛠️ Deployment

Web: Deployed on Vercel
.

Mobile: Run locally with Expo Go, or build standalone apps via EAS
.