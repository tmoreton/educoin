import React, { Component } from 'react'
import ProfileForm from '../components/profileform/ProfileForm'
import LogoutButton from '../components/logoutbutton/LogoutButton'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="flex center">
        <div>
          <h1>Profile</h1>
          <p>Edit your account details here.</p>
          <ProfileForm />
          <LogoutButton />
        </div>
      </div>
    )
  }
}

export default Profile
