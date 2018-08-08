import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButton from './components/loginbutton/LoginButton'
import LogoutButton from './components/logoutbutton/LogoutButton'

// Styles
import './styles.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <Link to="/upload">Upload</Link>
        <Link to="/profile">Profile</Link>
        <LogoutButton />
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div>
        <Link to="/signup">Sign Up</Link>
        <LoginButton />
      </div>
    )

    return (
      <div>
        <nav className="flex center nav">
          <Link to="/">EduCoin</Link>
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
