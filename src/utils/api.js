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

export const fetchSingleArticle = article_id => {
  return request
    .get(`/articles/${article_id}`)
    .then(({ data }) => data.article)
    .catch(console.log);
};

export const fetchArticleComments = article_id => {
  return request
    .get(`/articles/${article_id}/comments`, { params: { order: 'asc' } })
    .then(({ data }) => data.comments)
    .catch(console.log);
};

export const postComment = (article_id, body, username) => {
  return request.post(`/articles/${article_id}/comments`, { username, body });
};
