import React from 'react';
import Overview from 'public/js/components/overview';
import Feed from 'public/js/components/feed';
import Navbar from 'public/js/components/navbar';
import Profile from 'public/js/components/profile';

import profileData from 'public/js/helper/profiledata'
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: '',
      profileId: ''
    };
  }

  componentWillMount() {
    profileData.fetchData(() => {
      this.setState({
        profileName: profileData.profile.username,
        profileId: profileData.profile._id
      })
    });
  }

  render() {
    return (
      <div id={'wrapper'}>
        <Navbar
          profileName={this.state.profileName}
          profileId = {this.state.profileId}
        />
        {this.props.children}
        <h6>Footer</h6>
      </div>
    );
  }
}

React.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="overview" component={Overview}/>
      <Route path="entries/:id" component={Feed}/>
      <Route path="profiles/:id" component={Profile} />
    </Route>
  </Router>
), document.getElementById('react-content'));
