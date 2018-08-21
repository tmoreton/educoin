import React, { Component } from 'react'
import ProfileForm from '../components/profileform/ProfileForm'


class Profile extends Component {
  render() {
    return(
      <div className="flex center">
        <div>
          <h3 className="text-center">My Profile</h3>
          <ProfileForm />
        </div>
      </div>
    )
  }
}

export default Profile
