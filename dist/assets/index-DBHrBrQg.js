(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const b={NOMBRE_NEGOCIO:"Tentaciones de Sabor",NRO_WHATSAPP:"5491151038957",URL_SHEETS:"https://script.google.com/macros/s/AKfycbzmB7g9Fs4-D7h0MbDlxOidVXLYOFsjvsnnVy8RtrfYMdzdIuWpjSYXNDI9G0atzMpykw/exec",HERO_INTERVAL_MS:5e3},M="pandul_cart",j=new Set;let h=T();function T(){try{const e=localStorage.getItem(M);return e?JSON.parse(e):[]}catch{return[]}}function E(){localStorage.setItem(M,JSON.stringify(h)),O()}function O(){j.forEach(e=>e(h))}function A(e){return j.add(e),e(h),()=>j.delete(e)}function w(){return h}function q(){return h.reduce((e,t)=>e+t.cantidad,0)}function $(){return h.reduce((e,t)=>e+t.precio*t.cantidad,0)}function N({slug:e,nombre:t,subtipoNombre:a,precio:i,imagen:o}){const n=a?`${e}::${a}`:e,d=h.find(s=>s.id===n);d?d.cantidad+=1:h.push({id:n,slug:e,nombre:t,subtipo:a||null,precio:i,imagen:o,cantidad:1}),E()}function I(e){h=h.filter(t=>t.id!==e),E()}function S(e,t){const a=h.find(i=>i.id===e);if(a){if(t<=0){I(e);return}a.cantidad=t,E()}}function H(){h=[],E()}const C=[{href:"#inicio",label:"Inicio"},{href:"#catalogo",label:"Catálogo"},{href:"#contacto",label:"Contacto"}];function R(e){e.innerHTML=`
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
  `,P()}function P(){const e=document.getElementById("menu-btn"),t=document.getElementById("mobile-menu"),a=document.getElementById("icon-menu"),i=document.getElementById("icon-close"),o=document.getElementById("cart-btn"),n=document.getElementById("cart-badge"),d=document.getElementById("site-header");e.addEventListener("click",()=>{!t.classList.contains("hidden")?(t.classList.add("hidden"),a.classList.remove("hidden"),i.classList.add("hidden"),e.setAttribute("aria-expanded","false")):(t.classList.remove("hidden"),a.classList.add("hidden"),i.classList.remove("hidden"),e.setAttribute("aria-expanded","true"))}),document.querySelectorAll(".mobile-nav-link").forEach(s=>{s.addEventListener("click",()=>{t.classList.add("hidden"),a.classList.remove("hidden"),i.classList.add("hidden"),e.setAttribute("aria-expanded","false")})}),o.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("cart:open"))}),A(s=>{const v=s.reduce((l,p)=>l+p.cantidad,0);v>0?(n.textContent=v,n.classList.remove("hidden")):n.classList.add("hidden")}),window.addEventListener("scroll",()=>{window.scrollY>10?d.classList.add("shadow-lg"):d.classList.remove("shadow-lg")},{passive:!0})}let k=null;async function B(){if(k)return k;try{const e=await fetch("/products/manifest.json",{cache:"no-cache"});if(!e.ok)throw new Error(`HTTP ${e.status}`);return k=await e.json(),k}catch(e){return console.error("Error al cargar productos:",e),[]}}async function z(e){e.id="inicio",e.className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navidad-oscuro",e.innerHTML=`
    <div id="hero-slides" class="absolute inset-0"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-navidad-rojo/70 via-navidad-oscuro/60 to-navidad-verde/70"></div>
    <div class="absolute inset-0 bg-black/30"></div>

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
  `,await _()}async function _(){const e=document.getElementById("hero-slides");if(!e)return;const a=(await B()).filter(n=>n.imagenes&&n.imagenes.length>0).map(n=>n.imagenes[0]);if(a.length===0){e.style.background="linear-gradient(135deg, #C1121F, #065F46)";return}e.innerHTML=a.map((n,d)=>`
      <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${d===0?"opacity-100":"opacity-0"}" style="background-image: url('${n}'); background-size: cover; background-position: center;"></div>
    `).join("");let i=0;const o=a.length;o>1&&setInterval(()=>{const n=e.children;n[i].classList.replace("opacity-100","opacity-0"),i=(i+1)%o,n[i].classList.replace("opacity-0","opacity-100")},b.HERO_INTERVAL_MS)}function F(e){if(!e)return"";const{imagenes:t,nombre:a,descripcion:i,subtipos:o,precio:n}=e,d=o&&o.length>0,s=d?o[0].precio:n;return`
    <div id="product-modal" class="fixed inset-0 bg-navidad-oscuro/80 backdrop-blur z-50 hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-transform duration-300" style="transform: scale(0.9);">
        <!-- Header del modal -->
        <div class="p-6 border-b border-navidad-crema">
          <h2 id="modal-title" class="font-display text-2xl font-bold text-navidad-rojo">${a}</h2>
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
                 alt="${a} - imagen 1"
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
              ${t.map((v,l)=>`
                <button data-img="${l}"
                        class="w-16 h-16 rounded overflow-hidden object-cover ${l===0?"border-navidad-rojo border-2":"border-transparent"} hover:border-navidad-oscuro transition-all">
                  <img src="${v}" alt="${a} - miniatura ${l+1}" class="w-full h-full object-cover" loading="lazy" />
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Información del producto -->
        <div class="p-6 flex flex-col gap-4">
          <p id="modal-desc" class="text-navidad-oscuro/70 line-clamp-3">${i}</p>
          
          ${d?`
            <div>
              <p class="text-xs font-semibold text-navidad-oscuro/60 uppercase tracking-wide">Elegí una opción:</p>
              <div class="flex flex-wrap gap-2">
                ${o.map((v,l)=>`
                  <button data-subtipo="${v.nombre}" data-precio="${v.precio}"
                          class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${l===0?"border-navidad-rojo bg-navidad-rojo text-white":"border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50"}">
                    ${v.nombre}
                  </button>
                `).join("")}
              </div>
            </div>
          `:""}
          
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-navidad-verde">$ ${s.toLocaleString("es-AR")}</p>
            <button id="modal-add-cart"
                    class="btn-primary px-6 py-2">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function W(e){const t=document.getElementById("product-modal");if(!t)return;const a=document.getElementById("modal-close"),i=document.getElementById("modal-main-img"),o=document.getElementById("modal-prev"),n=document.getElementById("modal-next"),d=t.querySelectorAll("#modal-thumbs button");let s=0;a.addEventListener("click",p),t.addEventListener("click",r=>{r.target===t&&p()});function v(r){r.key==="Escape"&&(p(),document.removeEventListener("keydown",v))}document.addEventListener("keydown",v),o.addEventListener("click",()=>{s--,s<0&&(s=e.imagenes.length-1),l(s)}),n.addEventListener("click",()=>{s++,s>=e.imagenes.length&&(s=0),l(s)}),d.forEach(r=>{r.addEventListener("click",()=>{s=parseInt(r.dataset.img,10),l(s)})}),document.addEventListener("keydown",r=>{t.classList.contains("hidden")||(r.key==="ArrowLeft"?(s--,s<0&&(s=e.imagenes.length-1),l(s)):r.key==="ArrowRight"&&(s++,s>=e.imagenes.length&&(s=0),l(s)))});function l(r){s=r,e.imagenes[s]&&(i.src=e.imagenes[s],i.alt=`${e.nombre} - imagen ${s+1}`),d.forEach(m=>{m.classList.remove("border-navidad-rojo","border-2"),m.classList.add("border-transparent")}),d[s]&&d[s].classList.add("border-navidad-rojo","border-2")}function p(){t.classList.add("hidden"),t.classList.remove("flex")}}function G(e){const t=document.createElement("article");t.className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col",t.dataset.product=JSON.stringify(e);const a=e.subtipos&&e.subtipos.length>0,i=a?e.subtipos[0].precio:e.precio,o=a?e.subtipos[0].nombre:null;t.innerHTML=`
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
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur px-2 py-1.5 rounded-full">
          ${e.imagenes.map((r,m)=>`
              <button data-img="${m}"
                      class="thumb w-2 h-2 rounded-full transition-all ${m===0?"bg-navidad-dorado scale-125":"bg-white/60 hover:bg-white"}"
                      aria-label="Ver imagen ${m+1}"></button>
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
            ${e.subtipos.map((r,m)=>`
                <button data-subtipo="${r.nombre}" data-precio="${r.precio}"
                        class="subtipo-btn px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${m===0?"border-navidad-rojo bg-navidad-rojo text-white":"border-navidad-oscuro/20 text-navidad-oscuro/70 hover:border-navidad-rojo/50"}">
                  ${r.nombre}
                </button>
              `).join("")}
          </div>
        </div>
      `:""}

      <div class="mt-4 flex items-center justify-between">
        <p id="precio-${e.slug}" class="text-2xl font-bold text-navidad-verde">
          $ ${i.toLocaleString("es-AR")}
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
  `;let n=o,d=i,s=0;const v=t.querySelector(`#main-img-${e.slug}`),l=t.querySelector(`#precio-${e.slug}`),p=t.querySelector(`#add-${e.slug}`);return t.addEventListener("click",r=>{r.target.closest("#add-${product.slug}")||r.target.closest(".subtipo-btn")||r.target.closest(".thumb")||V(e)}),t.querySelectorAll(".thumb").forEach(r=>{r.addEventListener("click",()=>{const m=parseInt(r.dataset.img,10);s=m,v.src=e.imagenes[m],v.style.display="none",v.offsetWidth,v.style.display="",t.querySelectorAll(".thumb").forEach(y=>{y.classList.remove("bg-navidad-dorado","scale-125"),y.classList.add("bg-white/60")}),r.classList.add("bg-navidad-dorado","scale-125"),r.classList.remove("bg-white/60")})}),t.querySelectorAll(".subtipo-btn").forEach(r=>{r.addEventListener("click",()=>{n=r.dataset.subtipo,d=parseInt(r.dataset.precio,10),l.textContent=`$ ${d.toLocaleString("es-AR")}`,t.querySelectorAll(".subtipo-btn").forEach(m=>{m.classList.remove("border-navidad-rojo","bg-navidad-rojo","text-white"),m.classList.add("border-navidad-oscuro/20","text-navidad-oscuro/70")}),r.classList.add("border-navidad-rojo","bg-navidad-rojo","text-white"),r.classList.remove("border-navidad-oscuro/20","text-navidad-oscuro/70")})}),p.addEventListener("click",()=>{N({slug:e.slug,nombre:e.nombre,subtipoNombre:n,precio:d,imagen:e.imagenes[s]});const r=p.innerHTML;p.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      ¡Agregado!
    `,p.classList.remove("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),p.classList.add("bg-navidad-verde","hover:bg-navidad-verdeClaro"),setTimeout(()=>{p.innerHTML=r,p.classList.add("bg-navidad-rojo","hover:bg-navidad-rojoClaro"),p.classList.remove("bg-navidad-verde","hover:bg-navidad-verdeClaro")},1500)}),t}function V(e){const t=document.getElementById("product-modal-container");if(!t)return;t.innerHTML=F(e);const a=document.getElementById("product-modal");a&&(a.classList.remove("hidden"),a.classList.add("flex"),W(e))}async function D(e){e.className="container-page py-12",e.innerHTML=`
    <div class="flex items-center justify-between mb-6">
      <h2 id="catalog-title" class="font-display text-3xl font-bold text-navidad-rojo">
        🎄 Cargando productos...
      </h2>
    </div>
    <div id="catalogo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    <div id="catalog-empty" class="hidden text-center py-16 text-navidad-oscuro/60">
      <p class="text-lg">No hay productos disponibles en este momento.</p>
    </div>
  `;const t=await B(),a=e.querySelector("#catalogo"),i=e.querySelector("#catalog-title"),o=e.querySelector("#catalog-empty");if(t.length===0){i.textContent="Catálogo",a.classList.add("hidden"),o.classList.remove("hidden");return}i.textContent=`🎄 Catálogo (${t.length} productos)`;const n=document.createDocumentFragment();for(const d of t)n.appendChild(G(d));a.appendChild(n)}function K(e){const t=new Date().getFullYear();e.innerHTML=`
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
  `;const t=e.querySelector("#cart-overlay"),a=e.querySelector("#cart-drawer"),i=e.querySelector("#cart-close"),o=e.querySelector("#cart-items"),n=e.querySelector("#cart-count"),d=e.querySelector("#cart-total"),s=e.querySelector("#cart-checkout");function v(){t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),a.classList.remove("translate-x-full"),a.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function l(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),a.classList.add("translate-x-full"),a.setAttribute("aria-hidden","true"),document.body.style.overflow=""}function p(){const r=w(),m=$(),y=q();if(n.textContent=y,d.textContent=`$ ${m.toLocaleString("es-AR")}`,r.length===0){o.innerHTML=`
        <div class="flex flex-col items-center justify-center h-full text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-navidad-oscuro/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="mt-4 text-navidad-oscuro/60 font-medium">Tu carrito está vacío</p>
          <p class="mt-1 text-sm text-navidad-oscuro/40">Agregá productos desde el catálogo</p>
          <button id="cart-empty-close" class="mt-6 btn-gold">Ver catálogo</button>
        </div>
      `,o.querySelector("#cart-empty-close").addEventListener("click",()=>{var u;l(),(u=document.querySelector("#catalogo"))==null||u.scrollIntoView({behavior:"smooth"})}),s.classList.add("opacity-50","pointer-events-none");return}s.classList.remove("opacity-50","pointer-events-none"),o.innerHTML=r.map(u=>`
        <div class="flex gap-3 p-3 bg-white rounded-xl border border-navidad-oscuro/10">
          <img src="${u.imagen}" alt="${u.nombre}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div class="flex-grow min-w-0">
            <h4 class="font-semibold text-sm text-navidad-oscuro truncate">${u.nombre}</h4>
            ${u.subtipo?`<p class="text-xs text-navidad-oscuro/50">${u.subtipo}</p>`:""}
            <p class="text-sm font-bold text-navidad-verde mt-1">$ ${u.precio.toLocaleString("es-AR")}</p>
            <div class="flex items-center gap-2 mt-2">
              <button data-dec="${u.id}" class="w-7 h-7 rounded-full bg-navidad-oscuro/10 hover:bg-navidad-oscuro/20 flex items-center justify-center text-navidad-oscuro font-bold transition-colors" aria-label="Disminuir cantidad">−</button>
              <span class="text-sm font-medium w-6 text-center">${u.cantidad}</span>
              <button data-inc="${u.id}" class="w-7 h-7 rounded-full bg-navidad-rojo text-white hover:bg-navidad-rojoClaro flex items-center justify-center font-bold transition-colors" aria-label="Aumentar cantidad">+</button>
              <button data-del="${u.id}" class="ml-auto text-navidad-rojo/60 hover:text-navidad-rojo transition-colors" aria-label="Eliminar item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join(""),o.querySelectorAll("[data-inc]").forEach(u=>{u.addEventListener("click",()=>{const c=u.dataset.inc,f=w().find(g=>g.id===c);f&&S(c,f.cantidad+1)})}),o.querySelectorAll("[data-dec]").forEach(u=>{u.addEventListener("click",()=>{const c=u.dataset.dec,f=w().find(g=>g.id===c);f&&S(c,f.cantidad-1)})}),o.querySelectorAll("[data-del]").forEach(u=>{u.addEventListener("click",()=>{I(u.dataset.del)})})}A(p),i.addEventListener("click",l),t.addEventListener("click",l),s.addEventListener("click",()=>{l(),document.dispatchEvent(new CustomEvent("checkout:open"))}),document.addEventListener("cart:open",v),document.addEventListener("keydown",r=>{r.key==="Escape"&&!a.classList.contains("translate-x-full")&&l()}),p()}function Y(e){const t=w(),a=$();let o=` *Nuevo pedido - ${b.NOMBRE_NEGOCIO}*

`;return o+=` *Cliente:* ${e.nombre}
`,o+=` *Teléfono:* ${e.telefono}
`,e.direccion&&(o+=` *Dirección:* ${e.direccion}
`),e.comentarios&&(o+=`*Comentarios:* ${e.comentarios}
`),o+=`
 *Detalle del pedido:*
`,t.forEach((n,d)=>{o+=`${d+1}. ${n.nombre}`,n.subtipo&&(o+=` (${n.subtipo})`),o+=` — $ ${n.precio.toLocaleString("es-AR")} x ${n.cantidad} = $ ${(n.precio*n.cantidad).toLocaleString("es-AR")}
`}),o+=`
 *Total: $ ${a.toLocaleString("es-AR")}*`,o}function U(e){const t=Y(e),a=`https://wa.me/${b.NRO_WHATSAPP}?text=${encodeURIComponent(t)}`;H(),window.open(a,"_blank","noopener,noreferrer")}async function J(e){if(b.URL_SHEETS.includes("XXXX"))return console.warn("[Sheets] URL_SHEETS no configurada, saltando envío a Sheets"),{ok:!0,skipped:!0};const t=w(),a=$(),i={negocio:b.NOMBRE_NEGOCIO,timestamp:new Date().toISOString(),cliente:{nombre:e.nombre,telefono:e.telefono,direccion:e.direccion||"",comentarios:e.comentarios||""},items:t.map(o=>({nombre:o.nombre,subtipo:o.subtipo||"",precio:o.precio,cantidad:o.cantidad,subtotal:o.precio*o.cantidad})),total:a};try{const o=await fetch(b.URL_SHEETS,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(i),keepalive:!0});return o.ok?(console.log("[Sheets] Pedido enviado correctamente"),{ok:!0}):(console.warn("[Sheets] Respuesta no OK:",o.status),{ok:!1,error:`HTTP ${o.status}`})}catch(o){return console.warn("[Sheets] Error de red:",o.message),{ok:!1,error:o.message}}}function Q(e){e.innerHTML=`
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
  `;const t=e.querySelector("#checkout-overlay"),a=e.querySelector("#checkout-modal"),i=e.querySelector("#checkout-close"),o=e.querySelector("#checkout-form"),n=e.querySelector("#checkout-submit"),d=e.querySelector(".btn-text"),s=e.querySelector(".btn-loading");function v(){p(),t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),a.classList.remove("opacity-0","pointer-events-none"),a.querySelector("div").classList.remove("scale-95"),a.querySelector("div").classList.add("scale-100"),document.body.style.overflow="hidden",setTimeout(()=>{var c;return(c=a.querySelector("#nombre"))==null?void 0:c.focus()},100)}function l(){t.classList.add("opacity-0","pointer-events-none"),t.classList.remove("opacity-100"),a.classList.add("opacity-0","pointer-events-none"),a.querySelector("div").classList.add("scale-95"),a.querySelector("div").classList.remove("scale-100"),document.body.style.overflow="",o.reset(),m()}function p(){const c=w(),f=$(),g=e.querySelector("#order-summary"),L=e.querySelector("#checkout-total");if(c.length===0){g.innerHTML='<p class="text-navidad-oscuro/60 text-center">Carrito vacío</p>';return}g.innerHTML=c.map(x=>`
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
      `).join(""),L.textContent=`$ ${f.toLocaleString("es-AR")}`}function r(c,f){const g=e.querySelector(`#${c}`),L=e.querySelector(`#error-${c}`);g.classList.add("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20"),L.textContent=f,L.classList.remove("hidden")}function m(){e.querySelectorAll(".error-message").forEach(c=>c.classList.add("hidden")),e.querySelectorAll("input, textarea").forEach(c=>{c.classList.remove("border-navidad-rojo","focus:border-navidad-rojo","focus:ring-navidad-rojo/20")})}function y(c){m();let f=!0;c.nombre.trim()||(r("nombre","El nombre es obligatorio"),f=!1);const g=/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;return(!c.telefono.trim()||!g.test(c.telefono.replace(/\s/g,"")))&&(r("telefono","Ingresá un teléfono válido (ej: +54 9 11 1234-5678)"),f=!1),f}async function u(c){c.preventDefault();const f=new FormData(o),g=Object.fromEntries(f);if(y(g)&&w().length!==0){n.disabled=!0,d.classList.add("hidden"),s.classList.remove("hidden");try{J(g).catch(()=>{}),U(g)}finally{n.disabled=!1,d.classList.remove("hidden"),s.classList.add("hidden"),l()}}}i.addEventListener("click",l),t.addEventListener("click",l),o.addEventListener("submit",u),document.addEventListener("keydown",c=>{c.key==="Escape"&&!a.classList.contains("opacity-0")&&l()}),document.addEventListener("checkout:open",v)}const Z=document.querySelector("#app");Z.innerHTML=`
  <div id="header"></div>
  <main id="main">
    <div id="hero"></div>
    <div id="catalogo"></div>
  </main>
  <div id="footer"></div>
  <div id="cart"></div>
  <div id="checkout"></div>
  <div id="product-modal-container" class="hidden"></div>
`;R(document.getElementById("header"));K(document.getElementById("footer"));X(document.getElementById("cart"));Q(document.getElementById("checkout"));(async()=>(await z(document.getElementById("hero")),await D(document.getElementById("catalogo"))))();
