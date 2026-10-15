import { addToCart } from '../data/cartStore.js'
import { renderProductModal, initModalListeners } from './productModal.js'

export function renderProductCard(product) {
  const card = document.createElement('article')
  card.className =
    'bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col'

  // Agregar dataset con datos del producto para el modal
  card.dataset.product = JSON.stringify(product)

  const hasSubtipos = product.subtipos && product.subtipos.length > 0
  const precioInicial = hasSubtipos ? product.subtipos[0].precio : product.precio
  const subtipoInicial = hasSubtipos ? product.subtipos[0].nombre : null

  card.innerHTML = `
    <div class="relative aspect-square bg-navidad-crema overflow-hidden group cursor-pointer">
      <img id="main-img-${product.slug}"
           src="${product.imagenes[0]}"
           alt="${product.nombre}"
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           loading="lazy"
           decoding="async"
           width="400"
           height="400" />
      ${product.imagenes.length > 1 ? `
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur px-2 py-1.5 rounded-full">
          ${product.imagenes
            .map(
              (_, i) => `
              <button data-img="${i}"
                      class="thumb w-2 h-2 rounded-full transition-all ${
                        i === 0 ? 'bg-navidad-dorado scale-125' : 'bg-white/60 hover:bg-white'
                      }"
                      aria-label="Ver imagen ${i + 1}"></button>
            `
            )
            .join('')}
        </div>
      ` : ''}
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h3 class="font-display text-xl font-bold text-navidad-rojo">${product.nombre}</h3>
      <p class="mt-2 text-sm text-navidad-oscuro/70 line-clamp-2 flex-grow">${product.descripcion}</p>

      ${
        hasSubtipos
          ? `
        <div class="mt-4">
          <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide mb-2">Elegí una opción:</p>
          <div class="flex flex-wrap gap-2">
            ${product.subtipos
              .map(
                (s, i) => `
                <button data-subtipo="${s.nombre}" data-precio="${s.precio}"
                        class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                          i === 0
                            ? 'border-navidad-rojo bg-navidad-rojo text-white'
                            : 'border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50'
                        }">
                  ${s.nombre}
                </button>
              `
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }

      <div class="mt-4 flex items-center justify-between">
        <p id="precio-${product.slug}" class="text-2xl font-bold text-navidad-verde">
          $ ${precioInicial.toLocaleString('es-AR')}
        </p>
      </div>

      <button id="add-${product.slug}"
              class="mt-4 btn-primary w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Agregar al carrito
      </button>
    </div>
  `

  let selectedSubtipo = subtipoInicial
  let selectedPrecio = precioInicial
  let currentImg = 0

  const mainImg = card.querySelector(`#main-img-${product.slug}`)
  const precioEl = card.querySelector(`#precio-${product.slug}`)
  const addBtn = card.querySelector(`#add-${product.slug}`)

  // Event listener para abrir el modal al hacer click en la tarjeta
  card.addEventListener('click', (e) => {
    // Evitar que se abra el modal si se clickearon botones internos
    if (e.target.closest('#add-${product.slug}') || 
        e.target.closest('.subtipo-btn') || 
        e.target.closest('.thumb')) {
      return
    }
    openProductModal(product)
  })

  card.querySelectorAll('.thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.img, 10)
      currentImg = idx
      mainImg.src = product.imagenes[idx]
      // Force image re-load by triggering a re-offset
      mainImg.style.display = 'none'
      void mainImg.offsetWidth // Trigger reflow
      mainImg.style.display = ''
      card.querySelectorAll('.thumb').forEach((t) => {
        t.classList.remove('bg-navidad-dorado', 'scale-125')
        t.classList.add('bg-white/60')
      })
      thumb.classList.add('bg-navidad-dorado', 'scale-125')
      thumb.classList.remove('bg-white/60')
    })
  })

  card.querySelectorAll('.subtipo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedSubtipo = btn.dataset.subtipo
      selectedPrecio = parseInt(btn.dataset.precio, 10)
      precioEl.textContent = `$ ${selectedPrecio.toLocaleString('es-AR')}`

      card.querySelectorAll('.subtipo-btn').forEach((b) => {
        b.classList.remove('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
        b.classList.add('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
      })
      btn.classList.add('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
      btn.classList.remove('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
    })
  })

  addBtn.addEventListener('click', () => {
    addToCart({
      slug: product.slug,
      nombre: product.nombre,
      subtipoNombre: selectedSubtipo,
      precio: selectedPrecio,
      imagen: product.imagenes[currentImg],
    })

    const originalText = addBtn.innerHTML
    addBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      ¡Agregado!
    `
    addBtn.classList.remove('bg-navidad-rojo', 'hover:bg-navidad-rojoClaro')
    addBtn.classList.add('bg-navidad-verde', 'hover:bg-navidad-verdeClaro')

    setTimeout(() => {
      addBtn.innerHTML = originalText
      addBtn.classList.add('bg-navidad-rojo', 'hover:bg-navidad-rojoClaro')
      addBtn.classList.remove('bg-navidad-verde', 'hover:bg-navidad-verdeClaro')
    }, 1500)
  })

  return card
}

// Función para abrir el modal de producto
function openProductModal(product) {
  const modalContainer = document.getElementById('product-modal-container')
  if (!modalContainer) return

  modalContainer.innerHTML = renderProductModal(product)
  
  // Mostrar el modal
  const modal = document.getElementById('product-modal')
  if (modal) {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    
    // Inicializar listeners DESPUÉS de que el modal esté en el DOM
    initModalListeners(product)
  }
}
