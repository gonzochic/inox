import React from 'react';

export default class FeedHeader extends React.Component {
  constructor(props) {
    super (props);
  }
  render() {
    return (
        <div>
          <h3>{this.props.feedName}</h3>
            <p>
              {this.props.description}
            </p>
            <h6>
              By {this.props.author}
            </h6>
        </div>
    )
  }
}
FeedHeader.propTypes = {
  feedName: React.PropTypes.string,
  author : React.PropTypes.string,
  description : React.PropTypes.string,
  tags : React.PropTypes.array
}
