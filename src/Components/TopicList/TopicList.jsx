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
  }

  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return topics.map(topic => {
      return <TopicCard topic={topic} key={topic.slug} />;
    });
  }
}

export default TopicList;
