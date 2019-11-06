import React, { PureComponent } from 'react';
import NotLoggedIn from './NotLoggedIn';
import * as api from '../utils/api';
import { navigate } from '@reach/router';

class Post extends PureComponent {
  state = {
    title: '',
    body: '',
    topic: 'cooking',
    topics: []
  };

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics });
    });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const { loggedInAs } = this.props;
    api.postArticle(title, body, topic, loggedInAs).then(article_id => {
      navigate(`/a/${article_id}`);
      this.setState({
        title: '',
        body: ''
      });
    });
  };

  render() {
    const { loggedInAs } = this.props;
    const { title, body, topic, topics } = this.state;
    if (!loggedInAs) return <NotLoggedIn />;
    return (
      <>
        <h2>Post a new article</h2>
        <form onSubmit={this.handleSubmit} id="postArticle">
          <label htmlFor="title">
            Article title:
            <input type="text" name="title" id="title" placeholder="Add a title for your new article" value={title} onChange={this.handleChange} />
          </label>
          <label htmlFor="body">Article text:</label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            value={body}
            placeholder="Fill in the main body text of your article here"
            onChange={this.handleChange}
          ></textarea>
          <label htmlFor="topic">
            Choose topic:
            <select id="topic" value={topic} onChange={this.handleChange}>
              {topics.map(topic => (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Submit article</button>
        </form>
      </>
    );
  }
}

export default Post;
