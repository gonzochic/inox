import React from 'react';

import EntryList from 'public/js/components/entrylist';
import FeedList from 'public/js/components/feedlist';

import RestApi from 'public/js/components/restapi';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.lastEntryId = '';
    this.state = {
      feeds: []
    };
  }

  componentWillMount() {

    RestApi.getDataFromUrl('/feeds',
      (data) => this.setState({feeds: data}));

  }

  render() {

    return (
      <div className='col-xs-12'>
        <h1>Overview</h1>
        <FeedList feeds={this.state.feeds} />
        <EntryList />

      </div>
    );
  }

}
