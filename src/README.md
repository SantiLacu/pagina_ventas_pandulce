# src/

## Descripción
Código fuente de la aplicación. Vite compila desde aquí.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `index.html` | HTML principal. Contiene `<div id="app">` donde se montan los componentes. Incluye `<meta name="viewport">` para mobile-first. |
| `main.js` | Entry point. Importa `style.css` y orquesta la carga de todos los componentes. |
| `style.css` | Directivas `@tailwind` + estilos globales custom (tipografía, scroll smooth, etc). |

## Carpetas hijas
| Carpeta | Propósito |
|---|---|
| `js/` | Lógica de la app (config, componentes, data, utils) |
| `assets/` | Recursos estáticos compilados por Vite (logo, íconos, etc.) |
