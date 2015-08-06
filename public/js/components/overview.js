import React from 'react';
import RestApi from 'public/js/components/restapi';
import Entry from 'public/js/components/entry';
import FeedList from 'public/js/components/feedlist';
import profileData from 'public/js/helper/profiledata';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      feeds: [],
      profileData: {}
    };
  }

  componentWillMount() {
    RestApi.getDataFromUrl('/feeds',
      (data) => this.setState({feeds: data}));

    RestApi.getDataFromUrl('/entries',
      (data) => this.setState({entries: data }));
  }

  render() {
    return (
      <div className='col-xs-12'>
        <h1>Overview</h1>
        <FeedList feeds={this.state.feeds} />
        {this.state.entries.map(function(entry) {
          const numberOfLikes = entry.likes.length;
          const likedByUser = entry.likes.indexOf(profileData.profile._id) > -1

          return (
            <Entry
              ref={"entry" + entry._id}
              key={new Date(entry.issued).getTime()}
              entryId = {entry._id}
              content={entry.content}
              embed = {entry.embed}
              authorId= {entry.author}
              authorName = {entry.authorName}
              comments = {entry.comments}
              tags = {entry.tags}
              issued = {entry.issued}
              showFeedOrigin = {true}
              feedId = {entry.feed}
              feedTitle = {entry.feedName}
              likes = {numberOfLikes}
              likedByUser = {likedByUser}
            />
          );
        })}
      </div>
    );
  }

}
