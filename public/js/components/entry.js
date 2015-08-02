import React from 'react';
import FeedLink from 'public/js/components/feedlink';
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
    let footer = null;

    if (this.props.showFooter) {
      footer = (
        <div className='panel-footer'>
          <div className='row'>
            <div className='col-xs-12'>
              <span className='pull-left'>
                Likes: {this.state.likes}
                <button onClick={() => this.onLikeClick()} disabled={this.state.likedByUser}> Like </button>
              </span>
              <span className='pull-right'>
                <span>From </span>
                <FeedLink
                  feedId = {this.props.feedId}
                  feedTitle = {this.props.feedTitle}
                />
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className = 'panel panel-default'>
        <div className = 'panel-heading'>
          <div className="row">
            <div className="col-xs-6">
              <label className="pull-left">{this.props.authorName}</label>
            </div>
            <div className="col-xs-6">
              <label className="pull-right">{new Date(this.props.issued).toUTCString()}</label>
            </div>
          </div>
        </div>
        <div className='panel-body'>
          {this.props.content}
        </div>
        {footer}
      </div>
    );
  }
}

Entry.propTypes = {
  entryId: React.PropTypes.string,
  content: React.PropTypes.string,
  authorName : React.PropTypes.string,
  comments : React.PropTypes.array,
  tags : React.PropTypes.array,
  issued : React.PropTypes.string,
  feedId: React.PropTypes.string,
  feedTitle: React.PropTypes.string,
  showFooter: React.PropTypes.bool,
  likes: React.PropTypes.number,
  likedByUser: React.PropTypes.bool
}

Entry.defaultProps = {
  entryId: '',
  content: '',
  authorName : 'Default name',
  comments : 'Default comment',
  tags : [],
  issued : '',
  feedId: '',
  feedTitle: '',
  showFooter: false,
  likes: 0,
  likedByUser: false
}
