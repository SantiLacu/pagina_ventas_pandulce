# public/

## Descripción
Recursos estáticos servidos **tal cual** por Vite. Todo lo que esté aquí es accesible vía URL directa.

## Archivos de este directorio
Ninguno aún.

## Carpetas hijas
| Carpeta | Propósito |
|---|---|
| `products/` | Catálogo de productos (fotos + `data.txt` + `manifest.json`) |

## Notas
- Las imágenes de productos NO van en `src/assets`, van en `public/products/` para que el usuario las agregue sin rebuild.
- `manifest.json` es auto-generado por `scripts/sync-products.js`.
