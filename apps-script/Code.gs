// ============================================
// Google Apps Script para Ventas Pandul
// ============================================
// INSTRUCCIONES:
// 1. Abrir script.google.com
// 2. Crear nuevo proyecto
// 3. Pegar este código en Code.gs
// 4. Crear una hoja de cálculo en Google Sheets
// 5. Copiar el ID de la hoja (de la URL: https://docs.google.com/spreadsheets/d/ID_DE_LA_HOJA/edit)
// 6. Reemplazar SPREADSHEET_ID abajo (SOLO el ID, sin la URL completa)
// 7. Deploy → New deployment → Web App → Execute as: Me, Who has access: Anyone
// 8. Copiar la URL del Web App y ponerla en src/js/config.js → URL_SHEETS
// ============================================

// SOLO el ID de la hoja (el string entre /d/ y /edit)
// Ejemplo: https://docs.google.com/spreadsheets/d/1AbC123.../edit → SPREADSHEET_ID = '1AbC123...'
const SPREADSHEET_ID = '1Bw90ni7RcooEuj7L3tJTrJkn02RCphoCutWnm81YSB8'
const SHEET_NAME = 'Pedidos'

function doPost(e) {
  try {
    // Validar que venga body
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No se recibieron datos POST')
    }

    const data = JSON.parse(e.postData.contents)
    const sheet = getOrCreateSheet()

    const row = [
      data.timestamp,                           // A: Timestamp
      data.negocio,                             // B: Negocio
      data.cliente.nombre,                      // C: Cliente nombre
      data.cliente.telefono,                    // D: Cliente teléfono
      data.cliente.direccion,                   // E: Dirección
      data.cliente.comentarios,                 // F: Comentarios
      data.items.map(i => `${i.nombre}${i.subtipo ? ` (${i.subtipo})` : ''} x${i.cantidad} = $${i.subtotal.toLocaleString('es-AR')}`).join(' | '), // G: Items
      data.total,                               // H: Total
    ]

    sheet.appendRow(row)

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    console.error('Error en doPost:', err)
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Necesario para que el Web App responda a GET (browser)
function doGet(e) {
  if (e && e.parameter && e.parameter.test === '1') {
    return testPost()
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Ventas Pandul API v1' }))
    .setMimeType(ContentService.MimeType.JSON)
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
  let sheet = ss.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    // Headers
    sheet.appendRow([
      'Timestamp', 'Negocio', 'Cliente', 'Teléfono', 'Dirección', 'Comentarios', 'Items', 'Total'
    ])
    // Formato
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#C1121F').setFontColor('#FFFFFF')
    sheet.setColumnWidths(1, 8, [180, 120, 180, 150, 250, 200, 400, 100])
  }

  return sheet
}

// Función auxiliar para probar manualmente
function testPost() {
  const testData = {
    timestamp: new Date().toISOString(),
    negocio: 'Ventas Pandul',
    cliente: {
      nombre: 'Juan Pérez',
      telefono: '+54 9 11 1234-5678',
      direccion: 'Av. Siempre Viva 123, CABA',
      comentarios: 'Entregar por la tarde',
    },
    items: [
      { nombre: 'Torta Angel', subtipo: 'Torta entera 1kg', precio: 75000, cantidad: 1, subtotal: 75000 },
      { nombre: 'Desayuno Navideño', subtipo: 'Caja grande', precio: 35000, cantidad: 1, subtotal: 35000 },
    ],
    total: 110000,
  }

  const e = { postData: { contents: JSON.stringify(testData) } }
  const result = doPost(e)
  console.log('Test result:', result.getContent())
}