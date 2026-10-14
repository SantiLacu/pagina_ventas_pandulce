# src/js/components/

## Descripción
Componentes UI de la aplicación. Cada componente se encarga de renderizar su sección en el DOM y manejar sus eventos.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `header.js` | Barra superior: logo, menú hamburguesa (mobile), enlaces de navegación, badge de carrito. Sticky con efecto al hacer scroll. |
| `hero.js` | Sección de presentación "Quiénes Somos". Fondo con slideshow de imágenes de productos (crossfade automático cada 5s). Overlay degradado para legibilidad. Botón CTA al catálogo. |
| `catalog.js` | Grid responsive de productos. Llama a `productService.getProducts()` y renderiza una `productCard` por cada producto. |
| `productCard.js` | Tarjeta de producto: galería de fotos (carrusel miniatura), nombre, descripción, selector de subtipos (si tiene), precio dinámico, botón "Agregar al carrito". |
| `cartDrawer.js` | Panel lateral deslizable que lista los items del carrito. Permite cambiar cantidades, eliminar items y muestra el total. Botón "Finalizar compra". |
| `checkoutModal.js` | Modal con formulario (nombre, teléfono, dirección, comentarios). Al enviar: valida, POST a Google Sheets, construye mensaje de WhatsApp y abre `wa.me`. |
| `footer.js` | Pie de página: datos de contacto, redes sociales, horarios, links rápidos, copyright. |
