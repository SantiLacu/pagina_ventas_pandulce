import { addToCart } from '../data/cartStore.js'

export function renderProductModal(product) {
  if (!product) return ''

  const { imagenes, nombre, descripcion, subtipos, terminaciones, precio } = product

  const hasSubtipos = subtipos && subtipos.length > 0
  const hasTerminaciones = terminaciones && terminaciones.length > 0
  const baseInicial = hasSubtipos ? subtipos[0].precio : precio
  const extraInicial = hasTerminaciones ? terminaciones[0].precio : 0
  const precioMostrar = baseInicial + extraInicial

  return `
    <div id="product-modal" class="fixed inset-0 bg-navidad-oscuro/80 backdrop-blur z-50 hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="bg-white rounded-2xl w-full max-w-md max-h-[95dvh] overflow-hidden flex flex-col transform transition-transform duration-300" style="transform: scale(0.9);">
        <!-- Header del modal -->
        <div class="p-6 border-b border-navidad-crema relative">
          <h2 id="modal-title" class="font-display text-2xl font-bold text-navidad-rojo">${nombre}</h2>
          <button id="modal-close" class="absolute top-3 right-3 p-2 rounded-lg text-navidad-oscuro/60 hover:text-navidad-rojo transition-colors" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Contenido scrollable: imagen + info -->
        <div class="flex-1 overflow-y-auto overscroll-contain flex flex-col">
          <!-- Slider de imágenes - altura fija -->
          <div class="relative flex-shrink-0">
            <div class="relative w-full aspect-[4/5] max-h-[60svh] bg-navidad-crema">
              <img id="modal-main-img"
                   src="${imagenes[0]}"
                   alt="${nombre} - imagen 1"
                   class="w-full h-full object-contain rounded-t-2xl"
                   loading="lazy"
                   decoding="async" />

              <!-- Flechas laterales centradas en la imagen -->
              <div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                <button id="modal-prev"
                        class="bg-white/70 md:bg-white/20 rounded-full p-3 hover:bg-white transition-colors z-10"
                        aria-label="Imagen anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button id="modal-next"
                        class="bg-white/70 md:bg-white/20 rounded-full p-3 hover:bg-white transition-colors z-10"
                        aria-label="Imagen siguiente">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Miniaturas -->
            <div id="modal-thumbs"
                 class="mt-4 flex gap-2 overflow-x-auto no-scrollbar justify-center px-6 pb-4">
              ${imagenes.map((img, i) => `
                <button data-img="${i}"
                        class="w-16 h-16 rounded overflow-hidden object-cover flex-shrink-0 ${
                          i === 0 ? 'border-navidad-rojo border-2' : 'border-transparent'
                        } hover:border-navidad-oscuro transition-all">
                  <img src="${img}" alt="${nombre} - miniatura ${i + 1}" class="w-full h-full object-cover" loading="lazy" />
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Información del producto -->
          <div class="p-6 flex flex-col gap-4 flex-1 min-h-0">
            <p id="modal-desc" class="text-navidad-oscuro/70">${descripcion}</p>

            ${hasSubtipos ? `
              <div>
                <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide">Elegí una opción:</p>
                <div class="flex flex-wrap gap-2 mt-2">
                  ${subtipos.map((s, i) => `
                    <button data-subtipo="${s.nombre}" data-precio="${s.precio}"
                            class="subtipo-btn px-3 py-2 rounded-full text-xs font-medium border-2 transition-all ${
                              i === 0 ? 'border-navidad-rojo bg-navidad-rojo text-white' : 'border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50'
                            }">
                      ${s.nombre}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${hasTerminaciones ? `
              <div>
                <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide">Terminación:</p>
                <div class="flex flex-wrap gap-2 mt-2">
                  ${terminaciones.map((t, i) => `
                    <button data-terminacion="${t.nombre}" data-extra="${t.precio}"
                            class="terminacion-btn px-3 py-2 rounded-full text-xs font-medium border-2 transition-all ${
                              i === 0 ? 'border-navidad-rojo bg-navidad-rojo text-white' : 'border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50'
                            }">
                      ${t.nombre}${t.precio > 0 ? ` (+$ ${t.precio.toLocaleString('es-AR')})` : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Barra inferior fija con precio y botón -->
        <div class="bg-white border-t border-navidad-crema p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sticky bottom-0">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p id="modal-price" class="text-2xl font-bold text-navidad-verde">$ ${precioMostrar.toLocaleString('es-AR')}</p>
            <button id="modal-add-cart"
                    class="btn-primary px-6 py-3 w-full sm:w-auto text-base">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

// Función para adjuntar event listeners al modal DESPUÉS de que se renderice
export function initModalListeners(product) {
  const modal = document.getElementById('product-modal')
  if (!modal) return

  const modalClose = document.getElementById('modal-close')
  const modalMainImg = document.getElementById('modal-main-img')
  const modalPrev = document.getElementById('modal-prev')
  const modalNext = document.getElementById('modal-next')
  const modalThumbs = modal.querySelectorAll('#modal-thumbs button')
  const modalPrice = document.getElementById('modal-price')
  const modalAddCart = document.getElementById('modal-add-cart')
  let currentImgIndex = 0
  const hasSubtipos = product.subtipos && product.subtipos.length > 0
  const hasTerminaciones = product.terminaciones && product.terminaciones.length > 0
  let selectedSubtipo = hasSubtipos ? product.subtipos[0].nombre : null
  let selectedBasePrecio = hasSubtipos ? product.subtipos[0].precio : product.precio
  let selectedTerminacion = hasTerminaciones ? product.terminaciones[0].nombre : null
  let selectedTerminacionExtra = hasTerminaciones ? product.terminaciones[0].precio : 0

  const actualizarPrecio = () => {
    if (modalPrice) {
      modalPrice.textContent = `$ ${(selectedBasePrecio + selectedTerminacionExtra).toLocaleString('es-AR')}`
    }
  }

  // Cerrar modal con botón X
  modalClose.addEventListener('click', closeModal)

  // Cerrar al hacer click fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Cerrar con Escape
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeModal()
      document.removeEventListener('keydown', handleKeydown)
    }
  }
  document.addEventListener('keydown', handleKeydown)

  // Flecha anterior
  modalPrev.addEventListener('click', () => {
    currentImgIndex--
    if (currentImgIndex < 0) currentImgIndex = product.imagenes.length - 1
    updateModalImage(currentImgIndex)
  })

  // Flecha siguiente
  modalNext.addEventListener('click', () => {
    currentImgIndex++
    if (currentImgIndex >= product.imagenes.length) currentImgIndex = 0
    updateModalImage(currentImgIndex)
  })

  // Thumbnails
  modalThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.img, 10)
      currentImgIndex = idx
      updateModalImage(currentImgIndex)
    })
  })

  // Teclas de flecha para navegación
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') {
        currentImgIndex--
        if (currentImgIndex < 0) currentImgIndex = product.imagenes.length - 1
        updateModalImage(currentImgIndex)
      } else if (e.key === 'ArrowRight') {
        currentImgIndex++
        if (currentImgIndex >= product.imagenes.length) currentImgIndex = 0
        updateModalImage(currentImgIndex)
      }
    }
  })

  // Selector de subtipos
  const subtipoBtns = modal.querySelectorAll('.subtipo-btn')
  subtipoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedSubtipo = btn.dataset.subtipo
      selectedBasePrecio = parseInt(btn.dataset.precio, 10)
      actualizarPrecio()
      subtipoBtns.forEach((b) => {
        b.classList.remove('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
        b.classList.add('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
      })
      btn.classList.add('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
      btn.classList.remove('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
    })
  })

  // Selector de terminación (glaseado/bañado)
  const terminacionBtns = modal.querySelectorAll('.terminacion-btn')
  terminacionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedTerminacion = btn.dataset.terminacion
      selectedTerminacionExtra = parseInt(btn.dataset.extra, 10)
      actualizarPrecio()
      terminacionBtns.forEach((b) => {
        b.classList.remove('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
        b.classList.add('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
      })
      btn.classList.add('border-navidad-rojo', 'bg-navidad-rojo', 'text-white')
      btn.classList.remove('border-navidad-oscuro/20', 'text-navidad-oscuro/70')
    })
  })

  // Botón agregar al carrito
  modalAddCart.addEventListener('click', () => {
    addToCart({
      slug: product.slug,
      nombre: product.nombre,
      subtipoNombre: selectedSubtipo,
      terminacionNombre: selectedTerminacion,
      precio: selectedBasePrecio + selectedTerminacionExtra,
      imagen: product.imagenes[currentImgIndex],
    })
    closeModal()
  })

  function updateModalImage(idx) {
    currentImgIndex = idx
    if (product.imagenes[currentImgIndex]) {
      modalMainImg.src = product.imagenes[currentImgIndex]
      modalMainImg.alt = `${product.nombre} - imagen ${currentImgIndex + 1}`
    }
    modalThumbs.forEach((t) => {
      t.classList.remove('border-navidad-rojo', 'border-2')
      t.classList.add('border-transparent')
    })
    if (modalThumbs[currentImgIndex]) {
      modalThumbs[currentImgIndex].classList.add('border-navidad-rojo', 'border-2')
    }
  }

  function closeModal() {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
    document.body.style.overflow = ''
    // Limpiar event listeners si es necesario
  }
}
