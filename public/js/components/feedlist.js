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
              <div className="row">
                {
                  this.props.feeds.map(function(feed) {
                    return (
                      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                        <FeedLink
                          key={feed._id}
                          feedId={feed._id}
                          feedTitle= {feed.title}
                        />
                      </div>
                    );
                  })
                }
              </div>
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
