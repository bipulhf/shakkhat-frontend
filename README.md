# Shakkhat - Meeting Scheduler Frontend

Welcome to the frontend of **Shakkhat - Meeting Scheduler**, a sleek and efficient platform designed to streamline meeting scheduling and management. This frontend is built with **Next.js**, **React**, **Tailwind CSS**, and **ShadCN** to ensure a modern and seamless user experience.

Backend Repo Link : https://github.com/Unayes09/LU-Hackathon

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)

---

## Introduction

Shakkhat provides an intuitive interface for scheduling, managing, and tracking meetings effortlessly. This repository hosts the frontend of the platform, offering a user-friendly experience with real-time updates and a responsive design.

---

## Features

- **User Authentication**: Sign up, log in, and manage user profiles.
- **Slot Management**: View, create, and modify available time slots.
- **Meeting Scheduling**: Easily schedule and manage meetings.
- **Real-time Updates**: Interactive UI with WebSockets for live updates.
- **Responsive Design**: Fully optimized for desktop and mobile.
- **Dark Mode Support**: Toggle between light and dark themes.

---

## Tech Stack

- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS & ShadCN
- **State Management**: React Context API / Zustand (optional)
- **Real-time Communication**: Socket.io
- **API Integration**: Axios for REST API requests

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/shakkhat-frontend.git
   cd shakkhat-frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Create an `.env.local` file and configure the API base URL:
   ```sh
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
   ```
4. Run the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

The app will be available at `http://localhost:3000`.

---

## Usage

- **Authentication**: Users must log in to access scheduling features.
- **Dashboard**: View available slots and scheduled meetings.
- **Schedule Meeting**: Select a time slot and confirm meeting details.
- **Notifications**: Receive real-time updates on meeting status.
---

