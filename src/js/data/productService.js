let cachedProducts = null

export async function getProducts() {
  if (cachedProducts) return cachedProducts

  try {
    const res = await fetch('/products/manifest.json', { cache: 'no-cache' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    cachedProducts = await res.json()
    return cachedProducts
  } catch (err) {
    console.error('Error al cargar productos:', err)
    return []
  }
}

export function getProductBySlug(slug) {
  if (!cachedProducts) return null
  return cachedProducts.find((p) => p.slug === slug) || null
}
