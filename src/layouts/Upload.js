import React, { Component } from 'react'
import IpfsUpload from '../components/ipfsupload/ipfsUpload'

class Upload extends Component {
  render() {
    return(
      <div>
        <h1 className="text-center">Create Course</h1>
        <div className="flex center">
          <IpfsUpload/>
        </div>
      </div>
    )
  }
}

export default Upload
