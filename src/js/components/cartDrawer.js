import { getCart, getCartTotal, getCartCount, updateQty, removeFromCart, subscribe } from '../data/cartStore.js'

export function renderCartDrawer(container) {
  container.innerHTML = `
    <div id="cart-overlay" class="fixed inset-0 z-[60] bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <aside id="cart-drawer"
           class="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col"
           role="dialog"
           aria-label="Carrito de compras"
           aria-hidden="true">
      <div class="flex items-center justify-between p-4 border-b border-navidad-oscuro/10 bg-navidad-rojo text-white">
        <h2 class="font-display text-xl font-bold flex items-center gap-2">
          🛒 Tu Carrito
          <span id="cart-count" class="text-sm bg-navidad-dorado text-navidad-oscuro rounded-full px-2 py-0.5 font-bold">0</span>
        </h2>
        <button id="cart-close" class="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Cerrar carrito">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div id="cart-items" class="flex-grow overflow-y-auto p-4 space-y-3"></div>

      <div id="cart-footer" class="border-t border-navidad-oscuro/10 p-4 bg-navidad-crema">
        <div class="flex items-center justify-between mb-4">
          <span class="font-display text-lg font-bold text-navidad-oscuro">Total:</span>
          <span id="cart-total" class="font-display text-2xl font-bold text-navidad-verde">$ 0</span>
        </div>
        <button id="cart-checkout" class="btn-primary w-full">
          Finalizar compra
        </button>
      </div>
    </aside>
  `

  const overlay = container.querySelector('#cart-overlay')
  const drawer = container.querySelector('#cart-drawer')
  const closeBtn = container.querySelector('#cart-close')
  const itemsEl = container.querySelector('#cart-items')
  const countEl = container.querySelector('#cart-count')
  const totalEl = container.querySelector('#cart-total')
  const checkoutBtn = container.querySelector('#cart-checkout')

  function open() {
    overlay.classList.remove('opacity-0', 'pointer-events-none')
    overlay.classList.add('opacity-100')
    drawer.classList.remove('translate-x-full')
    drawer.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  function close() {
    overlay.classList.add('opacity-0', 'pointer-events-none')
    overlay.classList.remove('opacity-100')
    drawer.classList.add('translate-x-full')
    drawer.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  function render() {
    const cart = getCart()
    const total = getCartTotal()
    const count = getCartCount()

    countEl.textContent = count
    totalEl.textContent = `$ ${total.toLocaleString('es-AR')}`

    if (cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-navidad-oscuro/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="mt-4 text-navidad-oscuro/60 font-medium">Tu carrito está vacío</p>
          <p class="mt-1 text-sm text-navidad-oscuro/40">Agregá productos desde el catálogo</p>
          <button id="cart-empty-close" class="mt-6 btn-gold">Ver catálogo</button>
        </div>
      `
      itemsEl.querySelector('#cart-empty-close').addEventListener('click', () => {
        close()
        document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' })
      })
      checkoutBtn.classList.add('opacity-50', 'pointer-events-none')
      return
    }

    checkoutBtn.classList.remove('opacity-50', 'pointer-events-none')

    itemsEl.innerHTML = cart
      .map(
        (item) => `
        <div class="flex gap-3 p-3 bg-white rounded-xl border border-navidad-oscuro/10">
          <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div class="flex-grow min-w-0">
            <h4 class="font-semibold text-sm text-navidad-oscuro truncate">${item.nombre}</h4>
            ${item.subtipo ? `<p class="text-xs text-navidad-oscuro/50">${item.subtipo}</p>` : ''}
            <p class="text-sm font-bold text-navidad-verde mt-1">$ ${item.precio.toLocaleString('es-AR')}</p>
            <div class="flex items-center gap-2 mt-2">
              <button data-dec="${item.id}" class="w-7 h-7 rounded-full bg-navidad-oscuro/10 hover:bg-navidad-oscuro/20 flex items-center justify-center text-navidad-oscuro font-bold transition-colors" aria-label="Disminuir cantidad">−</button>
              <span class="text-sm font-medium w-6 text-center">${item.cantidad}</span>
              <button data-inc="${item.id}" class="w-7 h-7 rounded-full bg-navidad-rojo text-white hover:bg-navidad-rojoClaro flex items-center justify-center font-bold transition-colors" aria-label="Aumentar cantidad">+</button>
              <button data-del="${item.id}" class="ml-auto text-navidad-rojo/60 hover:text-navidad-rojo transition-colors" aria-label="Eliminar item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join('')

    itemsEl.querySelectorAll('[data-inc]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.inc
        const item = getCart().find((i) => i.id === id)
        if (item) updateQty(id, item.cantidad + 1)
      })
    })

    itemsEl.querySelectorAll('[data-dec]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.dec
        const item = getCart().find((i) => i.id === id)
        if (item) updateQty(id, item.cantidad - 1)
      })
    })

    itemsEl.querySelectorAll('[data-del]').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.del)
      })
    })
  }

  subscribe(render)

  closeBtn.addEventListener('click', close)
  overlay.addEventListener('click', close)

  checkoutBtn.addEventListener('click', () => {
    close()
    document.dispatchEvent(new CustomEvent('checkout:open'))
  })

  document.addEventListener('cart:open', open)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
      close()
    }
  })

  render()
}
