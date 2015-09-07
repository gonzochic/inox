import React from 'react';

import AjaxLoader from 'public/js/components/ajaxloader';
import Entry from 'public/js/components/entry';

import profileData from 'public/js/helper/profiledata';
import RestApi from 'public/js/components/restapi';

export default class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.firstEntryId = '';
    this.lastEntryId = '';
    this.state = {
      entries: [],
      showLoader: false,
      followsOfUser: [],
    };
  }

  fetchFollows() {
    RestApi.getDataFromUrl('/follows',
      (follows) => {
        this.setState({followsOfUser:follows});
      }
    )
  }

  fetchNewerEntries() {
    this.setState({showLoader: true});
    RestApi.getDataFromUrl(this.props.restEndpoint + '/newer/' + this.firstEntryId,
      (data) => {
        if (data.length < 1) {
          this.setState({showLoader:false});
          return;
        }

        this.firstEntryId = data[0]._id;
        this.setState({
          entries: data.concat(this.state.entries),
          showLoader: false
        });
    });

  }

  fetchEntries() {
    RestApi.getDataFromUrl(this.props.restEndpoint,
      (data) => {
        this.setState({
          entries: data,
          showLoader: false,
        })

        if (data.length  < 1) {
          return;
        }

        this.firstEntryId = data[0]._id;
        this.lastEntryId = data[data.length-1]._id;

    });
  }

  fetchAdditionalEntries() {
    this.setState({showLoader: true});
    RestApi.getDataFromUrl(this.props.restEndpoint + '/older/' + this.lastEntryId,
      (data) => {
        if (data.length < 1) {
          this.setState({showLoader:false});
          return;
        }

        this.lastEntryId = data[data.length-1]._id;
        this.setState({
          entries: this.state.entries.concat(data),
          showLoader: false
        });
    });
  }

  onScroll() {
    if( $(window).scrollTop() >= $(document).height() - $(window).height() && $(window).scrollTop() > 100) {
        if(!this.state.showLoader) {
          this.fetchAdditionalEntries();
        }
    }
  }

  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  componentDidMount() {
    this.setState({showLoader: true});
    this.fetchEntries();
    this.fetchFollows();
    $(window).on('scroll', this.onScroll.bind(this));
  }

  render() {
    const loader = this.state.showLoader ? <AjaxLoader /> : null;
    return (
					<div className="timeline">
						<div className="timeline-hline">
            </div>
            {this.state.entries.map((entry) => {
              const numberOfLikes = entry.likes.length;
              const likedByUser = entry.likes.indexOf(profileData.profile._id) > -1;
              const userIsFollowing = this.state.followsOfUser.indexOf(entry.author) > -1;

              return (
                <Entry
                key={entry._id}
                entryId = {entry._id}
                content={entry.content}
                embed = {entry.embed}
                authorId= {entry.author}
                authorName = {entry.authorName}
                comments = {entry.comments}
                tags = {entry.tags}
                issued = {entry.issued}
                showFeedOrigin = {this.props.showFeedOrigin}
                feedId = {entry.feed}
                feedTitle = {entry.feedName}
                likes = {numberOfLikes}
                likedByUser = {likedByUser}
                userIsFollowing = {userIsFollowing}
                onFollowClick = {() => this.fetchFollows()}
                />
              );
            })}
            {loader}
          </div>
        )

  }
}

EntryList.propTypes = {
  restEndpoint: React.PropTypes.string,
  showFeedOrigin: React.PropTypes.bool
}

EntryList.defaultProps = {
  restEndpoint: '/entries',
  showFeedOrigin: true
}
