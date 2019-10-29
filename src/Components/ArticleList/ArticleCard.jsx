import React, { PureComponent } from 'react';
import { Link } from '@reach/router';
import * as data from '../../utils/data';
import './articleCard.css';
import DeletedCard from '../DeletedCard';
import commentIcon from '../../imgs/commentIcon.svg';
import * as api from '../../utils/api';

class ArticleCard extends PureComponent {
  state = {
    deleted: false
  };

  deleteArticle = ({ target }) => {
    api.deleteArticle(target.id).then(() => {
      this.setState({ deleted: true });
    });
  };

  render() {
    const { article, loggedInAs } = this.props;
    const { author, title, article_id, topic, created_at, votes, comment_count } = article;
    const userIsAuthor = loggedInAs === author;
    const { deleted } = this.state;

    if (deleted) return <DeletedCard type="Article" />;
    return (
      <section className="articleCard">
        <p className="upvote articleCardUpvote">⬆</p>
        <p className="votes articleCardVotes">{votes}</p>
        <p className="downvote articleCardUpvote">⬇</p>
        <Link to={`/a/${article_id}`} className="articleCardTitle">
          <h3>{title}</h3>
        </Link>
        <p className={`articleCardAuthor${userIsAuthor ? ' userIsAuthor' : ''}`}>
          <Link to={`/u/${author}`}>/u/{author}</Link>
        </p>
        <p className="articleCardTopic">
          <Link to={`/t/${topic}`}>/t/{topic}</Link>
        </p>
        <p className="articleCardTime">{data.formatTime(created_at)}</p>
        <Link to={`/a/${article_id}#comments`} className="articleCardComments">
          <img src={commentIcon} alt="Comment Icon" className="commentIcon" />
          {comment_count} comments
        </Link>
        <p className="articleCardDelete">
          {userIsAuthor ? (
            <button id={article_id} onClick={this.deleteArticle}>
              Delete article
            </button>
          ) : (
            ''
          )}
        </p>
      </section>
    );
  }
}

export default ArticleCard;
