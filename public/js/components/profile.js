import React from 'react';
import RestApi from 'public/js/components/restapi';

export default class Profile extends React.Component {
  constructor() {
    super()
  }

  getProfile() {
    RestApi.getDataFromUrl('/profiles/' + this.props.params.id,
      (data) => console.log(data));
  }

  componentWillMount() {
    this.getProfile();
  }

  render() {
    return <h3> Profile </h3>;
  }
}
