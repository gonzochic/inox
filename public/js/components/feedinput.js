import React from 'react';
import Embed from 'public/js/components/embed';
import RestApi from 'public/js/components/restapi';


export default class FeedInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      embed: {}
    };
  }

  onButtonClick() {
    this.props.onCommentSubmit(this.state.comment);
    this.setState({comment: ''});
  }

  onInputBlur() {
    var httpRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/ig;

    var linkInInput = httpRegex.exec(this.state.comment);

    if(linkInInput) {
      RestApi.getDataFromUrl('/embeds/' + encodeURIComponent(linkInInput[0]), (data) => {
        this.setState({embed: data});
      });
    }

  }

  render() {

    const embed = this.state.embed.title ?
    (
      <Embed
       title = {this.state.embed.title}
       description = {this.state.embed.description}
       html = {this.state.embed.html}
      />
    ) : null;

    return (
      <div className="row">
        <div className="col-xs-12">
          <textarea
            className={"form-control"}
            rows={"3"}
            value={this.state.comment}
            onChange={(event) => this.setState({comment: event.currentTarget.value})}
            onBlur = { this.onInputBlur.bind(this)}
          />
          {embed}
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
