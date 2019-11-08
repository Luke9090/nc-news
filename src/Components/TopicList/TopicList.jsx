import React, { PureComponent } from 'react';
import TopicCard from './TopicCard';
import * as api from '../../utils/api';
import Loading from '../Loading';

class TopicList extends PureComponent {
  state = {
    topics: [],
    isLoading: true
  };

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
    document.title = 'Topics - NC-News';
  }

  render() {
    const { topics, isLoading } = this.state;
    return (
      <>
        <h2>All topics</h2>
        {isLoading ? <Loading /> : topics.map(topic => {
          return <TopicCard topic={topic} key={topic.slug} />;
        })}
      </>
    );
  }
}

export default TopicList;
