(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const b={NOMBRE_NEGOCIO:"Tentaciones de Sabor",NRO_WHATSAPP:"5491151038957",URL_SHEETS:"https://script.google.com/macros/s/AKfycbzmB7g9Fs4-D7h0MbDlxOidVXLYOFsjvsnnVy8RtrfYMdzdIuWpjSYXNDI9G0atzMpykw/exec",HERO_INTERVAL_MS:5e3},M="pandul_cart",j=new Set;let h=T();function T(){try{const e=localStorage.getItem(M);return e?JSON.parse(e):[]}catch{return[]}}function E(){localStorage.setItem(M,JSON.stringify(h)),O()}function O(){j.forEach(e=>e(h))}function A(e){return j.add(e),e(h),()=>j.delete(e)}function y(){return h}function N(){return h.reduce((e,t)=>e+t.cantidad,0)}function $(){return h.reduce((e,t)=>e+t.precio*t.cantidad,0)}function H({slug:e,nombre:t,subtipoNombre:n,precio:l,imagen:o}){const s=n?`${e}::${n}`:e,d=h.find(a=>a.id===s);d?d.cantidad+=1:h.push({id:s,slug:e,nombre:t,subtipo:n||null,precio:l,imagen:o,cantidad:1}),E()}function I(e){h=h.filter(t=>t.id!==e),E()}function S(e,t){const n=h.find(l=>l.id===e);if(n){if(t<=0){I(e);return}n.cantidad=t,E()}}function R(){h=[],E()}const C=[{href:"#inicio",label:"Inicio"},{href:"#catalogo",label:"Catálogo"},{href:"#contacto",label:"Contacto"}];function P(e){e.innerHTML=`
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
  `,z()}function z(){const e=document.getElementById("menu-btn"),t=document.getElementById("mobile-menu"),n=document.getElementById("icon-menu"),l=document.getElementById("icon-close"),o=document.getElementById("cart-btn"),s=document.getElementById("cart-badge"),d=document.getElementById("site-header");e.addEventListener("click",()=>{!t.classList.contains("hidden")?(t.classList.add("hidden"),n.classList.remove("hidden"),l.classList.add("hidden"),e.setAttribute("aria-expanded","false")):(t.classList.remove("hidden"),n.classList.add("hidden"),l.classList.remove("hidden"),e.setAttribute("aria-expanded","true"))}),document.querySelectorAll(".mobile-nav-link").forEach(a=>{a.addEventListener("click",()=>{t.classList.add("hidden"),n.classList.remove("hidden"),l.classList.add("hidden"),e.setAttribute("aria-expanded","false")})}),o.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("cart:open"))}),A(a=>{const c=a.reduce((v,p)=>v+p.cantidad,0);c>0?(s.textContent=c,s.classList.remove("hidden")):s.classList.add("hidden")}),window.addEventListener("scroll",()=>{window.scrollY>10?d.classList.add("shadow-lg"):d.classList.remove("shadow-lg")},{passive:!0})}let k=null;async function B(){if(k)return k;try{const e=await fetch("/products/manifest.json",{cache:"no-cache"});if(!e.ok)throw new Error(`HTTP ${e.status}`);return k=await e.json(),k}catch(e){return console.error("Error al cargar productos:",e),[]}}function _(e){if(!e)return"";const{imagenes:t,nombre:n,descripcion:l,subtipos:o,precio:s}=e,d=o&&o.length>0,a=d?o[0].precio:s;return`
    <div id="product-modal" class="fixed inset-0 bg-navidad-oscuro/80 backdrop-blur z-50 hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-transform duration-300" style="transform: scale(0.9);">
        <!-- Header del modal -->
        <div class="p-6 border-b border-navidad-crema">
          <h2 id="modal-title" class="font-display text-2xl font-bold text-navidad-rojo">${n}</h2>
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
                 src="${t[0]}"
                 alt="${n} - imagen 1"
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
              ${t.map((c,v)=>`
                <button data-img="${v}"
                        class="w-16 h-16 rounded overflow-hidden object-cover ${v===0?"border-navidad-rojo border-2":"border-transparent"} hover:border-navidad-oscuro transition-all">
                  <img src="${c}" alt="${n} - miniatura ${v+1}" class="w-full h-full object-cover" loading="lazy" />
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Información del producto -->
        <div class="p-6 flex flex-col gap-4">
          <p id="modal-desc" class="text-navidad-oscuro/70 line-clamp-3">${l}</p>
          
          ${d?`
            <div>
              <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide">Elegí una opción:</p>
              <div class="flex flex-wrap gap-2">
                ${o.map((c,v)=>`
                  <button data-subtipo="${c.nombre}" data-precio="${c.precio}"
                          class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${v===0?"border-navidad-rojo bg-navidad-rojo text-white":"border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50"}">
                    ${c.nombre}
                  </button>
                `).join("")}
              </div>
            </div>
          `:""}
          
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-navidad-verde">$ ${a.toLocaleString("es-AR")}</p>
            <button id="modal-add-cart"
                    class="btn-primary px-6 py-2">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function F(e){const t=document.getElementById("product-modal");if(!t)return;const n=document.getElementById("modal-close"),l=document.getElementById("modal-main-img"),o=document.getElementById("modal-prev"),s=document.getElementById("modal-next"),d=t.querySelectorAll("#modal-thumbs button");let a=0;n.addEventListener("click",p),t.addEventListener("click",m=>{m.target===t&&p()});function c(m){m.key==="Escape"&&(p(),document.removeEventListener("keydown",c))}document.addEventListener("keydown",c),o.addEventListener("click",()=>{a--,a<0&&(a=e.imagenes.length-1),v(a)}),s.addEventListener("click",()=>{a++,a>=e.imagenes.length&&(a=0),v(a)}),d.forEach(m=>{m.addEventListener("click",()=>{a=parseInt(m.dataset.img,10),v(a)})}),document.addEventListener("keydown",m=>{t.classList.contains("hidden")||(m.key==="ArrowLeft"?(a--,a<0&&(a=e.imagenes.length-1),v(a)):m.key==="ArrowRight"&&(a++,a>=e.imagenes.length&&(a=0),v(a)))});function v(m){a=m,e.imagenes[a]&&(l.src=e.imagenes[a],l.alt=`${e.nombre} - imagen ${a+1}`),d.forEach(x=>{x.classList.remove("border-navidad-rojo","border-2"),x.classList.add("border-transparent")}),d[a]&&d[a].classList.add("border-navidad-rojo","border-2")}function p(){t.classList.add("hidden"),t.classList.remove("flex")}}function W(e){const t=document.createElement("article");t.className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col",t.dataset.product=JSON.stringify(e);const n=e.subtipos&&e.subtipos.length>0,l=n?e.subtipos[0].precio:e.precio,o=n?e.subtipos[0].nombre:null;t.innerHTML=`
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
          ${e.imagenes.map((u,r)=>`
              <button data-img="${r}"
                      class="thumb w-2 h-2 rounded-full transition-all ${r===0?"bg-navidad-dorado scale-125":"bg-white/60 hover:bg-white"}"
                      aria-label="Ver imagen ${r+1}"></button>
            `).join("")}
        </div>
      `:""}
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h3 class="font-display text-xl font-bold text-navidad-rojo">${e.nombre}</h3>
      <p class="mt-2 text-sm text-navidad-oscuro/70 line-clamp-2 flex-grow">${e.descripcion}</p>

      ${n?`
        <div class="mt-4">
          <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide mb-2">Elegí una opción:</p>
          <div class="flex flex-wrap gap-2">
            ${e.subtipos.map((u,r)=>`
                <button data-subtipo="${u.nombre}" data-precio="${u.precio}"
                        class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${r===0?"border-navidad-rojo bg-navidad-rojo text-white":"border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50"}">
                  ${u.nombre}
                </button>
              `).join("")}
          </div>
        </div>
      `:""}

      <div class="mt-4 flex items-center justify-between">
        <p id="precio-${e.slug}" class="text-2xl font-bold text-navidad-verde">
          $ ${l.toLocaleString("es-AR")}
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
  `;let s=o,d=l,a=0;const c=t.querySelector(`#main-img-${e.slug}`),v=t.querySelector(`#precio-${e.slug}`),p=t.querySelector(`#add-${e.slug}`);t.addEventListener("click",u=>{u.target.closest(`#add-${e.slug}`)||u.target.closest(".subtipo-btn")||u.target.closest(".thumb")||q(e)});const m=t.querySelector(`#card-prev-${e.slug}`),x=t.querySelector(`#card-next-${e.slug}`);return m&&m.addEventListener("click",u=>{u.stopPropagation(),a--,a<0&&(a=e.imagenes.length-1),c.src=e.imagenes[a],c.style.display="none",c.offsetWidth,c.style.display="",t.querySelectorAll(".thumb").forEach((r,i)=>{r.classList.remove("bg-navidad-dorado","scale-125"),r.classList.add("bg-white/60"),i===a&&(r.classList.add("bg-navidad-dorado","scale-125"),r.classList.remove("bg-white/60"))})}),x&&x.addEventListener("click",u=>{u.stopPropagation(),a++,a>=e.imagenes.length&&(a=0),c.src=e.imagenes[a],c.style.display="none",c.offsetWidth,c.style.display="",t.querySelectorAll(".thumb").forEach((r,i)=>{r.classList.remove("bg-navidad-dorado","scale-125"),r.classList.add("bg-white/60"),i===a&&(r.classList.add("bg-navidad-dorado","scale-125"),r.classList.remove("bg-white/60"))})}),t.querySelectorAll(".thumb").forEach(u=>{u.addEventListener("click",()=>{const r=parseInt(u.dataset.img,10);a=r,c.src=e.imagenes[r],c.style.display="none",c.offsetWidth,c.style.display="",t.querySelectorAll(".thumb").forEach((i,f)=>{f===a?(i.classList.remove("bg-white/60"),i.classList.add("bg-navidad-dorado","scale-125")):(i.classList.remove("bg-navidad-dorado","scale-125"),i.classList.add("bg-white/60"))})})}),t.querySelectorAll(".subtipo-btn").forEach(u=>{u.addEventListener("click",()=>{s=u.dataset.subtipo,d=parseInt(u.dataset.precio,10),v.textContent=`$ ${d.toLocaleString("es-AR")}`,t.querySelectorAll(".subtipo-btn").forEach(r=>{r.classList.remove("border-navidad-rojo","bg-navidad-rojo","text-white"),r.classList.add("border-navidad-oscuro/20","text-navidad-oscuro/70")}),u.classList.add("border-navidad-rojo","bg-navidad-rojo","text-white"),u.classList.remove("border-navidad-oscuro/20","text-navidad-oscuro/70")})}),p.addEventListener("click",()=>{H({slug:e.slug,nombre:e.nombre,subtipoNombre:s,precio:d,imagen:e.imagenes[a]});const u=p.innerHTML;p.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      ¡Agregado!
    `,p.classList.remove("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),p.classList.add("bg-navidad-verde","hover:bg-navidad-verdeClaro"),setTimeout(()=>{p.innerHTML=u,p.classList.add("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),p.classList.remove("bg-navidad-verde","hover:bg-navidad-verdeClaro")},1500)}),t}function q(e){const t=document.getElementById("product-modal-container");if(!t)return;t.innerHTML=_(e),t.classList.remove("hidden"),t.classList.add("flex","items-center","justify-center");const n=document.getElementById("product-modal");n&&(n.classList.remove("hidden"),n.classList.add("flex"),F(e))}async function G(e){e.id="inicio",e.className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navidad-oscuro",e.innerHTML=`
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
  `,await V()}async function V(){const e=document.getElementById("hero-slides");if(!e)return;const n=(await B()).filter(s=>s.imagenes&&s.imagenes.length>0).map(s=>({product:s,image:s.imagenes[0]}));if(n.length===0){e.style.background="linear-gradient(135deg, #C1121F, #065F46)";return}e.innerHTML=n.map(({image:s},d)=>`
      <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${d===0?"opacity-100":"opacity-0"}" style="background-image: url('${s}'); background-size: cover; background-position: center; cursor: pointer;"></div>
    `).join("");let l=0;const o=n.length;e.querySelectorAll("div").forEach((s,d)=>{s.addEventListener("click",()=>{const{product:a}=n[d];a&&q(a)})}),o>1&&setInterval(()=>{const s=e.children;s[l].classList.replace("opacity-100","opacity-0"),l=(l+1)%o,s[l].classList.replace("opacity-0","opacity-100")},b.HERO_INTERVAL_MS)}async function D(e){e.className="container-page py-12",e.innerHTML=`
    <div class="flex items-center justify-between mb-6">
      <h2 id="catalog-title" class="font-display text-3xl font-bold text-navidad-rojo">
        🎄 Cargando productos...
      </h2>
    </div>
    <div id="catalogo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    <div id="catalog-empty" class="hidden text-center py-16 text-navidad-oscuro/60">
      <p class="text-lg">No hay productos disponibles en este momento.</p>
    </div>
  `;const t=await B(),n=e.querySelector("#catalogo"),l=e.querySelector("#catalog-title"),o=e.querySelector("#catalog-empty");if(t.length===0){l.textContent="Catálogo",n.classList.add("hidden"),o.classList.remove("hidden");return}l.textContent=`🎄 Catálogo (${t.length} productos)`;const s=document.createDocumentFragment();for(const d of t)s.appendChild(W(d));n.appendChild(s)}function K(e){const t=new Date().getFullYear();e.innerHTML=`
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
  `;const t=e.querySelector("#cart-overlay"),n=e.querySelector("#cart-drawer"),l=e.querySelector("#cart-close"),o=e.querySelector("#cart-items"),s=e.querySelector("#cart-count"),d=e.querySelector("#cart-total"),a=e.querySelector("#cart-checkout");function c(){t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),n.classList.remove("translate-x-full"),n.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function v(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),n.classList.add("translate-x-full"),n.setAttribute("aria-hidden","true"),document.body.style.overflow=""}function p(){const m=y(),x=$(),u=N();if(s.textContent=u,d.textContent=`$ ${x.toLocaleString("es-AR")}`,m.length===0){o.innerHTML=`
        <div class="flex flex-col items-center justify-center h-full text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-navidad-oscuro/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="mt-4 text-navidad-oscuro/60 font-medium">Tu carrito está vacío</p>
          <p class="mt-1 text-sm text-navidad-oscuro/40">Agregá productos desde el catálogo</p>
          <button id="cart-empty-close" class="mt-6 btn-gold">Ver catálogo</button>
        </div>
      `,o.querySelector("#cart-empty-close").addEventListener("click",()=>{var r;v(),(r=document.querySelector("#catalogo"))==null||r.scrollIntoView({behavior:"smooth"})}),a.classList.add("opacity-50","pointer-events-none");return}a.classList.remove("opacity-50","pointer-events-none"),o.innerHTML=m.map(r=>`
        <div class="flex gap-3 p-3 bg-white rounded-xl border border-navidad-oscuro/10">
          <img src="${r.imagen}" alt="${r.nombre}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div class="flex-grow min-w-0">
            <h4 class="font-semibold text-sm text-navidad-oscuro truncate">${r.nombre}</h4>
            ${r.subtipo?`<p class="text-xs text-navidad-oscuro/50">${r.subtipo}</p>`:""}
            <p class="text-sm font-bold text-navidad-verde mt-1">$ ${r.precio.toLocaleString("es-AR")}</p>
            <div class="flex items-center gap-2 mt-2">
              <button data-dec="${r.id}" class="w-7 h-7 rounded-full bg-navidad-oscuro/10 hover:bg-navidad-oscuro/20 flex items-center justify-center text-navidad-oscuro font-bold transition-colors" aria-label="Disminuir cantidad">−</button>
              <span class="text-sm font-medium w-6 text-center">${r.cantidad}</span>
              <button data-inc="${r.id}" class="w-7 h-7 rounded-full bg-navidad-rojo text-white hover:bg-navidad-rojoClaro flex items-center justify-center font-bold transition-colors" aria-label="Aumentar cantidad">+</button>
              <button data-del="${r.id}" class="ml-auto text-navidad-rojo/60 hover:text-navidad-rojo transition-colors" aria-label="Eliminar item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join(""),o.querySelectorAll("[data-inc]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.inc,f=y().find(g=>g.id===i);f&&S(i,f.cantidad+1)})}),o.querySelectorAll("[data-dec]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.dec,f=y().find(g=>g.id===i);f&&S(i,f.cantidad-1)})}),o.querySelectorAll("[data-del]").forEach(r=>{r.addEventListener("click",()=>{I(r.dataset.del)})})}A(p),l.addEventListener("click",v),t.addEventListener("click",v),a.addEventListener("click",()=>{v(),document.dispatchEvent(new CustomEvent("checkout:open"))}),document.addEventListener("cart:open",c),document.addEventListener("keydown",m=>{m.key==="Escape"&&!n.classList.contains("translate-x-full")&&v()}),p()}function Y(e){const t=y(),n=$();let o=` *Nuevo pedido - ${b.NOMBRE_NEGOCIO}*

`;return o+=` *Cliente:* ${e.nombre}
`,o+=` *Teléfono:* ${e.telefono}
`,e.direccion&&(o+=` *Dirección:* ${e.direccion}
`),e.comentarios&&(o+=`*Comentarios:* ${e.comentarios}
`),o+=`
 *Detalle del pedido:*
`,t.forEach((s,d)=>{o+=`${d+1}. ${s.nombre}`,s.subtipo&&(o+=` (${s.subtipo})`),o+=` — $ ${s.precio.toLocaleString("es-AR")} x ${s.cantidad} = $ ${(s.precio*s.cantidad).toLocaleString("es-AR")}
`}),o+=`
 *Total: $ ${n.toLocaleString("es-AR")}*`,o}function U(e){const t=Y(e),n=`https://wa.me/${b.NRO_WHATSAPP}?text=${encodeURIComponent(t)}`;R(),window.open(n,"_blank","noopener,noreferrer")}async function J(e){if(b.URL_SHEETS.includes("XXXX"))return console.warn("[Sheets] URL_SHEETS no configurada, saltando envío a Sheets"),{ok:!0,skipped:!0};const t=y(),n=$(),l={negocio:b.NOMBRE_NEGOCIO,timestamp:new Date().toISOString(),cliente:{nombre:e.nombre,telefono:e.telefono,direccion:e.direccion||"",comentarios:e.comentarios||""},items:t.map(o=>({nombre:o.nombre,subtipo:o.subtipo||"",precio:o.precio,cantidad:o.cantidad,subtotal:o.precio*o.cantidad})),total:n};try{const o=await fetch(b.URL_SHEETS,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(l),keepalive:!0});return o.ok?(console.log("[Sheets] Pedido enviado correctamente"),{ok:!0}):(console.warn("[Sheets] Respuesta no OK:",o.status),{ok:!1,error:`HTTP ${o.status}`})}catch(o){return console.warn("[Sheets] Error de red:",o.message),{ok:!1,error:o.message}}}function Q(e){e.innerHTML=`
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
  `;const t=e.querySelector("#checkout-overlay"),n=e.querySelector("#checkout-modal"),l=e.querySelector("#checkout-close"),o=e.querySelector("#checkout-form"),s=e.querySelector("#checkout-submit"),d=e.querySelector(".btn-text"),a=e.querySelector(".btn-loading");function c(){p(),t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),n.classList.remove("opacity-0","pointer-events-none"),n.querySelector("div").classList.remove("scale-95"),n.querySelector("div").classList.add("scale-100"),document.body.style.overflow="hidden",setTimeout(()=>{var i;return(i=n.querySelector("#nombre"))==null?void 0:i.focus()},100)}function v(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),n.classList.add("opacity-0","pointer-events-none"),n.querySelector("div").classList.add("scale-95"),n.querySelector("div").classList.remove("scale-100"),document.body.style.overflow="",o.reset(),x()}function p(){const i=y(),f=$(),g=e.querySelector("#order-summary"),L=e.querySelector("#checkout-total");if(i.length===0){g.innerHTML='<p class="text-navidad-oscuro/60 text-center">Carrito vacío</p>';return}g.innerHTML=i.map(w=>`
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
      `).join(""),L.textContent=`$ ${f.toLocaleString("es-AR")}`}function m(i,f){const g=e.querySelector(`#${i}`),L=e.querySelector(`#error-${i}`);g.classList.add("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20"),L.textContent=f,L.classList.remove("hidden")}function x(){e.querySelectorAll(".error-message").forEach(i=>i.classList.add("hidden")),e.querySelectorAll("input, textarea").forEach(i=>{i.classList.remove("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20")})}function u(i){x();let f=!0;i.nombre.trim()||(m("nombre","El nombre es obligatorio"),f=!1);const g=/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;return(!i.telefono.trim()||!g.test(i.telefono.replace(/\s/g,"")))&&(m("telefono","Ingresá un teléfono válido (ej: +54 9 11 1234-5678)"),f=!1),f}async function r(i){i.preventDefault();const f=new FormData(o),g=Object.fromEntries(f);if(u(g)&&y().length!==0){s.disabled=!0,d.classList.add("hidden"),a.classList.remove("hidden");try{J(g).catch(()=>{}),U(g)}finally{s.disabled=!1,d.classList.remove("hidden"),a.classList.add("hidden"),v()}}}l.addEventListener("click",v),t.addEventListener("click",v),o.addEventListener("submit",r),document.addEventListener("keydown",i=>{i.key==="Escape"&&!n.classList.contains("opacity-0")&&v()}),document.addEventListener("checkout:open",c)}const Z=document.querySelector("#app");Z.innerHTML=`
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
