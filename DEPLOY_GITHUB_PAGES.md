
# Despliegue en GitHub Pages (Next.js export)

Este proyecto está configurado para publicarse en **GitHub Pages** bajo el repositorio `Vidanl`.

## Pasos

1. Ve a **Settings → Pages** y en "Build and deployment → Source" selecciona **GitHub Actions**.
2. Haz push a la rama `main` con estos cambios.
3. El workflow `Deploy to GitHub Pages` se ejecutará automáticamente y publicará el contenido de `out/`.
4. La web quedará disponible en: `https://Nachodusan.github.io/Vidanl/`

### Desarrollo local

```bash
pnpm install
pnpm run dev
# build estático
pnpm run build
# artefacto exportado en: ./out
```

> Nota: El `basePath` y `assetPrefix` están configurados a `/Vidanl` sólo en producción, por lo que en local las rutas no llevan prefijo.
