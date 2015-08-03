import React from 'react';

export default class Embed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className = 'col-xs-12 well'>
          <h3> {this.props.title} </h3>
          <p> {this.props.description} </p>
          <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
        </div>
    );
  }

}

Embed.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  html: React.PropTypes.string,
}

Embed.defaultProps = {
  title: '',
  description: '',
  html: '',
}
