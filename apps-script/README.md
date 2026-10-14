# apps-script/

## Descripción
Código de Google Apps Script que se pega en script.google.com y se despliega como Web App. Recibe los datos del pedido por POST y escribe una fila en una hoja de cálculo de Google.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `Code.gs` | Función `doPost(e)` que parsea el payload (JSON o form data), obtiene la hoja activa y agrega una fila con: timestamp, nombre, teléfono, dirección, comentarios, items, total. Devuelve `ContentService` JSON de confirmación. |

## Cómo desplegar
1. Ir a https://script.google.com → crear nuevo proyecto.
2. Pegar el contenido de `Code.gs`.
3. Crear/ligar una hoja de cálculo de Google.
4. Desplegar → Nueva implementación → Tipo: "Aplicación web".
5. Acceso: "Cualquier persona".
6. Copiar la URL generada y pegarla en `src/js/config.js` como `URL_SHEETS`.
