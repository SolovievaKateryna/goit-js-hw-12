import{a as f,S as w,i as a}from"./assets/vendor-c3c9fc05.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const m="https://pixabay.com/api/",S="45296804-0fb55f0e1381bd4cbf585a7a5";f.defaults.baseURL=m;async function p(t,r=1){const i={key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};try{return(await f.get(m,{params:i})).data}catch(o){throw console.error("Image Search Error:",o),o}}const g=document.querySelector(".gallery-list");function y(t){const r=t.map(({webformatURL:i,largeImageURL:o,tags:e,likes:s,views:n,comments:v,downloads:q})=>`
    <li>
    <a href="${o}">
        <img src="${i}" alt="${e}"/>
        </a>
        <div class="text-wrapper">
    <div class="stat"><p><b>Likes:</b> ${s}</p></div>
    <div class="stat"><p><b>Views:</b> ${n}</p> </div>
    <div class="stat"><p><b>Comments:</b> ${v}</p></div>
    <div class="stat"><p><b>Downloads:</b> ${q}</p></div>
        </div>
    </li>
    `).join("");g.insertAdjacentHTML("beforeend",r),new w(".gallery-list a",{captionsData:"alt",captionsDelay:250}).refresh()}function E(){g.innerHTML=""}function b(){document.querySelector(".loader").classList.remove("hidden")}function L(){document.querySelector(".loader").classList.add("hidden")}const d=document.querySelector('[data-action="load-more"]'),h=document.querySelector(".form-search");let l="",c=1,u=0;h.addEventListener("submit",async t=>{if(t.preventDefault(),l=t.currentTarget.elements.query.value.trim(),c=1,!l){a.error({message:"Please enter a search query!",position:"topRight"});return}b(),E(),d.classList.add("hidden");try{const r=await p(l,c);u=r.maxpages,r.hits.length===0?a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(y(r.hits),r.hits.length<15||u<=15?a.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}):d.classList.remove("hidden"))}catch(r){a.error({title:"Error",message:r.message})}finally{L(),h.reset()}});d.addEventListener("click",async()=>{c+=1,b();try{const t=await p(l,c);(t.hits.length===0||c*15>=u)&&(a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),d.classList.add("hidden")),y(t.hits),P()}catch(t){a.error({title:"Error",message:t.message})}finally{L()}});function P(){const{height:t}=document.querySelector(".gallery-list").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
