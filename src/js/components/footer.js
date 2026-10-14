import { CONFIG } from '../config.js'

export function renderFooter(container) {
  const year = new Date().getFullYear()
  container.innerHTML = `
    <footer id="contacto" class="bg-navidad-verde text-white">
      <div class="container-page py-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎄</span>
              <span class="font-display text-xl font-bold">${CONFIG.NOMBRE_NEGOCIO}</span>
            </div>
            <p class="mt-3 text-sm text-white/80">
              Productos artesanales de calidad para estas fiestas. Pedí por WhatsApp y recibí en tu casa.
            </p>
          </div>

          <div>
            <h3 class="font-display text-lg font-bold text-navidad-dorado">Contacto</h3>
            <ul class="mt-3 space-y-2 text-sm text-white/80">
              <li>📱 WhatsApp: ${CONFIG.NRO_WHATSAPP}</li>
              <li>📍 Envíos a domicilio</li>
              <li>🕐 Lun a Sáb · 9 a 19 hs</li>
            </ul>
          </div>

          <div>
            <h3 class="font-display text-lg font-bold text-navidad-dorado">Navegación</h3>
            <ul class="mt-3 space-y-2 text-sm">
              <li><a href="#inicio" class="hover:text-navidad-dorado transition-colors">Inicio</a></li>
              <li><a href="#catalogo" class="hover:text-navidad-dorado transition-colors">Catálogo</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/60">
          © ${year} ${CONFIG.NOMBRE_NEGOCIO}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  `
}
