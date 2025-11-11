/** @type {import('next').NextConfig} */

// Detecta si estamos construyendo para GitHub Pages
const onGhPages = process.env.GITHUB_PAGES === "true";

// Nombre base del repositorio en Pages
const rawBase = process.env.NEXT_PUBLIC_BASEPATH ?? "/Vida";

// Normaliza: sin barra final y con una barra inicial (por ejemplo: "/Vida")
const normalizeBase = (p) =>
  p === "/"
    ? ""
    : ("/" + p.replace(/^\/+/, "").replace(/\/+$/, "")).replace(/\/+/g, "/");

// Usa el basePath solo cuando se compila para GitHub Pages
const basePath = onGhPages ? normalizeBase(rawBase) : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera la carpeta ./out (HTML estático) para GitHub Pages
  output: "export",

  // Evita 404 en rutas al navegar
  trailingSlash: true,

  // Necesario para que funcione sin servidor (export estático)
  images: { unoptimized: true },

  // Ignora errores de TypeScript durante el build (opcional)
  typescript: { ignoreBuildErrors: true },

  // ✅ Configura correctamente el basePath y assetPrefix
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  // Expone el basePath al cliente (por si lo necesitas en runtime)
  env: {
    NEXT_PUBLIC_BASEPATH: basePath,
  },
};

export default nextConfig;
