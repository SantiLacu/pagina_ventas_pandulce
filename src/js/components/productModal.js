export function renderProductModal(product) {
  if (!product) return ''

  const { imagenes, nombre, descripcion, subtipos, precio } = product

  const hasSubtipos = subtipos && subtipos.length > 0
  const precioMostrar = hasSubtipos ? subtipos[0].precio : precio

  return `
    <div id="product-modal" class="fixed inset-0 bg-navidad-oscuro/80 backdrop-blur z-50 hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-transform duration-300" style="transform: scale(0.9);">
        <!-- Header del modal -->
        <div class="p-6 border-b border-navidad-crema">
          <h2 id="modal-title" class="font-display text-2xl font-bold text-navidad-rojo">${nombre}</h2>
          <button id="modal-close" class="absolute top-4 right-4 text-navidad-oscuro/60 hover:text-navidad-rojo" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Slider de imágenes -->
        <div class="flex-1 relative">
          <div class="relative p-6">
            <img id="modal-main-img"
                 src="${imagenes[0]}"
                 alt="${nombre} - imagen 1"
                 class="w-full h-64 object-cover rounded-t-2xl"
                 loading="lazy"
                 decoding="async" />
            
            <!-- Flechas laterales -->
            <div class="absolute top-1/2 -translate-y-1/2 w-full flex justify-between p-2">
              <button id="modal-prev"
                      class="bg-white/20 rounded-full p-2 hover:bg-white transition-colors"
                      aria-label="Imagen anterior">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button id="modal-next"
                      class="bg-white/20 rounded-full p-2 hover:bg-white transition-colors"
                      aria-label="Imagen siguiente">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Miniaturas -->
            <div id="modal-thumbs"
                 class="mt-4 flex gap-2 overflow-x-auto justify-center">
              ${imagenes.map((img, i) => `
                <button data-img="${i}"
                        class="w-16 h-16 rounded overflow-hidden object-cover ${
                          i === 0 ? 'border-navidad-rojo border-2' : 'border-transparent'
                        } hover:border-navidad-oscuro transition-all">
                  <img src="${img}" alt="${nombre} - miniatura ${i + 1}" class="w-full h-full object-cover" loading="lazy" />
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Información del producto -->
        <div class="p-6 flex flex-col gap-4">
          <p id="modal-desc" class="text-navidad-oscuro/70 line-clamp-3">${descripcion}</p>
          
          ${hasSubtipos ? `
            <div>
              <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide">Elegí una opción:</p>
              <div class="flex flex-wrap gap-2">
                ${subtipos.map((s, i) => `
                  <button data-subtipo="${s.nombre}" data-precio="${s.precio}"
                          class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                            i === 0 ? 'border-navidad-rojo bg-navidad-rojo text-white' : 'border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50'
                          }">
                    ${s.nombre}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-navidad-verde">$ ${precioMostrar.toLocaleString('es-AR')}</p>
            <button id="modal-add-cart"
                    class="btn-primary px-6 py-2">
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
  let currentImgIndex = 0

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
    // Limpiar event listeners si es necesario
  }
}
