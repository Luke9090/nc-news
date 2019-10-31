import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import ArticleCard from './ArticleCard';
import Loading from '../Loading';
import ErrorDisplay from '../ErrorDisplay';

class ArticleList extends PureComponent {
  state = {
    articles: [],
    isLoading: true,
    query: {
      sort_by: 'created_at',
      order: 'desc'
    },
    error: null
  };

  componentDidMount() {
    this.setState(
      current => {
        const newQuery = { ...current.query, topic: this.props.topic, author: this.props.user };
        return { query: newQuery };
      },
      () => {
        api
          .fetchArticles(this.state.query)
          .then(articles => this.setState({ articles, isLoading: false }))
          .catch(({ status, msg }) => {
            this.setState({ error: { status, msg }, isLoading: false });
          });
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic || prevProps.user !== this.props.user) {
      this.setState(
        current => {
          const newQuery = { ...current.query, topic: this.props.topic, author: this.props.user };
          return { query: newQuery, error: null, isLoading: true };
        },
        () => {
          api
            .fetchArticles(this.state.query)
            .then(articles => this.setState({ articles, isLoading: false }))
            .catch(({ status, msg }) => {
              this.setState({ error: { status, msg }, isLoading: false });
            });
        }
      );
    }
  }

  handleChange = ({ target }) => {
    this.setState(
      current => {
        const newQuery = { ...current.query };
        newQuery[target.id] = target.value;
        return { query: newQuery };
      },
      () => {
        api
          .fetchArticles(this.state.query)
          .then(articles => this.setState({ articles, isLoading: false }))
          .catch(({ status, msg }) => {
            this.setState({ error: { status, msg }, isLoading: false });
          });
      }
    );
  };

  render() {
    const { loggedInAs } = this.props;
    const { articles, isLoading, error } = this.state;
    if (isLoading) return <Loading />;
    if (error) return <ErrorDisplay status={error.status} msg={error.msg} />;
    return (
      <>
        <form id="sortControls">
          <label htmlFor="sort_by" id="sortLabel">
            Sort by...
            <select id="sort_by" value={this.state.query.sort_by} onChange={this.handleChange}>
              <option value="created_at">Date (default)</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Comments</option>
            </select>
          </label>
          <label htmlFor="order" id="orderLabel">
            Order...
            <select id="order" value={this.state.query.order} onChange={this.handleChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending (default)</option>
            </select>
          </label>
        </form>
        {articles.map(article => {
          return <ArticleCard article={article} key={article.article_id} loggedInAs={loggedInAs} />;
        })}
      </>
    );
  }
}

export default ArticleList;
