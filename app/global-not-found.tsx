import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Tu Destino es Panamá",
  robots: { index: false },
};

/** Paths outside /es and /en (the locale root layout cannot render them). */
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="grid min-h-dvh place-items-center bg-off-white p-6">
        <main className="max-w-lg space-y-5 text-center">
          <p className="eyebrow">404</p>
          <h1 className="text-h2">Página no encontrada</h1>
          <p lang="en" className="text-muted">
            Page not found
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/es" className="tap inline-flex items-center rounded-full bg-red-600 px-6 font-bold text-white">
              Ir al inicio
            </Link>
            <Link href="/en" lang="en" className="tap inline-flex items-center rounded-full border border-blue-800 px-6 font-bold text-blue-800">
              Go to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
