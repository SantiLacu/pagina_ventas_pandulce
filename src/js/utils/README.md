# src/js/utils/

## Descripción
Funciones auxiliares reutilizables sin dependencias de UI.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `whatsapp.js` | `buildWhatsAppMessage(formData)` → arma el texto del pedido (incluye `subtipo, terminación` en cada línea). `sendToWhatsApp(formData)` → vacía el carrito y abre `https://wa.me/<nro>?text=<encoded>`. |
| `sheets.js` | `sendToSheets(payload)` → `fetch POST` a `URL_SHEETS` (Google Apps Script). Devuelve objeto `{ok}`. NO debe bloquear el flujo de WhatsApp si falla. Envía `subtipo` combinado con la terminación (`Subtipo, Terminación`) para que llegue a la planilla sin redesplegar el Apps Script. |
| `format.js` | Helpers: `formatCurrency(n)` → `$ 75.000`, `slugify(text)`, etc. |
