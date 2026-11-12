# scripts/

## Descripción
Scripts de utilidad que NO son parte de la app en runtime. Se ejecutan manualmente con `npm run`.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `sync-products.js` | Escanea `public/products/*/`, parsea cada `data.txt`, lista las fotos y genera `public/products/manifest.json`. Ejecutar con `npm run sync` cada vez que se agregue/modifique un producto. |
| `fix-images.js` | Adapta las imágenes a los contenedores donde se muestran (sin recortarlas): productos → `1200x1200` con fondo crema (`#FFFBF0`); hero → `1920x1080` con la misma imagen desenfocada de fondo. Respalda los originales en `.backup-imagenes/` (no commitear). Ejecutar con `npm run fix:images`. Requiere ImageMagick (`magick`). |

## Cómo funciona `sync-products.js`
1. Lee todas las carpetas dentro de `public/products/`.
2. Por cada carpeta:
   - Lee `data.txt` y parsea `nombre`, `descripcion`, `precio`, `subtipos` y `terminaciones` (opcional; adicional que se suma al precio del subtipo, ej: `Bañado | 2000`).
   - Lista archivos de imagen (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) y los ordena numéricamente.
3. Escribe el array resultante en `public/products/manifest.json`.
