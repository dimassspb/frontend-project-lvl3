import axios from 'axios';

import parseRss from './parseRss';

const routes = {
  allOrigins: (url) => {
    const result = new URL('/get', 'https://hexlet-allorigins.herokuapp.com');
    result.searchParams.set('url', url);
    result.searchParams.set('disableCache', 'true');
    return result.toString();
  },
};

export default (link) =>
  axios
    .get(routes.allOrigins(link))
    .then((response) => parseRss(link, response.data.contents));
