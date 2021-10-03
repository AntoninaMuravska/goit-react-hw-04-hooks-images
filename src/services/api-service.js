import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19817387-6793f3100509fa593759a5ec0';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const fetchImage = async ({ searchQuery, page }) => {
  return await axios
    .get('', {
      params: {
        q: searchQuery,
        page: page,
      },
    })
    .then(response => response.data.hits);
};

export default fetchImage;
// const fetchImage = ({ searchQuery, page }) => {
//   return axios
//     .get(
//       `${BASEURL}?q=${searchQuery}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`,
//     )
//     .then(response => response.data.hits);
// };
