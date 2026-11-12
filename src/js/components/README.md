# src/js/components/

## Descripción
Componentes UI de la aplicación. Cada componente se encarga de renderizar su sección en el DOM y manejar sus eventos.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `header.js` | Barra superior: logo, menú hamburguesa (mobile), enlaces de navegación, badge de carrito. Sticky con efecto al hacer scroll. |
| `hero.js` | Sección de presentación "Quiénes Somos". Fondo con slideshow de imágenes de productos (crossfade automático cada 5s). Overlay degradado para legibilidad. Botón CTA al catálogo. Al hacer clic en cualquier imagen del carrusel se abre el modal del producto correspondiente. |
| `catalog.js` | Grid responsive de productos. Llama a `productService.getProducts()` y renderiza una `productCard` por cada producto. |
| `productCard.js` | Tarjeta de producto: galería de fotos con flechas laterales para desplazarse entre imágenes y carrusel de miniaturas, nombre, descripción, selector de subtipos (si tiene), selector de terminación (si el producto tiene `terminaciones`, ej: Glaseado/Bañado con +$2000; por defecto la primera opción), precio dinámico (subtipo + terminación), botón "Agregar al carrito". Al hacer clic en la tarjeta (fuera de los botones) se abre el modal del producto. Exporta `openProductModal(product)` para usar desde otros componentes (ej: el hero). |
| `productModal.js` | Modal de producto: slider de imágenes con flechas y miniaturas, descripción, selector de subtipos (si tiene), selector de terminación (si el producto tiene `terminaciones`), precio dinámico (subtipo + terminación), botón "Agregar al carrito". Exporta `renderProductModal(product)` y `initModalListeners(product)`, usados por `productCard.js`. |
| `cartDrawer.js` | Panel lateral deslizable que lista los items del carrito. Permite cambiar cantidades, eliminar items y muestra el total. Botón "Finalizar compra". |
| `checkoutModal.js` | Modal con formulario (nombre, teléfono, dirección, comentarios). Al enviar: valida, POST a Google Sheets, construye mensaje de WhatsApp y abre `wa.me`. |
| `footer.js` | Pie de página: datos de contacto, redes sociales, horarios, links rápidos, copyright. |
