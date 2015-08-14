import React from 'react';
import FeedLink from 'public/js/components/feedlink';
import Avatar from 'public/js/components/avatar'
import Embed from 'public/js/components/embed';
import FollowLink from 'public/js/components/followLink';


import RestApi from 'public/js/components/restapi';
import profileData from 'public/js/helper/profiledata';


export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes,
      likedByUser: this.props.likedByUser
    }
  }

  onLikeClick() {
    RestApi.putDataToUrl('/entries/'+ this.props.entryId + '/likes', {}, (data) => {
      this.setState(data);
    });
  }

  render() {
    let feedOrigin = null;

    if (this.props.showFeedOrigin) {
      feedOrigin = (
        <span className='pull-right'>
          <span>From </span>
          <FeedLink
            feedId = {this.props.feedId}
            feedTitle = {this.props.feedTitle}
          />
        </span>
      );
    }

    const embed = this.props.embed.title ? (
      <Embed
        title = {this.props.embed.title}
        description = {this.props.embed.description}
        html = {this.props.embed.html}
        thumbnail = {this.props.embed.thumbnail_url}
        url = {this.props.embed.url}
        loading = {false}
      />
      ) : null;

    return (
      <div className = 'panel panel-default'>
        <div className = 'panel-heading'>
          <div className="row">
            <div className="col-xs-6">
              <label className="pull-left">
                <a href = {'/pages/#/profiles/' + this.props.authorId}>
                  <Avatar name={this.props.authorName} />
                  {this.props.authorName}
                </a>
                <FollowLink
                  followerId={this.props.authorId}
                  userIsFollowing = {this.props.userIsFollowing}
                  onFollowClick = {this.props.onFollowClick}
                />
              </label>
            </div>
            <div className="col-xs-6">
              <label className="pull-right">{new Date(this.props.issued).toUTCString()}</label>
            </div>
          </div>
        </div>
        <div className='panel-body'>
          {this.props.content}
          {embed}
        </div>
        <div className='panel-footer'>
          <div className='row'>
            <div className='col-xs-12'>
              <span className='pull-left'>
                Likes: {this.state.likes}
                <button onClick={() => this.onLikeClick()} disabled={this.state.likedByUser}> Like </button>
              </span>
              {feedOrigin}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  entryId: React.PropTypes.string,
  content: React.PropTypes.string,
  authorId: React.PropTypes.string,
  authorName : React.PropTypes.string,
  comments : React.PropTypes.array,
  tags : React.PropTypes.array,
  issued : React.PropTypes.string,
  feedId: React.PropTypes.string,
  feedTitle: React.PropTypes.string,
  showFeedOrigin: React.PropTypes.bool,
  likes: React.PropTypes.number,
  likedByUser: React.PropTypes.bool,
  embed: React.PropTypes.object,
  userIsFollowing: React.PropTypes.bool,
  onFollowClick: React.PropTypes.func
}

Entry.defaultProps = {
  entryId: '',
  content: '',
  authorId: '',
  authorName : 'Default name',
  comments : 'Default comment',
  tags : [],
  issued : '',
  feedId: '',
  feedTitle: '',
  showFeedOrigin: false,
  likes: 0,
  likedByUser: false,
  embed: {}
}
