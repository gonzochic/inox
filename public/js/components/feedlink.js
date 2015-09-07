import React from 'react';
import { Link } from 'react-router';

export default class FeedLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li className="list-group-item">
        <Link
          to={"/entries/" + this.props.feedId}>
          <span className="size-11 text-muted pull-right">
            {(0)}
          </span>
          {this.props.feedTitle}
        </Link>
      </li>
    );
  }
}

FeedLink.propTypes = {
  feedId: React.PropTypes.string,
  feedTitle: React.PropTypes.string
}
