import axios from 'axios';

const request = axios.create({ baseURL: 'https://nc-news-luke.herokuapp.com/api' });

export const fetchTopics = () => {
  return request
    .get('/topics')
    .then(({ data }) => data.topics)
    .catch(console.log);
};

export const fetchArticles = query => {
  return request
    .get('/articles', { params: query })
    .then(({ data }) => data.articles)
    .catch(console.log);
};
