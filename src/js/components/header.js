import { CONFIG } from '../config.js'
import { getCartCount, subscribe } from '../data/cartStore.js'

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#contacto', label: 'Contacto' },
]

export function renderHeader(container) {
  container.innerHTML = `
    <header id="site-header" class="sticky top-0 z-50 bg-navidad-rojo text-white transition-shadow duration-300">
      <div class="container-page flex items-center justify-between h-16">
        <a href="#inicio" class="flex items-center gap-2 group" aria-label="${CONFIG.NOMBRE_NEGOCIO}">
          <span class="text-2xl">🎄</span>
          <span class="font-display text-xl font-bold tracking-wide group-hover:text-navidad-dorado transition-colors">
            ${CONFIG.NOMBRE_NEGOCIO}
          </span>
        </a>

        <nav class="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          ${NAV_LINKS.map(
            (link) => `
            <a href="${link.href}"
               class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-navidad-dorado transition-colors">
              ${link.label}
            </a>
          `
          ).join('')}
        </nav>

        <div class="flex items-center gap-2">
          <button id="cart-btn"
                  class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Abrir carrito">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span id="cart-badge"
                  class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-navidad-dorado text-navidad-oscuro text-xs font-bold hidden">
              0
            </span>
          </button>

          <button id="menu-btn"
                  class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Abrir menú"
                  aria-expanded="false">
            <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="md:hidden hidden border-t border-white/10 bg-navidad-rojo">
        <nav class="container-page py-3 flex flex-col gap-1" aria-label="Navegación móvil">
          ${NAV_LINKS.map(
            (link) => `
            <a href="${link.href}"
               class="mobile-nav-link px-3 py-3 rounded-lg text-base font-medium hover:bg-white/10 hover:text-navidad-dorado transition-colors">
              ${link.label}
            </a>
          `
          ).join('')}
        </nav>
      </div>
    </header>
  `

  setupInteractions()
}

function setupInteractions() {
  const menuBtn = document.getElementById('menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')
  const iconMenu = document.getElementById('icon-menu')
  const iconClose = document.getElementById('icon-close')
  const cartBtn = document.getElementById('cart-btn')
  const cartBadge = document.getElementById('cart-badge')
  const header = document.getElementById('site-header')

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden')
    if (isOpen) {
      mobileMenu.classList.add('hidden')
      iconMenu.classList.remove('hidden')
      iconClose.classList.add('hidden')
      menuBtn.setAttribute('aria-expanded', 'false')
    } else {
      mobileMenu.classList.remove('hidden')
      iconMenu.classList.add('hidden')
      iconClose.classList.remove('hidden')
      menuBtn.setAttribute('aria-expanded', 'true')
    }
  })

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
      iconMenu.classList.remove('hidden')
      iconClose.classList.add('hidden')
      menuBtn.setAttribute('aria-expanded', 'false')
    })
  })

  cartBtn.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('cart:open'))
  })

  subscribe((cart) => {
    const count = cart.reduce((sum, item) => sum + item.cantidad, 0)
    if (count > 0) {
      cartBadge.textContent = count
      cartBadge.classList.remove('hidden')
    } else {
      cartBadge.classList.add('hidden')
    }
  })

  let lastScroll = 0
  window.addEventListener('scroll', () => {
    const current = window.scrollY
    if (current > 10) {
      header.classList.add('shadow-lg')
    } else {
      header.classList.remove('shadow-lg')
    }
    lastScroll = current
  }, { passive: true })
}
