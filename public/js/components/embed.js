import React from 'react';
import AjaxLoader from 'public/js/components/ajaxloader';

export default class Embed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const loadingIndication = this.props.loading ? <AjaxLoader /> : null;

    const wellStyle = {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '20px'
    };

    const thumbnailStyle = {
      width: '100%'
    }

    return (
        <div className = 'row well' style={wellStyle}>
          {loadingIndication}
          <div className= 'col-sm-3'>
            <img
              src={this.props.thumbnail}
              style = {thumbnailStyle}
            />
          </div>
          <div className= 'col-sm-9'>
            <h3> 
              <a href={this.props.url} target='_blank'>
              {this.props.title} 
              </a>
            </h3>
            <p> {this.props.description} </p>
            <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
          </div>
          
        </div>
    );
  }

}

Embed.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  html: React.PropTypes.string,
  thumbnail: React.PropTypes.string,
  url: React.PropTypes.string,
  loading: React.PropTypes.bool
}

Embed.defaultProps = {
  title: '',
  description: '',
  html: '',
  loading: true,
}
