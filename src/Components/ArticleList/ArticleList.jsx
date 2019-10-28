import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import ArticleCard from './ArticleCard';
import Loading from '../Loading';

class ArticleList extends PureComponent {
  state = {
    articles: [],
    isLoading: true,
    query: {}
  };

  componentDidMount() {
    this.setState({ query: { topic: this.props.topic, author: this.props.user } }, () => {
      api.fetchArticles(this.state.query).then(articles => this.setState({ articles, isLoading: false }));
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic || prevProps.user !== this.props.user) {
      this.setState({ query: { topic: this.props.topic, author: this.props.user } }, () => {
        api.fetchArticles(this.state.query).then(articles => this.setState({ articles, isLoading: false }));
      });
    }
  }

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return articles.map(article => {
      return <ArticleCard article={article} key={article.article_id} />;
    });
  }
}

export default ArticleList;
