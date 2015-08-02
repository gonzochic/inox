import React from 'react';

export default class FeedInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {comment: ''};
  }

  onButtonClick() {
    this.props.onCommentSubmit(this.state.comment);
    this.setState({comment: ''});
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <textarea
            className={"form-control"}
            rows={"3"}
            value={this.state.comment}
            onChange={(event) => this.setState({comment: event.currentTarget.value})}
          />
          <button
            className={"btn btn-default pull-right"}
            type={"submit"}
            onClick = {this.onButtonClick.bind(this)}>
              Post
          </button>
        </div>
      </div>
    )
  }
}
FeedInput.propTypes = {
  onCommentSubmit : React.PropTypes.func
}
