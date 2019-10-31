import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import ArticleCard from './ArticleCard';
import Loading from '../Loading';
import ErrorDisplay from '../ErrorDisplay';

class ArticleList extends PureComponent {
  state = {
    articles: [],
    isLoading: true,
    sort_by: 'created_at',
    order: 'desc',
    error: null
  };

  grabArticles = () => {
    const { topic, author } = this.props;
    const { sort_by, order } = this.state;
    const query = { sort_by, order, topic, author };
    api
      .fetchArticles(query)
      .then(articles => this.setState({ articles, isLoading: false }))
      .catch(({ status, msg }) => {
        this.setState({ error: { status, msg }, isLoading: false });
      });
  };

  componentDidMount() {
    this.grabArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic || prevProps.author !== this.props.author) {
      this.setState({ error: null, isLoading: true }, this.grabArticles);
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value }, this.grabArticles);
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
            <select id="sort_by" value={this.state.sort_by} onChange={this.handleChange}>
              <option value="created_at">Date (default)</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Comments</option>
            </select>
          </label>
          <label htmlFor="order" id="orderLabel">
            Order...
            <select id="order" value={this.state.order} onChange={this.handleChange}>
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
