import { CONFIG } from '../config.js'
import { getCart, getCartTotal } from '../data/cartStore.js'

export async function sendToSheets(formData) {
  if (!CONFIG.URL_SHEETS || CONFIG.URL_SHEETS.includes('XXXX')) {
    console.warn('[Sheets] URL_SHEETS no configurada, saltando envío a Sheets')
    return { ok: true, skipped: true }
  }

  const cart = getCart()
  const total = getCartTotal()

  const payload = {
    negocio: CONFIG.NOMBRE_NEGOCIO,
    timestamp: new Date().toISOString(),
    cliente: {
      nombre: formData.nombre,
      telefono: formData.telefono,
      direccion: formData.direccion || '',
      comentarios: formData.comentarios || '',
    },
    items: cart.map((item) => ({
      nombre: item.nombre,
      subtipo: item.subtipo || '',
      precio: item.precio,
      cantidad: item.cantidad,
      subtotal: item.precio * item.cantidad,
    })),
    total,
  }

  try {
    const response = await fetch(CONFIG.URL_SHEETS, {
      method: 'POST',
      // Cambiado a text/plain para evitar la verificación de CORS de Google Apps Script
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      keepalive: true,
    })

    if (!response.ok) {
      console.warn('[Sheets] Respuesta no OK:', response.status)
      return { ok: false, error: `HTTP ${response.status}` }
    }

    console.log('[Sheets] Pedido enviado correctamente')
    return { ok: true }
  } catch (err) {
    console.warn('[Sheets] Error de red:', err.message)
    return { ok: false, error: err.message }
  }
}