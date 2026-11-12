import { addToCart } from '../data/cartStore.js'
import { renderProductModal, initModalListeners } from './productModal.js'

export function renderProductCard(product) {
  const card = document.createElement('article')
  card.className =
    'bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col'

  // Agregar dataset con datos del producto para el modal
  card.dataset.product = JSON.stringify(product)

  const hasSubtipos = product.subtipos && product.subtipos.length > 0
  const baseInicial = hasSubtipos ? product.subtipos[0].precio : product.precio
  const subtipoInicial = hasSubtipos ? product.subtipos[0].nombre : null

  const hasTerminaciones = product.terminaciones && product.terminaciones.length > 0
  const terminacionInicial = hasTerminaciones ? product.terminaciones[0].nombre : null
  const terminacionExtraInicial = hasTerminaciones ? product.terminaciones[0].precio : 0
  const precioInicial = baseInicial + terminacionExtraInicial

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
        <!-- Flechas laterales -->
        <div class="absolute top-1/2 -translate-y-1/2 w-full flex justify-between p-2 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto">
          <button id="card-prev-${product.slug}"
                  class="bg-white/70 md:bg-white/20 backdrop-blur rounded-full p-3 hover:bg-white transition-colors pointer-events-auto"
                  aria-label="Imagen anterior">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button id="card-next-${product.slug}"
                  class="bg-white/70 md:bg-white/20 backdrop-blur rounded-full p-3 hover:bg-white transition-colors pointer-events-auto"
                  aria-label="Imagen siguiente">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
                        class="subtipo-btn px-3 py-2 rounded-full text-xs font-medium border-2 transition-all ${
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

      ${
        hasTerminaciones
          ? `
        <div class="mt-4">
          <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide mb-2">Terminación:</p>
          <div class="flex flex-wrap gap-2">
            ${product.terminaciones
              .map(
                (t, i) => `
                <button data-terminacion="${t.nombre}" data-extra="${t.precio}"
                        class="terminacion-btn px-3 py-2 rounded-full text-xs font-medium border-2 transition-all ${
                          i === 0
                            ? 'border-navidad-rojo bg-navidad-rojo text-white'
                            : 'border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50'
                        }">
                  ${t.nombre}${t.precio > 0 ? ` (+$ ${t.precio.toLocaleString('es-AR')})` : ''}
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
  let selectedBasePrecio = baseInicial
  let selectedTerminacion = terminacionInicial
  let selectedTerminacionExtra = terminacionExtraInicial
  let currentImg = 0

  const actualizarPrecio = () => {
    precioEl.textContent = `$ ${(selectedBasePrecio + selectedTerminacionExtra).toLocaleString('es-AR')}`
  }

  const mainImg = card.querySelector(`#main-img-${product.slug}`)
  const precioEl = card.querySelector(`#precio-${product.slug}`)
  const addBtn = card.querySelector(`#add-${product.slug}`)

  // Event listener para abrir el modal al hacer click en la tarjeta
  card.addEventListener('click', (e) => {
    // Evitar que se abra el modal si se clickearon botones internos
    if (e.target.closest(`#add-${product.slug}`) ||
        e.target.closest('.subtipo-btn') ||
        e.target.closest('.terminacion-btn')) {
      return
    }
    openProductModal(product)
  })

  // Event listeners para navegación con flechas (nuevo componente)
  const prevBtn = card.querySelector(`#card-prev-${product.slug}`)
  const nextBtn = card.querySelector(`#card-next-${product.slug}`)

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      currentImg--
      if (currentImg < 0) currentImg = product.imagenes.length - 1
      mainImg.src = product.imagenes[currentImg]
      // Force image re-load by triggering a re-offset
      mainImg.style.display = 'none'
      void mainImg.offsetWidth // Trigger reflow
      mainImg.style.display = ''
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      currentImg++
      if (currentImg >= product.imagenes.length) currentImg = 0
      mainImg.src = product.imagenes[currentImg]
      // Force image re-load by triggering a re-offset
      mainImg.style.display = 'none'
      void mainImg.offsetWidth // Trigger reflow
      mainImg.style.display = ''
    })
  }

  card.querySelectorAll('.subtipo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedSubtipo = btn.dataset.subtipo
      selectedBasePrecio = parseInt(btn.dataset.precio, 10)
      actualizarPrecio()

      card.querySelectorAll('.subtipo-btn').forEach((b) => {
        b.classList.remove('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
        b.classList.add('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
      })
      btn.classList.add('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
      btn.classList.remove('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
    })
  })

  card.querySelectorAll('.terminacion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedTerminacion = btn.dataset.terminacion
      selectedTerminacionExtra = parseInt(btn.dataset.extra, 10)
      actualizarPrecio()

      card.querySelectorAll('.terminacion-btn').forEach((b) => {
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
      terminacionNombre: selectedTerminacion,
      precio: selectedBasePrecio + selectedTerminacionExtra,
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
export function openProductModal(product) {
  const modalContainer = document.getElementById('product-modal-container')
  if (!modalContainer) return

  // Limpiar contenido anterior y renderizar el modal
  modalContainer.innerHTML = renderProductModal(product)

  // Quitar hidden del contenedor (display:none) para que el modal sea visible
  modalContainer.classList.remove('hidden')
  modalContainer.classList.add('flex', 'items-center', 'justify-center')

  // Mostrar el modal
  const modal = document.getElementById('product-modal')
  if (modal) {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    document.body.style.overflow = 'hidden'

    // Inicializar listeners DESPUÉS de que el modal esté en el DOM
    initModalListeners(product)
  }
}
