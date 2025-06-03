# React Authentication App with Supabase

This project is a React application built with TypeScript, Tailwind CSS, and Ant Design, featuring authentication via Supabase.

## Features

- Email/password authentication
- Google OAuth authentication
- Protected routes
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

## Supabase Setup

1. Create a new Supabase project
2. Enable Email and Google auth providers in Authentication > Settings
3. Set up your site URL and redirect URLs in Authentication > URL Configuration
4. Copy your Supabase URL and anon key to your `.env.local` file

## Project Structure

- `/src/components` - Reusable UI components
- `/src/contexts` - Context providers (AuthContext)
- `/src/lib` - Utility functions and configuration
- `/src/pages` - Page components