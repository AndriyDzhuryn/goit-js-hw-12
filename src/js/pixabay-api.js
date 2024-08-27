import axios from 'axios';

// ====================================== Функції для HTTP-запитів
export const requestForImg = async (wordSearch, page, limitImgPerPage) => {
  axios.defaults.baseURL = 'https://pixabay.com/api/';

  const option = {
    params: {
      key: '45515409-71b0c278136f92467ce3b8485',
      q: `${wordSearch}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: limitImgPerPage,
    },
  };

  return axios.get('', option);
};
