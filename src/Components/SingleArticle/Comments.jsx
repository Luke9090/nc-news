import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import Loading from '../Loading';
import PostComment from './PostComment';
import commentIcon from '../../imgs/commentIcon.svg';
import CommentCard from './CommentCard';

class Comments extends PureComponent {
  state = {
    comments: [],
    isLoading: true,
    justPosted: false
  };

  componentDidMount = () => {
    api.fetchArticleComments(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false }, () => {
        if (this.props.jumpToComments) this.commentsStart.scrollIntoView();
      });
    });
  };

  updateComments = () => {
    api.fetchArticleComments(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false, justPosted: true }, () => {
        this.bottom.scrollIntoView();
        setTimeout(() => {
          this.setState({ justPosted: false });
        }, 2000);
      });
    });
  };

  render() {
    const { article_id, loggedInAs } = this.props;
    const { isLoading, comments, justPosted } = this.state;
    if (isLoading) return <Loading />;
    return (
      <section id="comments">
        <h3
          ref={el => {
            this.commentsStart = el;
          }}
        >
          <img src={commentIcon} alt="Comment Icon" className="prefixIcon" />
          {comments.length} Comments
        </h3>
        {comments.map(comment => {
          return <CommentCard comment={comment} key={comment.comment_id} loggedInAs={loggedInAs} />;
        })}
        <PostComment article_id={article_id} loggedInAs={loggedInAs} updateComments={this.updateComments} />
        <div
          id="postedComment"
          ref={el => {
            this.bottom = el;
          }}
        >
          {justPosted ? 'Comment posted successfully' : ''}
        </div>
      </section>
    );
  }
}

export default Comments;
