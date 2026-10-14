import { getProducts } from '../data/productService.js'
import { renderProductCard } from './productCard.js'

export async function renderCatalog(container) {
  container.className = 'container-page py-12'

  container.innerHTML = `
    <div class="flex items-center justify-between mb-6">
      <h2 id="catalog-title" class="font-display text-3xl font-bold text-navidad-rojo">
        🎄 Cargando productos...
      </h2>
    </div>
    <div id="catalogo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    <div id="catalog-empty" class="hidden text-center py-16 text-navidad-oscuro/60">
      <p class="text-lg">No hay productos disponibles en este momento.</p>
    </div>
  `

  const products = await getProducts()
  const grid = container.querySelector('#catalogo')
  const title = container.querySelector('#catalog-title')
  const empty = container.querySelector('#catalog-empty')

  if (products.length === 0) {
    title.textContent = 'Catálogo'
    grid.classList.add('hidden')
    empty.classList.remove('hidden')
    return
  }

  title.textContent = `🎄 Catálogo (${products.length} productos)`

  const frag = document.createDocumentFragment()
  for (const product of products) {
    frag.appendChild(renderProductCard(product))
  }
  grid.appendChild(frag)
}
