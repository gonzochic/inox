import React from 'react';
import { Link } from 'react-router';

export default class FeedLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <span className='label label-warning'>
        <Link
          to={"/entries/" + this.props.feedId}>
          {this.props.feedTitle}
        </Link>
      </span>
    );
  }
}

FeedLink.propTypes = {
  feedId: React.PropTypes.string,
  feedTitle: React.PropTypes.string
}
