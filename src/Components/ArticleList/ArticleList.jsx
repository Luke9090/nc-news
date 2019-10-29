import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import ArticleCard from './ArticleCard';
import Loading from '../Loading';
import ErrorDisplay from '../ErrorDisplay';

class ArticleList extends PureComponent {
  state = {
    articles: [],
    isLoading: true,
    query: {},
    error: null
  };

  componentDidMount() {
    this.setState({ query: { topic: this.props.topic, author: this.props.user } }, () => {
      api
        .fetchArticles(this.state.query)
        .then(articles => this.setState({ articles, isLoading: false }))
        .catch(({ status, msg }) => {
          this.setState({ error: { status, msg }, isLoading: false });
        });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic || prevProps.user !== this.props.user) {
      this.setState({ query: { topic: this.props.topic, author: this.props.user } }, () => {
        api
          .fetchArticles(this.state.query)
          .then(articles => this.setState({ articles, isLoading: false }))
          .catch(({ status, msg }) => {
            this.setState({ error: { status, msg }, isLoading: false });
          });
      });
    }
  }

  render() {
    const { loggedInAs } = this.props;
    const { articles, isLoading, error } = this.state;
    if (isLoading) return <Loading />;
    if (error) return <ErrorDisplay status={error.status} msg={error.msg} />;
    return articles.map(article => {
      return <ArticleCard article={article} key={article.article_id} loggedInAs={loggedInAs} />;
    });
  }
}

export default ArticleList;
