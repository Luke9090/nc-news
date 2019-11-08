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
    document.title = author ? `/u/${author} - NC-News` : topic ? `/t/${topic} - NC-News` : 'Articles - NC-News';
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
    this.setState({ [target.id]: target.value, isLoading: true }, this.grabArticles);
  };

  render() {
    const { loggedInAs, author, topic } = this.props;
    const { articles, isLoading, error } = this.state;
    const topicHeader = <h2>{`${articles.length} articles in /t/${topic}`}</h2>;
    const authorHeader = (
      <h3>
        {`${articles.length} articles by`} <span className="username">/u/{`${author}`}</span>
      </h3>
    );
    if (!isLoading && error) return <ErrorDisplay status={error.status} msg={error.msg} />;
    return (
      <>
        {topic ? topicHeader : author ? authorHeader : <h2>All articles</h2>}
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
        {isLoading ? <Loading /> : articles.map(article => {
          return <ArticleCard article={article} key={article.article_id} loggedInAs={loggedInAs} />;
        })}
      </>
    );
  }
}

export default ArticleList;
