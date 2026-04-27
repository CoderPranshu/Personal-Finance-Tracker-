import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            Take control of your <span className="text-indigo-600">finances</span> today.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-8">
            Track income, analyze expenses, and grow your savings with our modern personal finance tracker. 
            Powerful analytics, secure auth, and lightning-fast performance.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/register"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:scale-105"
            >
              Get Started for Free
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Live Demo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Advanced Analytics</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Visualize your spending habits with interactive charts and real-time breakdowns.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Secure by Design</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              JWT authentication and RBAC ensure your financial data is always safe.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lightning Fast</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Redis-powered caching makes your dashboard load in milliseconds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
