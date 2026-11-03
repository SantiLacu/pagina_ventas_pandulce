(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}})();const b={NOMBRE_NEGOCIO:"Tentaciones de Sabor",NRO_WHATSAPP:"5491151038957",URL_SHEETS:"https://script.google.com/macros/s/AKfycbzmB7g9Fs4-D7h0MbDlxOidVXLYOFsjvsnnVy8RtrfYMdzdIuWpjSYXNDI9G0atzMpykw/exec",HERO_INTERVAL_MS:5e3},M="pandul_cart",j=new Set;let h=O();function O(){try{const e=localStorage.getItem(M);return e?JSON.parse(e):[]}catch{return[]}}function E(){localStorage.setItem(M,JSON.stringify(h)),N()}function N(){j.forEach(e=>e(h))}function A(e){return j.add(e),e(h),()=>j.delete(e)}function y(){return h}function H(){return h.reduce((e,t)=>e+t.cantidad,0)}function $(){return h.reduce((e,t)=>e+t.precio*t.cantidad,0)}function I({slug:e,nombre:t,subtipoNombre:a,precio:u,imagen:o}){const s=a?`${e}::${a}`:e,c=h.find(d=>d.id===s);c?c.cantidad+=1:h.push({id:s,slug:e,nombre:t,subtipo:a||null,precio:u,imagen:o,cantidad:1}),E()}function B(e){h=h.filter(t=>t.id!==e),E()}function S(e,t){const a=h.find(u=>u.id===e);if(a){if(t<=0){B(e);return}a.cantidad=t,E()}}function R(){h=[],E()}const C=[{href:"#inicio",label:"Inicio"},{href:"#catalogo",label:"Catálogo"},{href:"#contacto",label:"Contacto"}];function P(e){e.innerHTML=`
    <header id="site-header" class="sticky top-0 z-50 bg-navidad-rojo text-white transition-shadow duration-300">
      <div class="container-page flex items-center justify-between h-16">
        <a href="#inicio" class="flex items-center gap-2 group" aria-label="${b.NOMBRE_NEGOCIO}">
          <span class="text-2xl">🎄</span>
          <span class="font-display text-xl font-bold tracking-wide group-hover:text-navidad-dorado transition-colors">
            ${b.NOMBRE_NEGOCIO}
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
  `,z()}function z(){const e=document.getElementById("menu-btn"),t=document.getElementById("mobile-menu"),a=document.getElementById("icon-menu"),u=document.getElementById("icon-close"),o=document.getElementById("cart-btn"),s=document.getElementById("cart-badge"),c=document.getElementById("site-header");e.addEventListener("click",()=>{!t.classList.contains("hidden")?(t.classList.add("hidden"),a.classList.remove("hidden"),u.classList.add("hidden"),e.setAttribute("aria-expanded","false")):(t.classList.remove("hidden"),a.classList.add("hidden"),u.classList.remove("hidden"),e.setAttribute("aria-expanded","true"))}),document.querySelectorAll(".mobile-nav-link").forEach(d=>{d.addEventListener("click",()=>{t.classList.add("hidden"),a.classList.remove("hidden"),u.classList.add("hidden"),e.setAttribute("aria-expanded","false")})}),o.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("cart:open"))}),A(d=>{const m=d.reduce((r,f)=>r+f.cantidad,0);m>0?(s.textContent=m,s.classList.remove("hidden")):s.classList.add("hidden")}),window.addEventListener("scroll",()=>{window.scrollY>10?c.classList.add("shadow-lg"):c.classList.remove("shadow-lg")},{passive:!0})}let k=null;async function q(){if(k)return k;try{const e=await fetch("/products/manifest.json",{cache:"no-cache"});if(!e.ok)throw new Error(`HTTP ${e.status}`);return k=await e.json(),k}catch(e){return console.error("Error al cargar productos:",e),[]}}function _(e){if(!e)return"";const{imagenes:t,nombre:a,descripcion:u,subtipos:o,precio:s}=e,c=o&&o.length>0,d=c?o[0].precio:s;return`
    <div id="product-modal" class="fixed inset-0 bg-navidad-oscuro/80 backdrop-blur z-50 hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col transform transition-transform duration-300" style="transform: scale(0.9);">
        <!-- Header del modal -->
        <div class="p-6 border-b border-navidad-crema relative">
          <h2 id="modal-title" class="font-display text-2xl font-bold text-navidad-rojo">${a}</h2>
          <button id="modal-close" class="absolute top-4 right-4 text-navidad-oscuro/60 hover:text-navidad-rojo" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Contenido scrollable: imagen + info -->
        <div class="flex-1 overflow-y-auto flex flex-col">
          <!-- Slider de imágenes - altura fija -->
          <div class="relative flex-shrink-0">
            <div class="relative w-full aspect-square max-h-[60vh]">
              <img id="modal-main-img"
                   src="${t[0]}"
                   alt="${a} - imagen 1"
                   class="w-full h-full object-cover rounded-t-2xl"
                   loading="lazy"
                   decoding="async" />

              <!-- Flechas laterales centradas en la imagen -->
              <div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                <button id="modal-prev"
                        class="bg-white/20 rounded-full p-2 hover:bg-white transition-colors z-10"
                        aria-label="Imagen anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button id="modal-next"
                        class="bg-white/20 rounded-full p-2 hover:bg-white transition-colors z-10"
                        aria-label="Imagen siguiente">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Miniaturas -->
            <div id="modal-thumbs"
                 class="mt-4 flex gap-2 overflow-x-auto justify-center px-6 pb-4">
              ${t.map((m,r)=>`
                <button data-img="${r}"
                        class="w-16 h-16 rounded overflow-hidden object-cover flex-shrink-0 ${r===0?"border-navidad-rojo border-2":"border-transparent"} hover:border-navidad-oscuro transition-all">
                  <img src="${m}" alt="${a} - miniatura ${r+1}" class="w-full h-full object-cover" loading="lazy" />
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Información del producto -->
          <div class="p-6 flex flex-col gap-4 flex-1 min-h-0">
            <p id="modal-desc" class="text-navidad-oscuro/70">${u}</p>

            ${c?`
              <div>
                <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide">Elegí una opción:</p>
                <div class="flex flex-wrap gap-2 mt-2">
                  ${o.map((m,r)=>`
                    <button data-subtipo="${m.nombre}" data-precio="${m.precio}"
                            class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${r===0?"border-navidad-rojo bg-navidad-rojo text-white":"border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50"}">
                      ${m.nombre}
                    </button>
                  `).join("")}
                </div>
              </div>
            `:""}
          </div>
        </div>

        <!-- Barra inferior fija con precio y botón -->
        <div class="bg-white border-t border-navidad-crema p-4 sticky bottom-0">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p id="modal-price" class="text-2xl font-bold text-navidad-verde">$ ${d.toLocaleString("es-AR")}</p>
            <button id="modal-add-cart"
                    class="btn-primary px-6 py-3 w-full sm:w-auto text-base">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function F(e){const t=document.getElementById("product-modal");if(!t)return;const a=document.getElementById("modal-close"),u=document.getElementById("modal-main-img"),o=document.getElementById("modal-prev"),s=document.getElementById("modal-next"),c=t.querySelectorAll("#modal-thumbs button"),d=document.getElementById("modal-price"),m=document.getElementById("modal-add-cart");let r=0,f=null,g=e.precio;a.addEventListener("click",i),t.addEventListener("click",l=>{l.target===t&&i()});function x(l){l.key==="Escape"&&(i(),document.removeEventListener("keydown",x))}document.addEventListener("keydown",x),o.addEventListener("click",()=>{r--,r<0&&(r=e.imagenes.length-1),n(r)}),s.addEventListener("click",()=>{r++,r>=e.imagenes.length&&(r=0),n(r)}),c.forEach(l=>{l.addEventListener("click",()=>{r=parseInt(l.dataset.img,10),n(r)})}),document.addEventListener("keydown",l=>{t.classList.contains("hidden")||(l.key==="ArrowLeft"?(r--,r<0&&(r=e.imagenes.length-1),n(r)):l.key==="ArrowRight"&&(r++,r>=e.imagenes.length&&(r=0),n(r)))});const v=t.querySelectorAll(".subtipo-btn");v.forEach(l=>{l.addEventListener("click",()=>{f=l.dataset.subtipo,g=parseInt(l.dataset.precio,10),d&&(d.textContent=`$ ${g.toLocaleString("es-AR")}`),v.forEach(p=>{p.classList.remove("border-navidad-rojo","bg-navidad-rojo","text-white"),p.classList.add("border-navidad-oscuro/20","text-navidad-oscuro/70")}),l.classList.add("border-navidad-rojo","bg-navidad-rojo","text-white"),l.classList.remove("border-navidad-oscuro/20","text-navidad-oscuro/70")})}),m.addEventListener("click",()=>{I({slug:e.slug,nombre:e.nombre,subtipoNombre:f,precio:g,imagen:e.imagenes[r]}),i()});function n(l){r=l,e.imagenes[r]&&(u.src=e.imagenes[r],u.alt=`${e.nombre} - imagen ${r+1}`),c.forEach(p=>{p.classList.remove("border-navidad-rojo","border-2"),p.classList.add("border-transparent")}),c[r]&&c[r].classList.add("border-navidad-rojo","border-2")}function i(){t.classList.add("hidden"),t.classList.remove("flex")}}function W(e){const t=document.createElement("article");t.className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col",t.dataset.product=JSON.stringify(e);const a=e.subtipos&&e.subtipos.length>0,u=a?e.subtipos[0].precio:e.precio,o=a?e.subtipos[0].nombre:null;t.innerHTML=`
    <div class="relative aspect-square bg-navidad-crema overflow-hidden group cursor-pointer">
      <img id="main-img-${e.slug}"
           src="${e.imagenes[0]}"
           alt="${e.nombre}"
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           loading="lazy"
           decoding="async"
           width="400"
           height="400" />
      ${e.imagenes.length>1?`
        <!-- Flechas laterales -->
        <div class="absolute top-1/2 -translate-y-1/2 w-full flex justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button id="card-prev-${e.slug}"
                  class="bg-white/20 rounded-full p-2 hover:bg-white transition-colors pointer-events-auto"
                  aria-label="Imagen anterior">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button id="card-next-${e.slug}"
                  class="bg-white/20 rounded-full p-2 hover:bg-white transition-colors pointer-events-auto"
                  aria-label="Imagen siguiente">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur px-2 py-1.5 rounded-full">
          ${e.imagenes.map((v,n)=>`
              <button data-img="${n}"
                      class="thumb w-2 h-2 rounded-full transition-all ${n===0?"bg-navidad-dorado scale-125":"bg-white/60 hover:bg-white"}"
                      aria-label="Ver imagen ${n+1}"></button>
            `).join("")}
        </div>
      `:""}
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h3 class="font-display text-xl font-bold text-navidad-rojo">${e.nombre}</h3>
      <p class="mt-2 text-sm text-navidad-oscuro/70 line-clamp-2 flex-grow">${e.descripcion}</p>

      ${a?`
        <div class="mt-4">
          <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide mb-2">Elegí una opción:</p>
          <div class="flex flex-wrap gap-2">
            ${e.subtipos.map((v,n)=>`
                <button data-subtipo="${v.nombre}" data-precio="${v.precio}"
                        class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${n===0?"border-navidad-rojo bg-navidad-rojo text-white":"border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50"}">
                  ${v.nombre}
                </button>
              `).join("")}
          </div>
        </div>
      `:""}

      <div class="mt-4 flex items-center justify-between">
        <p id="precio-${e.slug}" class="text-2xl font-bold text-navidad-verde">
          $ ${u.toLocaleString("es-AR")}
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
  `;let s=o,c=u,d=0;const m=t.querySelector(`#main-img-${e.slug}`),r=t.querySelector(`#precio-${e.slug}`),f=t.querySelector(`#add-${e.slug}`);t.addEventListener("click",v=>{v.target.closest(`#add-${e.slug}`)||v.target.closest(".subtipo-btn")||v.target.closest(".thumb")||T(e)});const g=t.querySelector(`#card-prev-${e.slug}`),x=t.querySelector(`#card-next-${e.slug}`);return g&&g.addEventListener("click",v=>{v.stopPropagation(),d--,d<0&&(d=e.imagenes.length-1),m.src=e.imagenes[d],m.style.display="none",m.offsetWidth,m.style.display="",t.querySelectorAll(".thumb").forEach((n,i)=>{n.classList.remove("bg-navidad-dorado","scale-125"),n.classList.add("bg-white/60"),i===d&&(n.classList.add("bg-navidad-dorado","scale-125"),n.classList.remove("bg-white/60"))})}),x&&x.addEventListener("click",v=>{v.stopPropagation(),d++,d>=e.imagenes.length&&(d=0),m.src=e.imagenes[d],m.style.display="none",m.offsetWidth,m.style.display="",t.querySelectorAll(".thumb").forEach((n,i)=>{n.classList.remove("bg-navidad-dorado","scale-125"),n.classList.add("bg-white/60"),i===d&&(n.classList.add("bg-navidad-dorado","scale-125"),n.classList.remove("bg-white/60"))})}),t.querySelectorAll(".thumb").forEach(v=>{v.addEventListener("click",()=>{const n=parseInt(v.dataset.img,10);d=n,m.src=e.imagenes[n],m.style.display="none",m.offsetWidth,m.style.display="",t.querySelectorAll(".thumb").forEach((i,l)=>{l===d?(i.classList.remove("bg-white/60"),i.classList.add("bg-navidad-dorado","scale-125")):(i.classList.remove("bg-navidad-dorado","scale-125"),i.classList.add("bg-white/60"))})})}),t.querySelectorAll(".subtipo-btn").forEach(v=>{v.addEventListener("click",()=>{s=v.dataset.subtipo,c=parseInt(v.dataset.precio,10),r.textContent=`$ ${c.toLocaleString("es-AR")}`,t.querySelectorAll(".subtipo-btn").forEach(n=>{n.classList.remove("border-navidad-rojo","bg-navidad-rojo","text-white"),n.classList.add("border-navidad-oscuro/20","text-navidad-oscuro/70")}),v.classList.add("border-navidad-rojo","bg-navidad-rojo","text-white"),v.classList.remove("border-navidad-oscuro/20","text-navidad-oscuro/70")})}),f.addEventListener("click",()=>{I({slug:e.slug,nombre:e.nombre,subtipoNombre:s,precio:c,imagen:e.imagenes[d]});const v=f.innerHTML;f.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      ¡Agregado!
    `,f.classList.remove("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),f.classList.add("bg-navidad-verde","hover:bg-navidad-verdeClaro"),setTimeout(()=>{f.innerHTML=v,f.classList.add("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),f.classList.remove("bg-navidad-verde","hover:bg-navidad-verdeClaro")},1500)}),t}function T(e){const t=document.getElementById("product-modal-container");if(!t)return;t.innerHTML=_(e),t.classList.remove("hidden"),t.classList.add("flex","items-center","justify-center");const a=document.getElementById("product-modal");a&&(a.classList.remove("hidden"),a.classList.add("flex"),F(e))}async function G(e){e.id="inicio",e.className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navidad-oscuro",e.innerHTML=`
    <div id="hero-slides" class="absolute inset-0"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-navidad-rojo/70 via-navidad-oscuro/60 to-navidad-verde/70 pointer-events-none"></div>
    <div class="absolute inset-0 bg-black/30 pointer-events-none"></div>

    <div class="relative z-10 container-page text-center text-white px-4 py-20">
      <span class="inline-block px-4 py-1 rounded-full bg-navidad-dorado/90 text-navidad-oscuro text-sm font-bold uppercase tracking-wider mb-6 animate-fade-in">
        🎄 Felices Fiestas
      </span>
      <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-slide-up">
        ${b.NOMBRE_NEGOCIO}
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
        <a href="https://wa.me/${b.NRO_WHATSAPP}"
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
  `,await V()}async function V(){const e=document.getElementById("hero-slides");if(!e)return;const a=(await q()).filter(s=>s.imagenes&&s.imagenes.length>0).map(s=>({product:s,image:s.imagenes[0]}));if(a.length===0){e.style.background="linear-gradient(135deg, #C1121F, #065F46)";return}e.innerHTML=a.map(({image:s},c)=>`
      <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${c===0?"opacity-100":"opacity-0"}" style="background-image: url('${s}'); background-size: cover; background-position: center; cursor: pointer;"></div>
    `).join("");let u=0;const o=a.length;e.querySelectorAll("div").forEach((s,c)=>{s.addEventListener("click",()=>{const{product:d}=a[c];d&&T(d)})}),o>1&&setInterval(()=>{const s=e.children;s[u].classList.replace("opacity-100","opacity-0"),u=(u+1)%o,s[u].classList.replace("opacity-0","opacity-100")},b.HERO_INTERVAL_MS)}async function D(e){e.className="container-page py-12",e.innerHTML=`
    <div class="flex items-center justify-between mb-6">
      <h2 id="catalog-title" class="font-display text-3xl font-bold text-navidad-rojo">
        🎄 Cargando productos...
      </h2>
    </div>
    <div id="catalogo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    <div id="catalog-empty" class="hidden text-center py-16 text-navidad-oscuro/60">
      <p class="text-lg">No hay productos disponibles en este momento.</p>
    </div>
  `;const t=await q(),a=e.querySelector("#catalogo"),u=e.querySelector("#catalog-title"),o=e.querySelector("#catalog-empty");if(t.length===0){u.textContent="Catálogo",a.classList.add("hidden"),o.classList.remove("hidden");return}u.textContent=`🎄 Catálogo (${t.length} productos)`;const s=document.createDocumentFragment();for(const c of t)s.appendChild(W(c));a.appendChild(s)}function K(e){const t=new Date().getFullYear();e.innerHTML=`
    <footer id="contacto" class="bg-navidad-verde text-white">
      <div class="container-page py-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎄</span>
              <span class="font-display text-xl font-bold">${b.NOMBRE_NEGOCIO}</span>
            </div>
            <p class="mt-3 text-sm text-white/80">
              Productos artesanales de calidad para estas fiestas. Pedí por WhatsApp y recibí en tu casa.
            </p>
          </div>

          <div>
            <h3 class="font-display text-lg font-bold text-navidad-dorado">Contacto</h3>
            <ul class="mt-3 space-y-2 text-sm text-white/80">
              <li>📱 WhatsApp: ${b.NRO_WHATSAPP}</li>
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
          © ${t} ${b.NOMBRE_NEGOCIO}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  `}function X(e){e.innerHTML=`
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
  `;const t=e.querySelector("#cart-overlay"),a=e.querySelector("#cart-drawer"),u=e.querySelector("#cart-close"),o=e.querySelector("#cart-items"),s=e.querySelector("#cart-count"),c=e.querySelector("#cart-total"),d=e.querySelector("#cart-checkout");function m(){t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),a.classList.remove("translate-x-full"),a.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function r(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),a.classList.add("translate-x-full"),a.setAttribute("aria-hidden","true"),document.body.style.overflow=""}function f(){const g=y(),x=$(),v=H();if(s.textContent=v,c.textContent=`$ ${x.toLocaleString("es-AR")}`,g.length===0){o.innerHTML=`
        <div class="flex flex-col items-center justify-center h-full text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-navidad-oscuro/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="mt-4 text-navidad-oscuro/60 font-medium">Tu carrito está vacío</p>
          <p class="mt-1 text-sm text-navidad-oscuro/40">Agregá productos desde el catálogo</p>
          <button id="cart-empty-close" class="mt-6 btn-gold">Ver catálogo</button>
        </div>
      `,o.querySelector("#cart-empty-close").addEventListener("click",()=>{var n;r(),(n=document.querySelector("#catalogo"))==null||n.scrollIntoView({behavior:"smooth"})}),d.classList.add("opacity-50","pointer-events-none");return}d.classList.remove("opacity-50","pointer-events-none"),o.innerHTML=g.map(n=>`
        <div class="flex gap-3 p-3 bg-white rounded-xl border border-navidad-oscuro/10">
          <img src="${n.imagen}" alt="${n.nombre}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div class="flex-grow min-w-0">
            <h4 class="font-semibold text-sm text-navidad-oscuro truncate">${n.nombre}</h4>
            ${n.subtipo?`<p class="text-xs text-navidad-oscuro/50">${n.subtipo}</p>`:""}
            <p class="text-sm font-bold text-navidad-verde mt-1">$ ${n.precio.toLocaleString("es-AR")}</p>
            <div class="flex items-center gap-2 mt-2">
              <button data-dec="${n.id}" class="w-7 h-7 rounded-full bg-navidad-oscuro/10 hover:bg-navidad-oscuro/20 flex items-center justify-center text-navidad-oscuro font-bold transition-colors" aria-label="Disminuir cantidad">−</button>
              <span class="text-sm font-medium w-6 text-center">${n.cantidad}</span>
              <button data-inc="${n.id}" class="w-7 h-7 rounded-full bg-navidad-rojo text-white hover:bg-navidad-rojoClaro flex items-center justify-center font-bold transition-colors" aria-label="Aumentar cantidad">+</button>
              <button data-del="${n.id}" class="ml-auto text-navidad-rojo/60 hover:text-navidad-rojo transition-colors" aria-label="Eliminar item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join(""),o.querySelectorAll("[data-inc]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.inc,l=y().find(p=>p.id===i);l&&S(i,l.cantidad+1)})}),o.querySelectorAll("[data-dec]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.dec,l=y().find(p=>p.id===i);l&&S(i,l.cantidad-1)})}),o.querySelectorAll("[data-del]").forEach(n=>{n.addEventListener("click",()=>{B(n.dataset.del)})})}A(f),u.addEventListener("click",r),t.addEventListener("click",r),d.addEventListener("click",()=>{r(),document.dispatchEvent(new CustomEvent("checkout:open"))}),document.addEventListener("cart:open",m),document.addEventListener("keydown",g=>{g.key==="Escape"&&!a.classList.contains("translate-x-full")&&r()}),f()}function Y(e){const t=y(),a=$();let o=` *Nuevo pedido - ${b.NOMBRE_NEGOCIO}*

`;return o+=` *Cliente:* ${e.nombre}
`,o+=` *Teléfono:* ${e.telefono}
`,e.direccion&&(o+=` *Dirección:* ${e.direccion}
`),e.comentarios&&(o+=`*Comentarios:* ${e.comentarios}
`),o+=`
 *Detalle del pedido:*
`,t.forEach((s,c)=>{o+=`${c+1}. ${s.nombre}`,s.subtipo&&(o+=` (${s.subtipo})`),o+=` — $ ${s.precio.toLocaleString("es-AR")} x ${s.cantidad} = $ ${(s.precio*s.cantidad).toLocaleString("es-AR")}
`}),o+=`
 *Total: $ ${a.toLocaleString("es-AR")}*`,o}function U(e){const t=Y(e),a=`https://wa.me/${b.NRO_WHATSAPP}?text=${encodeURIComponent(t)}`;R(),window.open(a,"_blank","noopener,noreferrer")}async function J(e){if(b.URL_SHEETS.includes("XXXX"))return console.warn("[Sheets] URL_SHEETS no configurada, saltando envío a Sheets"),{ok:!0,skipped:!0};const t=y(),a=$(),u={negocio:b.NOMBRE_NEGOCIO,timestamp:new Date().toISOString(),cliente:{nombre:e.nombre,telefono:e.telefono,direccion:e.direccion||"",comentarios:e.comentarios||""},items:t.map(o=>({nombre:o.nombre,subtipo:o.subtipo||"",precio:o.precio,cantidad:o.cantidad,subtotal:o.precio*o.cantidad})),total:a};try{const o=await fetch(b.URL_SHEETS,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(u),keepalive:!0});return o.ok?(console.log("[Sheets] Pedido enviado correctamente"),{ok:!0}):(console.warn("[Sheets] Respuesta no OK:",o.status),{ok:!1,error:`HTTP ${o.status}`})}catch(o){return console.warn("[Sheets] Error de red:",o.message),{ok:!1,error:o.message}}}function Q(e){e.innerHTML=`
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
  `;const t=e.querySelector("#checkout-overlay"),a=e.querySelector("#checkout-modal"),u=e.querySelector("#checkout-close"),o=e.querySelector("#checkout-form"),s=e.querySelector("#checkout-submit"),c=e.querySelector(".btn-text"),d=e.querySelector(".btn-loading");function m(){f(),t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),a.classList.remove("opacity-0","pointer-events-none"),a.querySelector("div").classList.remove("scale-95"),a.querySelector("div").classList.add("scale-100"),document.body.style.overflow="hidden",setTimeout(()=>{var i;return(i=a.querySelector("#nombre"))==null?void 0:i.focus()},100)}function r(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),a.classList.add("opacity-0","pointer-events-none"),a.querySelector("div").classList.add("scale-95"),a.querySelector("div").classList.remove("scale-100"),document.body.style.overflow="",o.reset(),x()}function f(){const i=y(),l=$(),p=e.querySelector("#order-summary"),L=e.querySelector("#checkout-total");if(i.length===0){p.innerHTML='<p class="text-navidad-oscuro/60 text-center">Carrito vacío</p>';return}p.innerHTML=i.map(w=>`
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2">
            <img src="${w.imagen}" alt="" class="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p class="font-medium text-navidad-oscuro truncate max-w-[160px]">${w.nombre}</p>
              ${w.subtipo?`<p class="text-xs text-navidad-oscuro/50">${w.subtipo}</p>`:""}
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-navidad-verde">$ ${(w.precio*w.cantidad).toLocaleString("es-AR")}</p>
            <p class="text-xs text-navidad-oscuro/50">x ${w.cantidad}</p>
          </div>
        </div>
      `).join(""),L.textContent=`$ ${l.toLocaleString("es-AR")}`}function g(i,l){const p=e.querySelector(`#${i}`),L=e.querySelector(`#error-${i}`);p.classList.add("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20"),L.textContent=l,L.classList.remove("hidden")}function x(){e.querySelectorAll(".error-message").forEach(i=>i.classList.add("hidden")),e.querySelectorAll("input, textarea").forEach(i=>{i.classList.remove("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20")})}function v(i){x();let l=!0;i.nombre.trim()||(g("nombre","El nombre es obligatorio"),l=!1);const p=/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;return(!i.telefono.trim()||!p.test(i.telefono.replace(/\s/g,"")))&&(g("telefono","Ingresá un teléfono válido (ej: +54 9 11 1234-5678)"),l=!1),l}async function n(i){i.preventDefault();const l=new FormData(o),p=Object.fromEntries(l);if(v(p)&&y().length!==0){s.disabled=!0,c.classList.add("hidden"),d.classList.remove("hidden");try{J(p).catch(()=>{}),U(p)}finally{s.disabled=!1,c.classList.remove("hidden"),d.classList.add("hidden"),r()}}}u.addEventListener("click",r),t.addEventListener("click",r),o.addEventListener("submit",n),document.addEventListener("keydown",i=>{i.key==="Escape"&&!a.classList.contains("opacity-0")&&r()}),document.addEventListener("checkout:open",m)}const Z=document.querySelector("#app");Z.innerHTML=`
  <div id="header"></div>
  <main id="main">
    <div id="hero"></div>
    <div id="catalogo"></div>
  </main>
  <div id="footer"></div>
  <div id="cart"></div>
  <div id="checkout"></div>
  <div id="product-modal-container" class="hidden"></div>
`;P(document.getElementById("header"));K(document.getElementById("footer"));X(document.getElementById("cart"));Q(document.getElementById("checkout"));(async()=>(await G(document.getElementById("hero")),await D(document.getElementById("catalogo"))))();
