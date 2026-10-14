import { getProducts } from '../data/productService.js'
import { CONFIG } from '../config.js'

export async function renderHero(container) {
  container.id = 'inicio'
  container.className =
    'relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navidad-oscuro'

  container.innerHTML = `
    <div id="hero-slides" class="absolute inset-0"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-navidad-rojo/70 via-navidad-oscuro/60 to-navidad-verde/70"></div>
    <div class="absolute inset-0 bg-black/30"></div>

    <div class="relative z-10 container-page text-center text-white px-4 py-20">
      <span class="inline-block px-4 py-1 rounded-full bg-navidad-dorado/90 text-navidad-oscuro text-sm font-bold uppercase tracking-wider mb-6 animate-fade-in">
        🎄 Felices Fiestas
      </span>
      <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-slide-up">
        ${CONFIG.NOMBRE_NEGOCIO}
      </h1>
      <p class="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white/90 animate-slide-up" style="animation-delay: 0.1s">
        Productos artesanales hechos con amor para estas fiestas.
        Pedí por WhatsApp y recibí en tu casa.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 0.2s">
        <a href="#catalogo" class="btn-gold w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Ver Catálogo
        </a>
        <a href="https://wa.me/${CONFIG.NRO_WHATSAPP}"
           target="_blank"
           rel="noopener noreferrer"
           class="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/25 w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  `

  await initSlideshow()
}

async function initSlideshow() {
  const slidesContainer = document.getElementById('hero-slides')
  if (!slidesContainer) return

  const products = await getProducts()
  const images = products
    .filter((p) => p.imagenes && p.imagenes.length > 0)
    .map((p) => p.imagenes[0])

  if (images.length === 0) {
    slidesContainer.style.background = 'linear-gradient(135deg, #C1121F, #065F46)'
    return
  }

  slidesContainer.innerHTML = images
    .map(
      (src, i) => `
      <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        i === 0 ? 'opacity-100' : 'opacity-0'
      }" style="background-image: url('${src}'); background-size: cover; background-position: center;"></div>
    `
    )
    .join('')

  let current = 0
  const total = images.length

  if (total > 1) {
    setInterval(() => {
      const slides = slidesContainer.children
      slides[current].classList.replace('opacity-100', 'opacity-0')
      current = (current + 1) % total
      slides[current].classList.replace('opacity-0', 'opacity-100')
    }, CONFIG.HERO_INTERVAL_MS)
  }
}
