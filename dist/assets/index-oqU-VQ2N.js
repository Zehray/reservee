(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();document.addEventListener("DOMContentLoaded",()=>{const t=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(n=>{n.classList.remove("active"),n.getAttribute("href")===t&&n.classList.add("active")})});document.addEventListener("click",t=>{if(t.target.tagName==="A"&&t.target.getAttribute("href").startsWith("#")){t.preventDefault();const e=t.target.getAttribute("href").slice(1),n=document.getElementById(e);n&&n.scrollIntoView({behavior:"smooth",block:"start"})}});document.addEventListener("submit",t=>{const e=t.target.querySelector('button[type="submit"]');if(e){const n=e.textContent;e.textContent="Processing...",e.disabled=!0,setTimeout(()=>{e.textContent=n,e.disabled=!1},2e3)}});document.addEventListener("DOMContentLoaded",()=>{l()});let c={},a=[];async function l(){await u(),m(),f()}async function u(){try{const[t,e]=await Promise.all([fetch("src/assets/dummyjson/iller_ilceler.json"),fetch("src/assets/dummyjson/restaurant.json")]);if(!t.ok||!e.ok)throw new Error("Veri yüklenemedi");c=await t.json(),a=await e.json()}catch(t){console.error("Hata:",t)}}function m(){const t=document.getElementById("citySelect");t.innerHTML='<option value="">Şehir seçin</option>',Object.keys(c).forEach(e=>{const n=document.createElement("option");n.value=e,n.textContent=e,t.appendChild(n)})}function f(){const t=document.getElementById("citySelect"),e=document.getElementById("districtSelect"),n=document.getElementById("findRestaurants");t.addEventListener("change",y),e.addEventListener("change",g),n.addEventListener("click",h)}function y(){const t=document.getElementById("citySelect"),e=document.getElementById("districtSelect"),n=document.getElementById("findRestaurants"),o=t.value,s=c[o]||[];e.innerHTML='<option value="">İlçe seçin</option>',e.disabled=!s.length,n.disabled=!0,s.forEach(i=>{const r=document.createElement("option");r.value=i,r.textContent=i,e.appendChild(r)}),document.getElementById("restaurantResults").classList.add("hidden")}function g(){const t=document.getElementById("districtSelect"),e=document.getElementById("findRestaurants");e.disabled=!t.value}function h(){const t=document.getElementById("citySelect").value,e=document.getElementById("districtSelect").value;if(!t||!e)return;const n=a.filter(o=>o.city===t&&o.district===e);p(n,t,e)}function p(t,e,n){const o=document.getElementById("resultsTitle"),s=document.getElementById("restaurantGrid"),i=document.getElementById("restaurantResults");o.textContent=`${n}, ${e} bölgesindeki restoranlar`,s.innerHTML="",t.length===0?s.innerHTML=`
      <div class="no-restaurants">
        <div class="no-data-icon">🏪</div>
        <h3>Restoran bulunamadı</h3>
        <p>Bu bölgede henüz restoran verisi bulunmamaktadır.</p>
      </div>`:t.forEach(r=>{const d=v(r);s.appendChild(d)}),i.classList.remove("hidden"),i.scrollIntoView({behavior:"smooth"})}function v(t){const e=document.createElement("div");return e.className="restaurant-card",e.innerHTML=`
    <div class="restaurant-image">
      <img src="${t.image}" alt="${t.name}">
    </div>
    <div class="restaurant-content">
      <h3>${t.name}</h3>
      <p class="restaurant-address">${t.district}, ${t.city}</p>
      <div class="restaurant-actions">
        <button class="view-details-btn" onclick="window.location.href='restaurant.html?id=${t.id}'">
          Detaylar
        </button>
        <button class="quick-reserve-btn" onclick="window.location.href='reservation.html?restaurant=${t.id}'">
          Hızlı Rezervasyon
        </button>
      </div>
    </div>
  `,e}
