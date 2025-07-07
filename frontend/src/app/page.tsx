import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fullstack Template
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A modern, production-ready fullstack template for building web applications with Next.js, FastAPI, and PostgreSQL.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="font-semibold">Frontend:</span>
            <span>Next.js 14 + TypeScript + Tailwind CSS</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="font-semibold">Backend:</span>
            <span>FastAPI + PostgreSQL + SQLAlchemy</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="font-semibold">Auth:</span>
            <span>Clerk authentication ready</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="font-semibold">DevOps:</span>
            <span>Docker + Make commands</span>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="http://localhost:8000/api/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Documentation
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://github.com/yourusername/fullstack-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <span>Built with ❤️ for modern web development</span>
      </footer>
    </div>
  );
}
