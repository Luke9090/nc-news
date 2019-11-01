import React, { PureComponent } from 'react';
import Loading from '../Loading';
import * as api from '../../utils/api';
import { Link } from '@reach/router';
import * as data from '../../utils/data';
import Comments from './Comments';
import './singleArticle.css';
import ErrorDisplay from '../ErrorDisplay';

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
      })
      .catch(({ status, msg }) => {
        this.setState({ error: { status, msg }, isLoading: false });
      });
  }

  handleVote = (article_id, vote) => {
    api.patchArticleVote(article_id, vote).then(article => {
      this.setState({ article });
    });
  };

  render() {
    const { loggedInAs, article_id } = this.props;
    const { article, isLoading, error } = this.state;
    if (isLoading) return <Loading />;
    if (error) return <ErrorDisplay status={error.status} msg={error.msg} />;
    const { title, body, votes, topic, author, created_at } = article;
    const userIsAuthor = loggedInAs === author;
    return (
      <section id="articleSection">
        <article className="article">
          <p
            className="upvote articleUpvote"
            onClick={() => {
              this.handleVote(article_id, 1);
            }}
          >
            ⬆
          </p>
          <p className="votes articleVotes">{votes}</p>
          <p
            className="downvote articleDownvote"
            onClick={() => {
              this.handleVote(article_id, -1);
            }}
          >
            ⬇
          </p>
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
        <Comments article_id={article_id} loggedInAs={loggedInAs} />
      </section>
    );
  }
}

export default Article;
