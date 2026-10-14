(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const g={NOMBRE_NEGOCIO:"Ventas Pandul",NRO_WHATSAPP:"5491151038957",URL_SHEETS:"https://script.google.com/macros/s/AKfycbzmB7g9Fs4-D7h0MbDlxOidVXLYOFsjvsnnVy8RtrfYMdzdIuWpjSYXNDI9G0atzMpykw/exec",HERO_INTERVAL_MS:5e3},M="pandul_cart",$=new Set;let h=q();function q(){try{const e=localStorage.getItem(M);return e?JSON.parse(e):[]}catch{return[]}}function E(){localStorage.setItem(M,JSON.stringify(h)),I()}function I(){$.forEach(e=>e(h))}function A(e){return $.add(e),e(h),()=>$.delete(e)}function y(){return h}function B(){return h.reduce((e,t)=>e+t.cantidad,0)}function S(){return h.reduce((e,t)=>e+t.precio*t.cantidad,0)}function N({slug:e,nombre:t,subtipoNombre:s,precio:n,imagen:o}){const a=s?`${e}::${s}`:e,d=h.find(c=>c.id===a);d?d.cantidad+=1:h.push({id:a,slug:e,nombre:t,subtipo:s||null,precio:n,imagen:o,cantidad:1}),E()}function T(e){h=h.filter(t=>t.id!==e),E()}function j(e,t){const s=h.find(n=>n.id===e);if(s){if(t<=0){T(e);return}s.cantidad=t,E()}}function H(){h=[],E()}const C=[{href:"#inicio",label:"Inicio"},{href:"#catalogo",label:"Catálogo"},{href:"#contacto",label:"Contacto"}];function R(e){e.innerHTML=`
    <header id="site-header" class="sticky top-0 z-50 bg-navidad-rojo text-white transition-shadow duration-300">
      <div class="container-page flex items-center justify-between h-16">
        <a href="#inicio" class="flex items-center gap-2 group" aria-label="${g.NOMBRE_NEGOCIO}">
          <span class="text-2xl">🎄</span>
          <span class="font-display text-xl font-bold tracking-wide group-hover:text-navidad-dorado transition-colors">
            ${g.NOMBRE_NEGOCIO}
          </span>
        </a>

        <nav class="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          ${C.map(t=>`
            <a href="${t.href}"
               class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-navidad-dorado transition-colors">
              ${t.label}
            </a>
          `).join("")}
        </nav>

        <div class="flex items-center gap-2">
          <button id="cart-btn"
                  class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Abrir carrito">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span id="cart-badge"
                  class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-navidad-dorado text-navidad-oscuro text-xs font-bold hidden">
              0
            </span>
          </button>

          <button id="menu-btn"
                  class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Abrir menú"
                  aria-expanded="false">
            <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="md:hidden hidden border-t border-white/10 bg-navidad-rojo">
        <nav class="container-page py-3 flex flex-col gap-1" aria-label="Navegación móvil">
          ${C.map(t=>`
            <a href="${t.href}"
               class="mobile-nav-link px-3 py-3 rounded-lg text-base font-medium hover:bg-white/10 hover:text-navidad-dorado transition-colors">
              ${t.label}
            </a>
          `).join("")}
        </nav>
      </div>
    </header>
  `,P()}function P(){const e=document.getElementById("menu-btn"),t=document.getElementById("mobile-menu"),s=document.getElementById("icon-menu"),n=document.getElementById("icon-close"),o=document.getElementById("cart-btn"),a=document.getElementById("cart-badge"),d=document.getElementById("site-header");e.addEventListener("click",()=>{!t.classList.contains("hidden")?(t.classList.add("hidden"),s.classList.remove("hidden"),n.classList.add("hidden"),e.setAttribute("aria-expanded","false")):(t.classList.remove("hidden"),s.classList.add("hidden"),n.classList.remove("hidden"),e.setAttribute("aria-expanded","true"))}),document.querySelectorAll(".mobile-nav-link").forEach(c=>{c.addEventListener("click",()=>{t.classList.add("hidden"),s.classList.remove("hidden"),n.classList.add("hidden"),e.setAttribute("aria-expanded","false")})}),o.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("cart:open"))}),A(c=>{const b=c.reduce((m,v)=>m+v.cantidad,0);b>0?(a.textContent=b,a.classList.remove("hidden")):a.classList.add("hidden")}),window.addEventListener("scroll",()=>{window.scrollY>10?d.classList.add("shadow-lg"):d.classList.remove("shadow-lg")},{passive:!0})}let k=null;async function O(){if(k)return k;try{const e=await fetch("/products/manifest.json",{cache:"no-cache"});if(!e.ok)throw new Error(`HTTP ${e.status}`);return k=await e.json(),k}catch(e){return console.error("Error al cargar productos:",e),[]}}async function _(e){e.id="inicio",e.className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navidad-oscuro",e.innerHTML=`
    <div id="hero-slides" class="absolute inset-0"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-navidad-rojo/70 via-navidad-oscuro/60 to-navidad-verde/70"></div>
    <div class="absolute inset-0 bg-black/30"></div>

    <div class="relative z-10 container-page text-center text-white px-4 py-20">
      <span class="inline-block px-4 py-1 rounded-full bg-navidad-dorado/90 text-navidad-oscuro text-sm font-bold uppercase tracking-wider mb-6 animate-fade-in">
        🎄 Felices Fiestas
      </span>
      <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-slide-up">
        ${g.NOMBRE_NEGOCIO}
      </h1>
      <p class="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white/90 animate-slide-up" style="animation-delay: 0.1s">
        Productos artesanales hechos con amor para estas fiestas.
        Pedí por WhatsApp y recibí en tu casa.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 0.2s">
        <a href="#catalogo" class="btn-gold w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Ver Catálogo
        </a>
        <a href="https://wa.me/${g.NRO_WHATSAPP}"
           target="_blank"
           rel="noopener noreferrer"
           class="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/25 w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  `,await z()}async function z(){const e=document.getElementById("hero-slides");if(!e)return;const s=(await O()).filter(a=>a.imagenes&&a.imagenes.length>0).map(a=>a.imagenes[0]);if(s.length===0){e.style.background="linear-gradient(135deg, #C1121F, #065F46)";return}e.innerHTML=s.map((a,d)=>`
      <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${d===0?"opacity-100":"opacity-0"}" style="background-image: url('${a}'); background-size: cover; background-position: center;"></div>
    `).join("");let n=0;const o=s.length;o>1&&setInterval(()=>{const a=e.children;a[n].classList.replace("opacity-100","opacity-0"),n=(n+1)%o,a[n].classList.replace("opacity-0","opacity-100")},g.HERO_INTERVAL_MS)}function F(e){const t=document.createElement("article");t.className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col";const s=e.subtipos&&e.subtipos.length>0,n=s?e.subtipos[0].precio:e.precio,o=s?e.subtipos[0].nombre:null;t.innerHTML=`
    <div class="relative aspect-square bg-navidad-crema overflow-hidden group">
      <img id="main-img-${e.slug}"
           src="${e.imagenes[0]}"
           alt="${e.nombre}"
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           loading="lazy"
           decoding="async"
           width="400"
           height="400" />
      ${e.imagenes.length>1?`
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur px-2 py-1.5 rounded-full">
          ${e.imagenes.map((i,u)=>`
              <button data-img="${u}"
                      class="thumb w-2 h-2 rounded-full transition-all ${u===0?"bg-navidad-dorado scale-125":"bg-white/60 hover:bg-white"}"
                      aria-label="Ver imagen ${u+1}"></button>
            `).join("")}
        </div>
      `:""}
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h3 class="font-display text-xl font-bold text-navidad-rojo">${e.nombre}</h3>
      <p class="mt-2 text-sm text-navidad-oscuro/70 line-clamp-2 flex-grow">${e.descripcion}</p>

      ${s?`
        <div class="mt-4">
          <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide mb-2">Elegí una opción:</p>
          <div class="flex flex-wrap gap-2">
            ${e.subtipos.map((i,u)=>`
                <button data-subtipo="${i.nombre}" data-precio="${i.precio}"
                        class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${u===0?"border-navidad-rojo bg-navidad-rojo text-white":"border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50"}">
                  ${i.nombre}
                </button>
              `).join("")}
          </div>
        </div>
      `:""}

      <div class="mt-4 flex items-center justify-between">
        <p id="precio-${e.slug}" class="text-2xl font-bold text-navidad-verde">
          $ ${n.toLocaleString("es-AR")}
        </p>
      </div>

      <button id="add-${e.slug}"
              class="mt-4 btn-primary w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Agregar al carrito
      </button>
    </div>
  `;let a=o,d=n,c=0;const b=t.querySelector(`#main-img-${e.slug}`),m=t.querySelector(`#precio-${e.slug}`),v=t.querySelector(`#add-${e.slug}`);return t.querySelectorAll(".thumb").forEach(i=>{i.addEventListener("click",()=>{const u=parseInt(i.dataset.img,10);c=u,b.src=e.imagenes[u],t.querySelectorAll(".thumb").forEach(w=>{w.classList.remove("bg-navidad-dorado","scale-125"),w.classList.add("bg-white/60")}),i.classList.add("bg-navidad-dorado","scale-125"),i.classList.remove("bg-white/60")})}),t.querySelectorAll(".subtipo-btn").forEach(i=>{i.addEventListener("click",()=>{a=i.dataset.subtipo,d=parseInt(i.dataset.precio,10),m.textContent=`$ ${d.toLocaleString("es-AR")}`,t.querySelectorAll(".subtipo-btn").forEach(u=>{u.classList.remove("border-navidad-rojo","bg-navidad-rojo","text-white"),u.classList.add("border-navidad-oscuro/20","text-navidad-oscuro/70")}),i.classList.add("border-navidad-rojo","bg-navidad-rojo","text-white"),i.classList.remove("border-navidad-oscuro/20","text-navidad-oscuro/70")})}),v.addEventListener("click",()=>{N({slug:e.slug,nombre:e.nombre,subtipoNombre:a,precio:d,imagen:e.imagenes[c]});const i=v.innerHTML;v.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      ¡Agregado!
    `,v.classList.remove("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),v.classList.add("bg-navidad-verde","hover:bg-navidad-verdeClaro"),setTimeout(()=>{v.innerHTML=i,v.classList.add("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),v.classList.remove("bg-navidad-verde","hover:bg-navidad-verdeClaro")},1500)}),t}async function W(e){e.className="container-page py-12",e.innerHTML=`
    <div class="flex items-center justify-between mb-6">
      <h2 id="catalog-title" class="font-display text-3xl font-bold text-navidad-rojo">
        🎄 Cargando productos...
      </h2>
    </div>
    <div id="catalogo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    <div id="catalog-empty" class="hidden text-center py-16 text-navidad-oscuro/60">
      <p class="text-lg">No hay productos disponibles en este momento.</p>
    </div>
  `;const t=await O(),s=e.querySelector("#catalogo"),n=e.querySelector("#catalog-title"),o=e.querySelector("#catalog-empty");if(t.length===0){n.textContent="Catálogo",s.classList.add("hidden"),o.classList.remove("hidden");return}n.textContent=`🎄 Catálogo (${t.length} productos)`;const a=document.createDocumentFragment();for(const d of t)a.appendChild(F(d));s.appendChild(a)}function V(e){const t=new Date().getFullYear();e.innerHTML=`
    <footer id="contacto" class="bg-navidad-verde text-white">
      <div class="container-page py-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎄</span>
              <span class="font-display text-xl font-bold">${g.NOMBRE_NEGOCIO}</span>
            </div>
            <p class="mt-3 text-sm text-white/80">
              Productos artesanales de calidad para estas fiestas. Pedí por WhatsApp y recibí en tu casa.
            </p>
          </div>

          <div>
            <h3 class="font-display text-lg font-bold text-navidad-dorado">Contacto</h3>
            <ul class="mt-3 space-y-2 text-sm text-white/80">
              <li>📱 WhatsApp: ${g.NRO_WHATSAPP}</li>
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
          © ${t} ${g.NOMBRE_NEGOCIO}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  `}function G(e){e.innerHTML=`
    <div id="cart-overlay" class="fixed inset-0 z-[60] bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <aside id="cart-drawer"
           class="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col"
           role="dialog"
           aria-label="Carrito de compras"
           aria-hidden="true">
      <div class="flex items-center justify-between p-4 border-b border-navidad-oscuro/10 bg-navidad-rojo text-white">
        <h2 class="font-display text-xl font-bold flex items-center gap-2">
          🛒 Tu Carrito
          <span id="cart-count" class="text-sm bg-navidad-dorado text-navidad-oscuro rounded-full px-2 py-0.5 font-bold">0</span>
        </h2>
        <button id="cart-close" class="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Cerrar carrito">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div id="cart-items" class="flex-grow overflow-y-auto p-4 space-y-3"></div>

      <div id="cart-footer" class="border-t border-navidad-oscuro/10 p-4 bg-navidad-crema">
        <div class="flex items-center justify-between mb-4">
          <span class="font-display text-lg font-bold text-navidad-oscuro">Total:</span>
          <span id="cart-total" class="font-display text-2xl font-bold text-navidad-verde">$ 0</span>
        </div>
        <button id="cart-checkout" class="btn-primary w-full">
          Finalizar compra
        </button>
      </div>
    </aside>
  `;const t=e.querySelector("#cart-overlay"),s=e.querySelector("#cart-drawer"),n=e.querySelector("#cart-close"),o=e.querySelector("#cart-items"),a=e.querySelector("#cart-count"),d=e.querySelector("#cart-total"),c=e.querySelector("#cart-checkout");function b(){t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),s.classList.remove("translate-x-full"),s.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function m(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),s.classList.add("translate-x-full"),s.setAttribute("aria-hidden","true"),document.body.style.overflow=""}function v(){const i=y(),u=S(),w=B();if(a.textContent=w,d.textContent=`$ ${u.toLocaleString("es-AR")}`,i.length===0){o.innerHTML=`
        <div class="flex flex-col items-center justify-center h-full text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-navidad-oscuro/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="mt-4 text-navidad-oscuro/60 font-medium">Tu carrito está vacío</p>
          <p class="mt-1 text-sm text-navidad-oscuro/40">Agregá productos desde el catálogo</p>
          <button id="cart-empty-close" class="mt-6 btn-gold">Ver catálogo</button>
        </div>
      `,o.querySelector("#cart-empty-close").addEventListener("click",()=>{var l;m(),(l=document.querySelector("#catalogo"))==null||l.scrollIntoView({behavior:"smooth"})}),c.classList.add("opacity-50","pointer-events-none");return}c.classList.remove("opacity-50","pointer-events-none"),o.innerHTML=i.map(l=>`
        <div class="flex gap-3 p-3 bg-white rounded-xl border border-navidad-oscuro/10">
          <img src="${l.imagen}" alt="${l.nombre}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div class="flex-grow min-w-0">
            <h4 class="font-semibold text-sm text-navidad-oscuro truncate">${l.nombre}</h4>
            ${l.subtipo?`<p class="text-xs text-navidad-oscuro/50">${l.subtipo}</p>`:""}
            <p class="text-sm font-bold text-navidad-verde mt-1">$ ${l.precio.toLocaleString("es-AR")}</p>
            <div class="flex items-center gap-2 mt-2">
              <button data-dec="${l.id}" class="w-7 h-7 rounded-full bg-navidad-oscuro/10 hover:bg-navidad-oscuro/20 flex items-center justify-center text-navidad-oscuro font-bold transition-colors" aria-label="Disminuir cantidad">−</button>
              <span class="text-sm font-medium w-6 text-center">${l.cantidad}</span>
              <button data-inc="${l.id}" class="w-7 h-7 rounded-full bg-navidad-rojo text-white hover:bg-navidad-rojoClaro flex items-center justify-center font-bold transition-colors" aria-label="Aumentar cantidad">+</button>
              <button data-del="${l.id}" class="ml-auto text-navidad-rojo/60 hover:text-navidad-rojo transition-colors" aria-label="Eliminar item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join(""),o.querySelectorAll("[data-inc]").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.inc,p=y().find(f=>f.id===r);p&&j(r,p.cantidad+1)})}),o.querySelectorAll("[data-dec]").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.dec,p=y().find(f=>f.id===r);p&&j(r,p.cantidad-1)})}),o.querySelectorAll("[data-del]").forEach(l=>{l.addEventListener("click",()=>{T(l.dataset.del)})})}A(v),n.addEventListener("click",m),t.addEventListener("click",m),c.addEventListener("click",()=>{m(),document.dispatchEvent(new CustomEvent("checkout:open"))}),document.addEventListener("cart:open",b),document.addEventListener("keydown",i=>{i.key==="Escape"&&!s.classList.contains("translate-x-full")&&m()}),v()}function D(e){const t=y(),s=S();let o=` *Nuevo pedido - ${g.NOMBRE_NEGOCIO}*

`;return o+=` *Cliente:* ${e.nombre}
`,o+=` *Teléfono:* ${e.telefono}
`,e.direccion&&(o+=` *Dirección:* ${e.direccion}
`),e.comentarios&&(o+=`*Comentarios:* ${e.comentarios}
`),o+=`
 *Detalle del pedido:*
`,t.forEach((a,d)=>{o+=`${d+1}. ${a.nombre}`,a.subtipo&&(o+=` (${a.subtipo})`),o+=` — $ ${a.precio.toLocaleString("es-AR")} x ${a.cantidad} = $ ${(a.precio*a.cantidad).toLocaleString("es-AR")}
`}),o+=`
 *Total: $ ${s.toLocaleString("es-AR")}*`,o}function X(e){const t=D(e),s=`https://wa.me/${g.NRO_WHATSAPP}?text=${encodeURIComponent(t)}`;H(),window.open(s,"_blank","noopener,noreferrer")}async function Y(e){if(g.URL_SHEETS.includes("XXXX"))return console.warn("[Sheets] URL_SHEETS no configurada, saltando envío a Sheets"),{ok:!0,skipped:!0};const t=y(),s=S(),n={negocio:g.NOMBRE_NEGOCIO,timestamp:new Date().toISOString(),cliente:{nombre:e.nombre,telefono:e.telefono,direccion:e.direccion||"",comentarios:e.comentarios||""},items:t.map(o=>({nombre:o.nombre,subtipo:o.subtipo||"",precio:o.precio,cantidad:o.cantidad,subtotal:o.precio*o.cantidad})),total:s};try{const o=await fetch(g.URL_SHEETS,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(n),keepalive:!0});return o.ok?(console.log("[Sheets] Pedido enviado correctamente"),{ok:!0}):(console.warn("[Sheets] Respuesta no OK:",o.status),{ok:!1,error:`HTTP ${o.status}`})}catch(o){return console.warn("[Sheets] Error de red:",o.message),{ok:!1,error:o.message}}}function K(e){e.innerHTML=`
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
  `;const t=e.querySelector("#checkout-overlay"),s=e.querySelector("#checkout-modal"),n=e.querySelector("#checkout-close"),o=e.querySelector("#checkout-form"),a=e.querySelector("#checkout-submit"),d=e.querySelector(".btn-text"),c=e.querySelector(".btn-loading");function b(){v(),t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),s.classList.remove("opacity-0","pointer-events-none"),s.querySelector("div").classList.remove("scale-95"),s.querySelector("div").classList.add("scale-100"),document.body.style.overflow="hidden",setTimeout(()=>{var r;return(r=s.querySelector("#nombre"))==null?void 0:r.focus()},100)}function m(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none"),s.querySelector("div").classList.add("scale-95"),s.querySelector("div").classList.remove("scale-100"),document.body.style.overflow="",o.reset(),u()}function v(){const r=y(),p=S(),f=e.querySelector("#order-summary"),L=e.querySelector("#checkout-total");if(r.length===0){f.innerHTML='<p class="text-navidad-oscuro/60 text-center">Carrito vacío</p>';return}f.innerHTML=r.map(x=>`
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2">
            <img src="${x.imagen}" alt="" class="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p class="font-medium text-navidad-oscuro truncate max-w-[160px]">${x.nombre}</p>
              ${x.subtipo?`<p class="text-xs text-navidad-oscuro/50">${x.subtipo}</p>`:""}
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-navidad-verde">$ ${(x.precio*x.cantidad).toLocaleString("es-AR")}</p>
            <p class="text-xs text-navidad-oscuro/50">x ${x.cantidad}</p>
          </div>
        </div>
      `).join(""),L.textContent=`$ ${p.toLocaleString("es-AR")}`}function i(r,p){const f=e.querySelector(`#${r}`),L=e.querySelector(`#error-${r}`);f.classList.add("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20"),L.textContent=p,L.classList.remove("hidden")}function u(){e.querySelectorAll(".error-message").forEach(r=>r.classList.add("hidden")),e.querySelectorAll("input, textarea").forEach(r=>{r.classList.remove("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20")})}function w(r){u();let p=!0;r.nombre.trim()||(i("nombre","El nombre es obligatorio"),p=!1);const f=/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;return(!r.telefono.trim()||!f.test(r.telefono.replace(/\s/g,"")))&&(i("telefono","Ingresá un teléfono válido (ej: +54 9 11 1234-5678)"),p=!1),p}async function l(r){r.preventDefault();const p=new FormData(o),f=Object.fromEntries(p);if(w(f)&&y().length!==0){a.disabled=!0,d.classList.add("hidden"),c.classList.remove("hidden");try{Y(f).catch(()=>{}),X(f)}finally{a.disabled=!1,d.classList.remove("hidden"),c.classList.add("hidden"),m()}}}n.addEventListener("click",m),t.addEventListener("click",m),o.addEventListener("submit",l),document.addEventListener("keydown",r=>{r.key==="Escape"&&!s.classList.contains("opacity-0")&&m()}),document.addEventListener("checkout:open",b)}const U=document.querySelector("#app");U.innerHTML=`
  <div id="header"></div>
  <main id="main">
    <div id="hero"></div>
    <div id="catalogo"></div>
  </main>
  <div id="footer"></div>
  <div id="cart"></div>
  <div id="checkout"></div>
`;R(document.getElementById("header"));V(document.getElementById("footer"));G(document.getElementById("cart"));K(document.getElementById("checkout"));(async()=>(await _(document.getElementById("hero")),await W(document.getElementById("catalogo"))))();
