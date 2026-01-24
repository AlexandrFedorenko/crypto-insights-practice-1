# Crypto Insights 🚀

A modern crypto dashboard and educational platform built with **Next.js 16**.

This project demonstrates how to build a professional-grade application by combining **static content** (Marketing/Blog) with **real-time data** (App/Market).

## 🛠 Technology Stack

Everything used in this project is industry standard:

*   **Next.js 16 (App Router)**: The framework for everything. Uses both Server Components (fast) and Client Components (interactive).
*   **TypeScript**: To write safe, error-free code.
*   **Contentful (Headless CMS)**: Where we write blog posts and manage marketing pages. We simply fetch data via GraphQL.
*   **Zustand**: For simple state management (Watchlist, Search).
*   **React Query**: For fetching real-time crypto prices caching them in the browser.
*   **Shadcn/UI & Tailwind CSS**: For beautiful, accessible, and fast design.
*   **Middleware**: Adds security headers to protect the application.

## 🚀 How to Run

1.  **Install**: `npm install`
2.  **Setup Keys**: Create `.env.local` with your Contentful & CoinGecko keys.
3.  **Start**: `npm run dev`

