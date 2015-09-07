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
      <div>
        <section className="page-header dark page-header-xs">
  				<div className="container">

  					<h1>Overview</h1>
  					<span className="font-lato size-18 weight-300 hidden-xs">We believe in Simple &amp; Creative</span>

  					<ol className="breadcrumb">
  						<li><a href="#">Home</a></li>
  						<li className='active'><a href="#">Overview</a></li>
  					</ol>
  			  </div>
  			</section>
        <section>
          <div className='row'>
            <div className = 'col-sm-9'>
              <EntryList />
            </div>
            <div className = 'col-sm-3'>
              <FeedList feeds={this.state.feeds} />
            </div>
          </div>
        </section>
      </div>
    );
  }

}
