import _ from 'lodash';

import loadRss from './loadRss';

const links = [];

const updateRss = (state) => {
  const promises = links.map(loadRss);

  Promise.all(promises)
    .then((results) => {
      const posts = results.flatMap((result) => result.posts);

      const allPosts = _.union(posts, state.posts);
      const newPosts = _.differenceBy(allPosts, state.posts, 'url');

      if (newPosts.length > 0) {
        state.posts = [...newPosts, ...state.posts];
      }
    })
    .finally(() => {
      setTimeout(() => updateRss(state), 5000);
    });
};

export default (link, state) => {
  links.push(link);

  if (state.updateProcess.state === 'idle') {
    state.updateProcess.state = 'running';
    setTimeout(() => updateRss(state), 5000);
  }
};
