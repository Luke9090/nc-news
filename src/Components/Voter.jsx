import React, { PureComponent } from 'react';
import * as api from '../utils/api';
import loading from '../imgs/loading.svg';
import upvote from '../imgs/upvote.svg';
import downvote from '../imgs/downvote.svg';

class Voter extends PureComponent {
  state = {
    userVote: 0,
    pending: false,
    success: null
  };

  handleVote = (dir, event) => {
    if (!this.state.pending) {
      event.persist();
      const origSrc = event.target.src;
      event.target.src = loading;
      const { userVote } = this.state;
      let newVote = 0;
      if (dir === 'up') newVote = userVote === 1 ? 0 : 1;
      else newVote = userVote === -1 ? 0 : -1;
      const increment = newVote - userVote;
      this.setState({ userVote: newVote, pending: true, success: null }, () => {
        this.apiCall(increment)
          .then(() => {
            this.setState({ pending: false, success: true });
            event.target.src = origSrc;
          })
          .catch(() => {
            this.setState({ userVote, pending: false, success: false });
            event.target.src = origSrc;
          });
      });
    }
  };

  apiCall = increment => {
    const { voteCategory, id } = this.props;
    const apiCalls = { comment: api.patchCommentVote, article: api.patchArticleVote };
    return apiCalls[voteCategory](id, increment);
  };

  render() {
    const { votes } = this.props;
    const { userVote, pending } = this.state;
    let isTouch = !!('ontouchstart' in window) || window.navigator.msMaxTouchPoints > 0;
    return (
      <>
        <img
          src={upvote}
          alt="upvote arrow"
          className={`upvote vote ${this.state.userVote === 1 && 'selected'} ${!isTouch ? 'hoverable' : ''} ${pending ? 'pending' : ''}`}
          onClick={event => {
            this.handleVote('up', event);
          }}
        />
        <p className="votes articleVotes">{votes + userVote}</p>
        <img
          src={downvote}
          alt="downvote arrow"
          className={`downvote vote ${this.state.userVote === -1 && 'selected'} ${!isTouch ? 'hoverable' : ''} ${pending ? 'pending' : ''}`}
          onClick={event => {
            this.handleVote('down', event);
          }}
        />
      </>
    );
  }
}

export default Voter;
