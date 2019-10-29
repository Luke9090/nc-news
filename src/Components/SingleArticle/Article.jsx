import React, { PureComponent } from 'react';
import Loading from '../Loading';
import * as api from '../../utils/api';
import { Link } from '@reach/router';
import * as data from '../../utils/data';

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
    const { loggedInAs } = this.props;
    const { article, isLoading } = this.state;
    if (isLoading) return <Loading />;
    const { title, body, votes, topic, author, created_at } = article;
    const userIsAuthor = loggedInAs === author;
    return (
      <article className="article">
        <p className="upvote articleUpvote">⬆</p>
        <p className="votes articleVotes">{votes}</p>
        <p className="downvote articleDownvote">⬇</p>
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
    );
  }
}

export default Article;
