import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="glass p-8 rounded-lg max-w-md mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text mb-4">
          404
        </h1>
        <p className="text-slate-300 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/"
          className="inline-block bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
