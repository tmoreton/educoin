import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './components/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './components/logoutbutton/LogoutButtonContainer'

// Styles
import './styles.css'
import store from './store'
class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <LogoutButtonContainer />
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div>
        <Link to="/signup">Sign Up</Link>
        <LoginButtonContainer />
      </div>
    )

    return (
      <div>
        <nav className="flex center nav">
          <Link to="/">Truffle Box</Link>
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
