import React from 'react';
import FeedLink from 'public/js/components/feedlink';
import Avatar from 'public/js/components/avatar'
import Embed from 'public/js/components/embed';
import FollowLink from 'public/js/components/followlink';


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
      <div className="blog-post-item">
        <div className="timeline-entry rounded">
          <Avatar name={this.props.authorName} />
        </div>

        <h2>{this.props.authorName}</h2>

        <p>{this.props.content}</p>

        <figure className="margin-bottom-20">
         {embed}
        </figure>

        <ul className="blog-post-info list-inline">
          <li>
            <a href="#">
              <i className="fa fa-clock-o"></i>
              <span className="font-lato">{new Date(this.props.issued).toUTCString()}</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-comment-o"></i>
              <span className="font-lato">28 Comments</span>
            </a>
          </li>
          {feedOrigin}
          <li>
            <a href={'/pages/#/profiles/' + this.props.authorId}>
              <i className="fa fa-user"></i>
              <span className="font-lato">{this.props.authorName}</span>
            </a>
          </li>
        </ul>
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
