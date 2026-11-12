# src/

## Descripción
Código fuente de la aplicación. Vite compila desde aquí.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `index.html` | (en la raíz del proyecto) HTML principal. Contiene `<div id="app">` donde se montan los componentes. Incluye `<meta name="viewport">` con `viewport-fit=cover` para uso en celulares (notch/safe-area). |
| `main.js` | Entry point. Importa `style.css` y orquesta la carga de todos los componentes. |
| `style.css` | Directivas `@tailwind` + estilos globales (scroll smooth, `overflow-x: clip`, inputs de mínimo 16px para evitar zoom en iOS, `touch-action: manipulation`, utilidades `.pt-safe` y `.no-scrollbar` para safe-area y scrollbars ocultos). |

## Carpetas hijas
| Carpeta | Propósito |
|---|---|
| `js/` | Lógica de la app (config, componentes, data, utils) |
| `assets/` | Recursos estáticos compilados por Vite (logo, íconos, etc.) |
