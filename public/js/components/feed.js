import React from 'react';


import EntryList from 'public/js/components/entrylist';
import FeedHeader from 'public/js/components/feedheader';
import FeedInput from 'public/js/components/feedinput';

import profileData from 'public/js/helper/profiledata';
import RestApi from 'public/js/components/restapi';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.feedId = '';
    this.state = {
        feed:{},
        profileName: '',
        profileId: ''
      };
  }

  getProfile() {
    this.setState({
        profileName: profileData.profile.username,
        profileId: profileData.profile._id
      });
  }

  getFeedInformation() {
    RestApi.getDataFromUrl('/feeds/' + this.feedId,
      (data) => this.setState({feed: data}));
  }

  componentWillMount() {
    this.feedId = this.props.params.id;
    this.getFeedInformation();
    this.getProfile();
  }

  onCommentSubmit(commentData) {
    RestApi.postDataToUrl('/entries/' + this.feedId, {
      content: commentData.comment,
      embed: commentData.embed,
      feedId: this.feedId,
      feedName: this.state.feed.title,
      author: this.state.profileId,
      authorName: this.state.profileName
    }, () => console.log("Here we should reload new entries"));
  }

  render() {
    return (
      <div className="col-xs-12">

        <FeedHeader
          feedName={this.state.feed.title}
          author = {this.state.feed.authorName}
          description = {this.state.feed.description}
          tags = {this.state.feed.tags}
        />

        <FeedInput
          onCommentSubmit={this.onCommentSubmit.bind(this)}
        />

        <EntryList
          restEndpoint={'/entries/' + this.feedId}
          showFeedOrigin = {false}
        />
      </div>
    )
  }
}
