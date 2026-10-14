# src/js/data/

## Descripción
Capa de datos: manejo del catálogo de productos y el estado del carrito.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `productService.js` | Expone `getProducts()` que hace `fetch('/products/manifest.json')`. Cachea el resultado en memoria tras el primer llamado para no repetir fetches. |
| `cartStore.js` | Estado del carrito persistido en `localStorage`. Expose `getCart()`, `addToCart(item)`, `removeFromCart(id)`, `updateQty(id, qty)`, `clearCart()`, `getTotal()`. Emite eventos `cart:changed`. |
