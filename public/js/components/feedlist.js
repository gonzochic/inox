import React from 'react';
import FeedLink from 'public/js/components/feedlink';

export default class FeedList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="side-nav margin-bottom-60 margin-top-30">

        <div className="side-nav-head">
          <button className="fa fa-bars"></button>
          <h4>FEEDS</h4>
        </div>
        <ul className="list-group list-group-bordered list-group-noicon uppercase">
        {
          this.props.feeds.map(function(feed) {
            return (
              <FeedLink
                key={feed._id}
                feedId={feed._id}
                feedTitle={feed.title}
              />
            );
          })
        }
        </ul>
      </div>
    );
  }
}

FeedList.propTypes = {
  feeds: React.PropTypes.array
}

FeedList.defaultProps = {
  feeds: []
}
