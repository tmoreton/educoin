import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButton from './components/loginbutton/LoginButton'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faUpload, faUser)

// Styles
import './styles.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <Link to="/upload">
          <FontAwesomeIcon icon="upload" />
        </Link>
        <Link to="/profile">
          <FontAwesomeIcon icon="user" />
        </Link>
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div>
        <Link to="/signup">
          <FontAwesomeIcon icon="upload" />
        </Link>
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
