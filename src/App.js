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
      <div className="nav">
        <Link to="/upload">
          <FontAwesomeIcon size="2x" color="#03a87c" icon="upload" />
        </Link>
        <Link to="/">
          <h1 className="site-title">EduCoin</h1>
        </Link>
        <Link to="/profile">
          <FontAwesomeIcon size="2x" color="#03a87c" icon="user" />
        </Link>
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div className="nav">
        <Link to="/signup">
          <FontAwesomeIcon size="2x" color="#03a87c" icon="upload" />
        </Link>
        <Link to="/">
          <h1 className="site-title">EduCoin</h1>
        </Link>
        <LoginButton />
      </div>
    )

    return (
      <div>
        <nav>
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
