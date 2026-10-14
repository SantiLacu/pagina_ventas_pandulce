# src/js/utils/

## Descripción
Funciones auxiliares reutilizables sin dependencias de UI.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `whatsapp.js` | `buildWhatsAppMessage(cart, formData)` → arma el texto del pedido. `openWhatsApp(nro, message)` → abre `https://wa.me/<nro>?text=<encoded>`. |
| `sheets.js` | `sendToSheets(payload)` → `fetch POST` a `URL_SHEETS` (Google Apps Script). Devuelve `true/false` según éxito. NO debe bloquear el flujo de WhatsApp si falla. |
| `format.js` | Helpers: `formatCurrency(n)` → `$ 75.000`, `slugify(text)`, etc. |
