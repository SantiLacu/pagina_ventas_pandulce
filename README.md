# Ventas Pandul — Directorio Raíz

## Descripción General
Sitio de ventas (e-commerce liviano) con catálogo de productos, carrito, checkout vía WhatsApp y registro de ventas en Google Sheets.

## Stack
- Vite + Vanilla JS (ES Modules)
- Tailwind CSS 3 (paleta navideña)
- Google Apps Script (Web App) para Google Sheets
- API `wa.me` para WhatsApp

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `package.json` | Scripts (`dev`, `build`, `sync`) y dependencias |
| `vite.config.js` | Configuración del bundler (server, base, build) |
| `tailwind.config.js` | Paleta navideña + rutas de contenido |
| `postcss.config.js` | PostCSS + Tailwind + Autoprefixer |
| `README.md` | Este archivo (contexto general del directorio) |

## Carpetas hijas
| Carpeta | Propósito |
|---|---|
| `public/` | Recursos estáticos servidos tal cual (incluye productos) |
| `scripts/` | Scripts de herramientas (sincronización de productos) |
| `src/` | Código fuente de la app |
| `apps-script/` | Código Google Apps Script para Google Sheets |

## Cómo agregar un producto
1. Crear carpeta `public/products/<slug>/`
2. Meter fotos `1.jpg`, `2.jpg`... y `data.txt`
3. Ejecutar `npm run sync`
