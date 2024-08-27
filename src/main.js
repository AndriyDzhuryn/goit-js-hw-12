'use strict';

import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { requestForImg } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const formSearchImg = document.querySelector('.form-search');
const galleryListImg = document.querySelector('.gallery');
const btnLoadMoreImg = document.querySelector('.gallery-item-load-more');
const indicatorLoader = document.querySelector('.loader');
const loaderContainer = document.querySelector('.loader-container');

const galleryList = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

let page;
let limitImgPerPage;

indicatorLoader.classList.add('active');
btnLoadMoreImg.classList.add('active');
loaderContainer.classList.add('active');

sessionStorage.removeItem('inputWordSearch');

//==============================================================SUBMIT START
const onFormSearchSubmit = async evt => {
  evt.preventDefault();
  try {
    page = 1;
    limitImgPerPage = 150;

    const inputWordSearch = evt.target.elements.search.value.trim();

    if (inputWordSearch === '') {
      return;
    }

    sessionStorage.setItem('inputWordSearch', inputWordSearch);

    indicatorLoader.classList.remove('active');
    const { data } = await requestForImg(
      inputWordSearch,
      page,
      limitImgPerPage
    );
    indicatorLoader.classList.add('active');

    const listGalleryImg = data.hits
      .map(imgInfo => createGalleryCard(imgInfo))
      .join('');
    galleryListImg.innerHTML = listGalleryImg;

    galleryList.refresh();

    if (data.hits.length === 0) {
      indicatorLoader.classList.add('active');
      btnLoadMoreImg.classList.add('active');
      loaderContainer.classList.add('active');
      galleryList.refresh();
      iziToast.error(errorInputEmpty);
      return;
    }

    btnLoadMoreImg.classList.remove('active');

    const createLoaderMore = `<div class="loader"></div>`;
    loaderContainer.insertAdjacentHTML('afterbegin', createLoaderMore);

    formSearchImg.reset();
  } catch (error) {
    console.log(error);
  }
};
//==============================================================SUBMIT END

// ==================================================LOAD MORE START==========
const onBtnSearchSubmit = async () => {
  try {
    const inputWordSearch = sessionStorage.getItem('inputWordSearch');

    if (inputWordSearch === '') {
      return;
    }

    page++;

    loaderContainer.classList.remove('active');
    const { data } = await requestForImg(
      inputWordSearch,
      page,
      limitImgPerPage
    );
    loaderContainer.classList.add('active');

    indicatorLoader.classList.add('active');
    const listGalleryImg = data.hits
      .map(imgInfo => createGalleryCard(imgInfo))
      .join('');
    galleryListImg.insertAdjacentHTML('beforeend', listGalleryImg);

    const sizeGalleryItem = galleryListImg.children[0].getBoundingClientRect();
    const heightGalleryItem = 2 * sizeGalleryItem.height;
    window.scrollBy({
      top: heightGalleryItem,
      left: 0,
      behavior: 'smooth',
    });

    if (galleryListImg.childElementCount < data.totalHits) {
      const differenceResponseData =
        data.totalHits - galleryListImg.childElementCount;
      if (limitImgPerPage > differenceResponseData) {
        limitImgPerPage = data.totalHits - galleryListImg.childElementCount;
        return;
      }
    }

    if (galleryListImg.childElementCount >= data.totalHits) {
      btnLoadMoreImg.classList.add('active');
      iziToast.info(infoGalleryList);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
// ==================================================LOAD MORE END==========

formSearchImg.addEventListener('submit', onFormSearchSubmit);

btnLoadMoreImg.addEventListener('click', onBtnSearchSubmit);

const errorInputEmpty = {
  title: 'ERROR',
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  position: 'topRight',
};

const infoGalleryList = {
  title: 'INFO',
  message: "We're sorry, but you've reached the end of search results.",
  position: 'topRight',
};
