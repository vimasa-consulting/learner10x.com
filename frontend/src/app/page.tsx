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
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created by <span className="font-semibold text-blue-600">Niranjan Bala</span>
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
            href="https://github.com/niranjanbala/fullstack-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>

        {/* Donation Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800 max-w-2xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              💝 Support the Developer
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300 mb-4">
              If this template helps you, consider supporting my work! Get <span className="font-bold text-green-600">₹250</span> when you sign up with Niyo using my referral code.<br/><span className="text-xs mt-1 block">By signing up to Niyo - we both receive value. You can choose to pay me any amount you see fit as a token of appreciation.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                href="https://ctr.niyo.me/start?utm_campaign_id=WqeSX5gu&utm_source=goniyo_app_referral&utm_campaign=Referral&utm_adgroup=mobile_app&utm_medium=mobile_app_referral&ref_label=HAONZLAQIH"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get ₹250 + Niyo Card
              </a>
              <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center">
                Code: <span className="font-mono ml-1 font-bold">HAONZLAQIH</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <span>Built with ❤️ by <a href="https://github.com/niranjanbala" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Niranjan Bala</a> for the developer community</span>
      </footer>
    </div>
  );
}
