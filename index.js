import{a as u,S as L,i as h}from"./assets/vendor-BbxBwq-Y.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const y=async(t,s,r)=>{u.defaults.baseURL="https://pixabay.com/api/";const a={params:{key:"45515409-71b0c278136f92467ce3b8485",q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:r}};return u.get("",a)},f=t=>`<li class="gallery-item">
  <a class="gallery-link" href="${t.largeImageURL}">
    <img
      class="gallery-image"
      src="${t.webformatURL}"
      alt="${t.tags}"
    />
  </a>
  <div class="container-description">
    <div class="container-description-img">
      <h3 class="title-description-img">Likes</h3>
      <p class="description-img">${t.likes}</p>
    </div>
    <div class="container-description-img">
      <h3 class="title-description-img">Views</h3>
      <p class="description-img">${t.views}</p>
    </div>
    <div class="container-description-img">
      <h3 class="title-description-img">Comments</h3>
      <p class="description-img">${t.comments}</p>
    </div>
    <div class="container-description-img">
      <h3 class="title-description-img">Downloads</h3>
      <p class="description-img">${t.downloads}</p>
    </div>
  </div>
</li>`,v=document.querySelector(".form-search"),o=document.querySelector(".gallery"),d=document.querySelector(".gallery-item-load-more"),n=document.querySelector(".loader"),c=document.querySelector(".loader-container"),g=new L(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});let m,l;n.classList.add("active");d.classList.add("active");c.classList.add("active");sessionStorage.removeItem("inputWordSearch");const S=async t=>{t.preventDefault();try{m=1,l=15;const s=t.target.elements.search.value.trim();if(s==="")return;sessionStorage.setItem("inputWordSearch",s),n.classList.remove("active");const{data:r}=await y(s,m,l);n.classList.add("active");const a=r.hits.map(i=>f(i)).join("");if(o.innerHTML=a,g.refresh(),r.hits.length===0){n.classList.add("active"),d.classList.add("active"),c.classList.add("active"),g.refresh(),h.error(w);return}d.classList.remove("active");const e='<div class="loader"></div>';c.innerHTML=e,c.classList.add("active"),v.reset()}catch(s){console.log(s)}},b=async()=>{try{const t=sessionStorage.getItem("inputWordSearch");if(t==="")return;m++,c.classList.remove("active");const{data:s}=await y(t,m,l);c.classList.add("active"),n.classList.add("active");const r=s.hits.map(i=>f(i)).join("");o.insertAdjacentHTML("beforeend",r);const e=2*o.children[0].getBoundingClientRect().height;if(window.scrollBy({top:e,left:0,behavior:"smooth"}),o.childElementCount<s.totalHits){const i=s.totalHits-o.childElementCount;if(l>i){l=s.totalHits-o.childElementCount;return}}if(o.childElementCount>=s.totalHits){d.classList.add("active"),h.info(I);return}}catch(t){console.log(t)}};v.addEventListener("submit",S);d.addEventListener("click",b);const w={title:"ERROR",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"},I={title:"INFO",message:"We're sorry, but you've reached the end of search results.",position:"topRight"};
//# sourceMappingURL=index.js.map
