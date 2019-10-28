import React, { PureComponent } from 'react';
import Loading from '../Loading';
import * as api from '../../utils/api';

class Article extends PureComponent {
  state = {
    article: {},
    isLoading: true
  };

  componentDidMount() {
    api.fetchSingleArticle(this.props.article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const { article, isLoading } = this.state;
    if (isLoading) return <Loading />;
    const { title, body, votes, topic, author, created_at, comment_count } = article;
    return (
      <article>
        <h2>{title}</h2>
        <p>{body}</p>
      </article>
    );
  }
}

export default Article;
