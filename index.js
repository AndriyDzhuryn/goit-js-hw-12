import{a as u,S as L,i as h}from"./assets/vendor-BbxBwq-Y.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();const y=async(e,s,r)=>{u.defaults.baseURL="https://pixabay.com/api/";const a={params:{key:"45515409-71b0c278136f92467ce3b8485",q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:r}};return u.get("",a)},f=e=>`<li class="gallery-item">
  <a class="gallery-link" href="${e.largeImageURL}">
    <img
      class="gallery-image"
      src="${e.webformatURL}"
      alt="${e.tags}"
    />
  </a>
  <div class="container-description">
    <div class="container-description-img">
      <h3 class="title-description-img">Likes</h3>
      <p class="description-img">${e.likes}</p>
    </div>
    <div class="container-description-img">
      <h3 class="title-description-img">Views</h3>
      <p class="description-img">${e.views}</p>
    </div>
    <div class="container-description-img">
      <h3 class="title-description-img">Comments</h3>
      <p class="description-img">${e.comments}</p>
    </div>
    <div class="container-description-img">
      <h3 class="title-description-img">Downloads</h3>
      <p class="description-img">${e.downloads}</p>
    </div>
  </div>
</li>`,v=document.querySelector(".form-search"),o=document.querySelector(".gallery"),l=document.querySelector(".gallery-item-load-more"),c=document.querySelector(".loader"),d=document.querySelector(".loader-container"),g=new L(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});let m,n;c.classList.add("active");l.classList.add("active");d.classList.add("active");sessionStorage.removeItem("inputWordSearch");const S=async e=>{e.preventDefault();try{m=1,n=150;const s=e.target.elements.search.value.trim();if(s==="")return;sessionStorage.setItem("inputWordSearch",s),c.classList.remove("active");const{data:r}=await y(s,m,n);c.classList.add("active");const a=r.hits.map(i=>f(i)).join("");if(o.innerHTML=a,g.refresh(),r.hits.length===0){c.classList.add("active"),l.classList.add("active"),d.classList.add("active"),g.refresh(),h.error(w);return}l.classList.remove("active"),d.insertAdjacentHTML("afterbegin",'<div class="loader"></div>'),v.reset()}catch(s){console.log(s)}},b=async()=>{try{const e=sessionStorage.getItem("inputWordSearch");if(e==="")return;m++,d.classList.remove("active");const{data:s}=await y(e,m,n);d.classList.add("active"),c.classList.add("active");const r=s.hits.map(i=>f(i)).join("");o.insertAdjacentHTML("beforeend",r);const t=2*o.children[0].getBoundingClientRect().height;if(window.scrollBy({top:t,left:0,behavior:"smooth"}),o.childElementCount<s.totalHits){const i=s.totalHits-o.childElementCount;if(n>i){n=s.totalHits-o.childElementCount;return}}if(o.childElementCount>=s.totalHits){l.classList.add("active"),h.info(I);return}}catch(e){console.log(e)}};v.addEventListener("submit",S);l.addEventListener("click",b);const w={title:"ERROR",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"},I={title:"INFO",message:"We're sorry, but you've reached the end of search results.",position:"topRight"};
//# sourceMappingURL=index.js.map
