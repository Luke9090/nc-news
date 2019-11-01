import React, { PureComponent } from 'react';
import Loading from '../Loading';
import * as api from '../../utils/api';
import { Link } from '@reach/router';
import * as data from '../../utils/data';
import Comments from './Comments';
import './singleArticle.css';
import ErrorDisplay from '../ErrorDisplay';
import Voter from '../Voter';

class Article extends PureComponent {
  state = {
    article: {},
    isLoading: true,
    error: null
  };

  componentDidMount() {
    api
      .fetchSingleArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, isLoading: false });
        document.title = `${article.title} - NC-News`;
      })
      .catch(({ status, msg }) => {
        this.setState({ error: { status, msg }, isLoading: false });
      });
  }

  render() {
    const jumpToComments = this.props.location.hash === '#comments';
    const { loggedInAs, article_id } = this.props;
    const { article, isLoading, error } = this.state;
    if (isLoading) return <Loading />;
    if (error) return <ErrorDisplay status={error.status} msg={error.msg} />;
    const { title, body, votes, topic, author, created_at } = article;
    const userIsAuthor = loggedInAs === author;
    return (
      <section id="articleSection">
        <article className="article">
          <Voter votes={votes || 0} id={article_id} voteCategory="article" />
          <h2 className="articleTitle">{title}</h2>
          <p className={`articleAuthor${userIsAuthor ? ' userIsAuthor' : ''}`}>
            <Link to={`/u/${author}`}>/u/{author}</Link>
          </p>
          <p className="articleTopic">
            <Link to={`/t/${topic}`}>/t/{topic}</Link>
          </p>
          <p className="articleTime">{data.formatTime(created_at)}</p>
          <p className="articleBody">{body}</p>
        </article>
        <Comments article_id={article_id} loggedInAs={loggedInAs} jumpToComments={jumpToComments} />
      </section>
    );
  }
}

export default Article;
