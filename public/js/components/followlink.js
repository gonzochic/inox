import React from 'react';

import RestApi from 'public/js/components/restapi';

export default class FollowLink extends React.Component {
  constructor(props) {
    super(props);
  }

  onFollowClick() {
    RestApi.postDataToUrl('/followers/' + this.props.followerId,
     {}, () => this.props.onFollowClick());
  }

  render() {

    var followLink = this.props.userIsFollowing ? (
      <span> Following </span>
    ) :
    (
      <button onClick={() => this.onFollowClick()}>Follow</button> 
    );

    return(
      <div>
        {followLink}
      </div>
    )
  }
}

FollowLink.propTypes = {
  followerId: React.PropTypes.string,
  userIsFollowing: React.PropTypes.bool,
  onFollowClick: React.PropTypes.func
}

FollowLink.defaultProps = {
  userIsFollowing: false
}
