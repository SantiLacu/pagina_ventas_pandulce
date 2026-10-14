# scripts/

## Descripción
Scripts de utilidad que NO son parte de la app en runtime. Se ejecutan manualmente con `npm run`.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `sync-products.js` | Escanea `public/products/*/`, parsea cada `data.txt`, lista las fotos y genera `public/products/manifest.json`. Ejecutar con `npm run sync` cada vez que se agregue/modifique un producto. |

## Cómo funciona `sync-products.js`
1. Lee todas las carpetas dentro de `public/products/`.
2. Por cada carpeta:
   - Lee `data.txt` y parsea `nombre`, `descripcion`, `precio`, `subtipos`.
   - Lista archivos de imagen (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) y los ordena numéricamente.
3. Escribe el array resultante en `public/products/manifest.json`.
