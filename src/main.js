import './style.css'
import { renderHeader } from './js/components/header.js'
import { renderHero } from './js/components/hero.js'
import { renderCatalog } from './js/components/catalog.js'

import { renderFooter } from './js/components/footer.js'
import { renderCartDrawer } from './js/components/cartDrawer.js'
import { renderCheckoutModal } from './js/components/checkoutModal.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <div id="header"></div>
  <main id="main">
    <div id="hero"></div>
    <div id="catalogo"></div>
  </main>
  <div id="footer"></div>
  <div id="cart"></div>
  <div id="checkout"></div>
  <div id="product-modal-container" class="hidden"></div>
`

renderHeader(document.getElementById('header'))
renderFooter(document.getElementById('footer'))
renderCartDrawer(document.getElementById('cart'))
renderCheckoutModal(document.getElementById('checkout'))

;(async () => {
  await renderHero(document.getElementById('hero'))
  await renderCatalog(document.getElementById('catalogo'))
})()