/** @type {import('next').NextConfig} */
const onGhPages = process.env.GITHUB_PAGES === "true";

// Valor por defecto para GitHub Pages del repo Vida
const rawBase = process.env.NEXT_PUBLIC_BASEPATH ?? "/Vida";

// Normaliza: sin barra al final y con barra inicial (e.g. "/Vida")
const normalizeBase = (p) =>
  p === "/"
    ? ""
    : ("/" + p.replace(/^\/+/, "").replace(/\/+$/, "")).replace(/\/+/g, "/");

const basePath = onGhPages ? normalizeBase(rawBase) : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // genera ./out para Pages
  trailingSlash: true, // evita 404 en rutas estáticas
  images: { unoptimized: true }, // necesario en export estático
  typescript: { ignoreBuildErrors: true },

  // Clave para que funcione bajo /Vida en GitHub Pages
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  // Expone el basePath efectivo al cliente
  env: { NEXT_PUBLIC_BASEPATH: basePath },
};

export default nextConfig;
