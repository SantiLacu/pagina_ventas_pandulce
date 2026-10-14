const STORAGE_KEY = 'pandul_cart'
const listeners = new Set()

let cart = loadCart()

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  emit()
}

function emit() {
  listeners.forEach((fn) => fn(cart))
}

export function subscribe(fn) {
  listeners.add(fn)
  fn(cart)
  return () => listeners.delete(fn)
}

export function getCart() {
  return cart
}

export function getCartCount() {
  return cart.reduce((sum, item) => sum + item.cantidad, 0)
}

export function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
}

export function addToCart({ slug, nombre, subtipoNombre, precio, imagen }) {
  const id = subtipoNombre ? `${slug}::${subtipoNombre}` : slug
  const existing = cart.find((item) => item.id === id)

  if (existing) {
    existing.cantidad += 1
  } else {
    cart.push({
      id,
      slug,
      nombre,
      subtipo: subtipoNombre || null,
      precio,
      imagen,
      cantidad: 1,
    })
  }

  saveCart()
}

export function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id)
  saveCart()
}

export function updateQty(id, cantidad) {
  const item = cart.find((i) => i.id === id)
  if (!item) return
  if (cantidad <= 0) {
    removeFromCart(id)
    return
  }
  item.cantidad = cantidad
  saveCart()
}

export function clearCart() {
  cart = []
  saveCart()
}
