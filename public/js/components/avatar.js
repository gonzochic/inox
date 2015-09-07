import React from 'react';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      width:this.props.size,
      height: this.props.size,
      marginRight: '5px'
    }

    return (
        <img
          alt={this.props.name}
          src={this.props.source}
          style={style}
        />
    );
  }

}

Avatar.propTypes = {
  size: React.PropTypes.string,
  source: React.PropTypes.string,
  name: React.PropTypes.string,
}

Avatar.defaultProps = {
  size: '20px',
  source: '/public/images/avatar2.jpg',
  name: 'Avatar',
}
