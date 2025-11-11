/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// Valor por defecto para GitHub Pages del repo VidaNL
const rawBase = process.env.NEXT_PUBLIC_BASEPATH ?? "/VidaNL";

// Normaliza: sin barra al final y con barra inicial (e.g. "/VidaNL")
const normalizeBase = (p) =>
  p === "/"
    ? ""
    : ("/" + p.replace(/^\/+/, "").replace(/\/+$/, "")).replace(/\/+/g, "/");

const basePath = isProd ? normalizeBase(rawBase) : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // genera ./out para Pages
  trailingSlash: true, // evita 404 en rutas estáticas
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },

  // Clave para que funcione bajo /VidaNL en producción
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  // Expone el basePath efectivo al cliente
  env: { NEXT_PUBLIC_BASEPATH: basePath },
};

export default nextConfig;
