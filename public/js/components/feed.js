import React from 'react';
import RestApi from 'public/js/components/restapi';
import Entry from 'public/js/components/entry';
import FeedInput from 'public/js/components/feedinput';
import FeedHeader from 'public/js/components/feedheader';

import profileData from 'public/js/helper/profiledata'

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.feedId = '';
    this.state = {
        entries: [],
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

  getEntries() {
    RestApi.getDataFromUrl('/entries/' + this.feedId,
    (data) => this.setState({entries: data }));
  }

  getFeedInformation() {
    RestApi.getDataFromUrl('/feeds/' + this.feedId,
      (data) => this.setState({feed: data}));
  }

  componentWillMount() {
    this.feedId = this.props.params.id;
    this.getFeedInformation();
    this.getEntries();
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
    }, () => this.getEntries());
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

        {this.state.entries.map(function(entry) {
          const numberOfLikes = entry.likes.length;
          const likedByUser = entry.likes.indexOf(profileData.profile._id) > -1
          return (
            <Entry
              ref={"entry" + entry._id}
              key={new Date(entry.issued).getTime()}
              content={entry.content}
              embed={entry.embed}
              authorId= {entry.author}
              authorName = {entry.authorName}
              comments = {entry.comments}
              tags = {entry.tags}
              issued = {entry.issued}
              likes = {numberOfLikes}
              likedByUser = {likedByUser}
            />
          );
        })}
      </div>
    )
  }
}
