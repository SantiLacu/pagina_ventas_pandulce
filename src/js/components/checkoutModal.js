import { sendToWhatsApp } from '../utils/whatsapp.js'
import { sendToSheets } from '../utils/sheets.js'
import { getCart, getCartTotal } from '../data/cartStore.js'

export function renderCheckoutModal(container) {
  container.innerHTML = `
    <div id="checkout-overlay" class="fixed inset-0 z-[80] bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <div id="checkout-modal"
         class="fixed inset-0 z-[90] flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-300"
         role="dialog"
         aria-modal="true"
         aria-labelledby="checkout-title">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform scale-95 transition-transform duration-300">
        <div class="p-6 border-b border-navidad-oscuro/10 bg-navidad-rojo text-white rounded-t-2xl flex items-center justify-between">
          <h2 id="checkout-title" class="font-display text-xl font-bold flex items-center gap-2">
            🎄 Finalizar compra
          </h2>
          <button id="checkout-close" class="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form id="checkout-form" class="p-6 space-y-4" novalidate>
          <div id="order-summary" class="bg-navidad-crema rounded-xl p-4 space-y-2"></div>

          <div>
            <label for="nombre" class="block text-sm font-medium text-navidad-oscuro mb-1">Nombre completo *</label>
            <input type="text" id="nombre" name="nombre" required autocomplete="name"
                   class="w-full px-4 py-3 rounded-xl border border-navidad-oscuro/20 focus:border-navidad-rojo focus:ring-2 focus:ring-navidad-rojo/20 outline-none transition-all" />
            <p class="error-message mt-1 text-sm text-navidad-rojo hidden" id="error-nombre">El nombre es obligatorio</p>
          </div>

          <div>
            <label for="telefono" class="block text-sm font-medium text-navidad-oscuro mb-1">Teléfono *</label>
            <input type="tel" id="telefono" name="telefono" required autocomplete="tel"
                   class="w-full px-4 py-3 rounded-xl border border-navidad-oscuro/20 focus:border-navidad-rojo focus:ring-2 focus:ring-navidad-rojo/20 outline-none transition-all"
                   placeholder="+54 9 11 1234-5678" />
            <p class="error-message mt-1 text-sm text-navidad-rojo hidden" id="error-telefono">Teléfono válido requerido</p>
          </div>

          <div>
            <label for="direccion" class="block text-sm font-medium text-navidad-oscuro mb-1">Dirección de entrega</label>
            <textarea id="direccion" name="direccion" rows="2" autocomplete="street-address"
                      class="w-full px-4 py-3 rounded-xl border border-navidad-oscuro/20 focus:border-navidad-rojo focus:ring-2 focus:ring-navidad-rojo/20 outline-none transition-all resize-none"
                      placeholder="Calle, número, piso, depto, localidad"></textarea>
          </div>

          <div>
            <label for="comentarios" class="block text-sm font-medium text-navidad-oscuro mb-1">Comentarios adicionales</label>
            <textarea id="comentarios" name="comentarios" rows="2"
                      class="w-full px-4 py-3 rounded-xl border border-navidad-oscuro/20 focus:border-navidad-rojo focus:ring-2 focus:ring-navidad-rojo/20 outline-none transition-all resize-none"
                      placeholder="Horario preferido, referencias, alergias, etc."></textarea>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-navidad-oscuro/10">
            <span class="font-display text-lg font-bold text-navidad-oscuro">Total:</span>
            <span id="checkout-total" class="font-display text-2xl font-bold text-navidad-verde">$ 0</span>
          </div>

          <button type="submit" id="checkout-submit" class="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="btn-text">Confirmar y abrir WhatsApp</span>
            <span class="btn-loading hidden flex items-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
              Enviando...
            </span>
          </button>

          <p class="text-xs text-center text-navidad-oscuro/50">
            Se abrirá WhatsApp con tu pedido completo. No se cobra nada aquí.
          </p>
        </form>
      </div>
    </div>
  `

  const overlay = container.querySelector('#checkout-overlay')
  const modal = container.querySelector('#checkout-modal')
  const closeBtn = container.querySelector('#checkout-close')
  const form = container.querySelector('#checkout-form')
  const submitBtn = container.querySelector('#checkout-submit')
  const btnText = container.querySelector('.btn-text')
  const btnLoading = container.querySelector('.btn-loading')

  function open() {
    renderSummary()
    overlay.classList.remove('opacity-0', 'pointer-events-none')
    overlay.classList.add('opacity-100')
    modal.classList.remove('opacity-0', 'pointer-events-none')
    modal.querySelector('div').classList.remove('scale-95')
    modal.querySelector('div').classList.add('scale-100')
    document.body.style.overflow = 'hidden'
    setTimeout(() => modal.querySelector('#nombre')?.focus(), 100)
  }

  function close() {
    overlay.classList.add('opacity-0', 'pointer-events-none')
    overlay.classList.remove('opacity-100')
    modal.classList.add('opacity-0', 'pointer-events-none')
    modal.querySelector('div').classList.add('scale-95')
    modal.querySelector('div').classList.remove('scale-100')
    document.body.style.overflow = ''
    form.reset()
    clearErrors()
  }

  function renderSummary() {
    const cart = getCart()
    const total = getCartTotal()
    const summary = container.querySelector('#order-summary')
    const totalEl = container.querySelector('#checkout-total')

    if (cart.length === 0) {
      summary.innerHTML = '<p class="text-navidad-oscuro/60 text-center">Carrito vacío</p>'
      return
    }

    summary.innerHTML = cart
      .map(
        (item) => `
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2">
            <img src="${item.imagen}" alt="" class="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p class="font-medium text-navidad-oscuro truncate max-w-[160px]">${item.nombre}</p>
              ${item.subtipo ? `<p class="text-xs text-navidad-oscuro/50">${item.subtipo}</p>` : ''}
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-navidad-verde">$ ${(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
            <p class="text-xs text-navidad-oscuro/50">x ${item.cantidad}</p>
          </div>
        </div>
      `
      )
      .join('')

    totalEl.textContent = `$ ${total.toLocaleString('es-AR')}`
  }

  function showError(field, message) {
    const input = container.querySelector(`#${field}`)
    const error = container.querySelector(`#error-${field}`)
    input.classList.add('border-navidad-rojo', 'focus:border-navidad-rojo', 'focus:ring-navidad-rojo/20')
    error.textContent = message
    error.classList.remove('hidden')
  }

  function clearErrors() {
    container.querySelectorAll('.error-message').forEach((e) => e.classList.add('hidden'))
    container.querySelectorAll('input, textarea').forEach((i) => {
      i.classList.remove('border-navidad-rojo', 'focus:border-navidad-rojo', 'focus:ring-navidad-rojo/20')
    })
  }

  function validateForm(data) {
    clearErrors()
    let valid = true

    if (!data.nombre.trim()) {
      showError('nombre', 'El nombre es obligatorio')
      valid = false
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/
    if (!data.telefono.trim() || !phoneRegex.test(data.telefono.replace(/\s/g, ''))) {
      showError('telefono', 'Ingresá un teléfono válido (ej: +54 9 11 1234-5678)')
      valid = false
    }

    return valid
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    if (!validateForm(data)) return

    if (getCart().length === 0) return

    submitBtn.disabled = true
    btnText.classList.add('hidden')
    btnLoading.classList.remove('hidden')

    try {
      // 1. Enviar a Google Sheets (no bloqueante)
      sendToSheets(data).catch(() => {}) // fire & forget, log en consola

      // 2. Abrir WhatsApp (siempre)
      sendToWhatsApp(data)
    } finally {
      submitBtn.disabled = false
      btnText.classList.remove('hidden')
      btnLoading.classList.add('hidden')
      close()
    }
  }

  closeBtn.addEventListener('click', close)
  overlay.addEventListener('click', close)
  form.addEventListener('submit', handleSubmit)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
      close()
    }
  })

  document.addEventListener('checkout:open', open)
}