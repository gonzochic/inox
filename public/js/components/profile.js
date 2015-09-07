import React from 'react';
import RestApi from 'public/js/components/restapi';

export default class Profile extends React.Component {
  constructor() {
    super()
    this.state = {follows: []};
  }

  getProfile() {
    RestApi.getDataFromUrl('/profiles/' + this.props.params.id,
      (data) => console.log(data));

    RestApi.getDataFromUrl('/follows/' + this.props.params.id + '/details',
      (data) => this.setState({follows: data}));

  }

  componentWillReceiveProps() {
    console.log("props");
  }
  componentWillMount() {
    console.log("Mount");
    this.getProfile();
  }

  drawFollows() {
    return(
      <div className='panel panel-default'>
        <div className='panel-heading'>
          Follows
        </div>
        <div className='panel-body'>
          <div className='row'>
          {
            this.state.follows.map((follow) => {
              return (
                <div className="col-sm-6 col-md-4 col-lg-2">
                  <a onClick={() => this.getProfile()} href={'/pages/#/profiles/' + follow._id} className="thumbnail">
                    <img src={'/' + follow.profile.avatar} alt={follow.local.username}/>
                    <div className="caption text-center">
                      <h3>{follow.local.username}</h3>
                    </div>
                  </a>
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    );

  }

  render() {
    return (
      <div>
        {this.drawFollows()}
      </div>
    );
  }
}
