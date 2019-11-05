import axios from 'axios';

const request = axios.create({ baseURL: 'https://nc-news-luke.herokuapp.com/api' });

export const fetchTopics = () => {
  return request
    .get('/topics')
    .then(({ data }) => data.topics)
    .catch(console.dir);
};

export const fetchArticles = query => {
  return request
    .get('/articles', { params: query })
    .then(({ data }) => data.articles)
    .catch(err => {
      const status = err.response.status;
      const msg = err.response.data.err;
      return Promise.reject({ msg, status });
    });
};

export const fetchSingleArticle = article_id => {
  return request
    .get(`/articles/${article_id}`)
    .then(({ data }) => data.article)
    .catch(err => {
      const status = err.response.status;
      const msg = err.response.data.err;
      return Promise.reject({ msg, status });
    });
};

export const fetchArticleComments = article_id => {
  return request
    .get(`/articles/${article_id}/comments`, { params: { order: 'asc' } })
    .then(({ data }) => data.comments)
    .catch(err => {
      const status = err.response.status;
      const msg = err.response.data.err;
      return Promise.reject({ msg, status });
    });
};

export const postComment = (article_id, body, username) => {
  return request.post(`/articles/${article_id}/comments`, { username, body }).catch(console.dir);
};

export const deleteComment = comment_id => {
  return request.delete(`/comments/${comment_id}`).catch(console.dir);
};

export const deleteArticle = article_id => {
  return request.delete(`/articles/${article_id}`).catch(console.dir);
};

export const patchCommentVote = (comment_id, vote) => {
  return request.patch(`/comments/${comment_id}`, { inc_votes: vote }).then(({ data }) => data.comment);
};

export const patchArticleVote = (article_id, vote) => {
  return request.patch(`/articles/${article_id}`, { inc_votes: vote }).then(({ data }) => data.article);
};

export const checkBackend = () => {
  return request.get('/');
};

export const fetchUsers = (sort_by = 'username', order = 'asc') => {
  return request
    .get('/users', { params: { sort_by, order } })
    .then(({ data }) => {
      return data.users;
    })
    .catch(console.dir);
};

export const validateUsername = username => {
  return request.get(`/users/${username}/validate`).then(({ data }) => data.exists);
};

export const fetchSingleUser = username => {
  return request
    .get(`/users/${username}`)
    .then(({ data }) => data.user)
    .catch(err => {
      const status = err.response.status;
      const msg = err.response.data.err;
      return Promise.reject({ msg, status });
    });
};

export const fetchUserComments = username => {
  return request.get(`users/${username}/comments`).then(({ data }) => data.comments);
};
