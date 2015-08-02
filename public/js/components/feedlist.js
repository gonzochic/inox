import React from 'react';
import FeedLink from 'public/js/components/feedlink';

export default class FeedList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <div className="panel panel-default">
            <div className="panel-body">
              {
                this.props.feeds.map(function(feed) {
                  return (
                    <FeedLink
                      //ref={feed._id}
                      feedId={feed._id}
                      feedTitle= {feed.title}
                    />
                  );
                })
              }
            </div>
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
