import { CONFIG } from '../config.js'
import { getCart, getCartTotal, clearCart } from '../data/cartStore.js'

export function buildWhatsAppMessage(formData) {
  const cart = getCart()
  const total = getCartTotal()
  const negocio = CONFIG.NOMBRE_NEGOCIO

  let mensaje = `🎄 *Nuevo pedido - ${negocio}*\n\n`
  mensaje += `👤 *Cliente:* ${formData.nombre}\n`
  mensaje += `📱 *Teléfono:* ${formData.telefono}\n`
  if (formData.direccion) mensaje += `📍 *Dirección:* ${formData.direccion}\n`
  if (formData.comentarios) mensaje += `💬 *Comentarios:* ${formData.comentarios}\n`
  mensaje += `\n📦 *Detalle del pedido:*\n`

  cart.forEach((item, i) => {
    mensaje += `${i + 1}. ${item.nombre}`
    if (item.subtipo) mensaje += ` (${item.subtipo})`
    mensaje += ` — $ ${item.precio.toLocaleString('es-AR')} x ${item.cantidad} = $ ${(item.precio * item.cantidad).toLocaleString('es-AR')}\n`
  })

  mensaje += `\n💰 *Total: $ ${total.toLocaleString('es-AR')}*`
  mensaje += `\n\n---\nPedido generado desde la web de ${negocio}`

  return mensaje
}

export function sendToWhatsApp(formData) {
  const mensaje = buildWhatsAppMessage(formData)
  const url = `https://wa.me/${CONFIG.NRO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`

  clearCart()
  window.open(url, '_blank', 'noopener,noreferrer')
}