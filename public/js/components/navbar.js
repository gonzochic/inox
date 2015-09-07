import React from 'react';
import Avatar from 'public/js/components/avatar'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header" className="sticky clearfix header-md">
        <header id="topNav">
          <div className="container">
            <button className="btn btn-mobile" data-toggle="collapse" data-target=".nav-main-collapse">
              <i className="fa fa-bars"></i>
            </button>

            <a className="logo pull-left" href="/pages/#/overview">
              INOX
            </a>

            <div className="navbar-collapse pull-right nav-main-collapse collapse submenu-dark">
							<nav className="nav-main">
								<ul id="topMain" className="nav nav-pills nav-main">
									<li>
                    <a href={"/pages/#/profiles/" + this.props.profileId}>
                      <Avatar name={this.props.profileName} />
                      {this.props.profileName}
                    </a>
                  </li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </header>
      </div>
    )
  }
}

Navbar.propTypes = {
  profileName : React.PropTypes.string,
  profileId: React.PropTypes.string
}
