import React, { Component } from 'react'
import IpfsUpload from '../components/ipfsupload/ipfsUpload'

class Upload extends Component {
  render() {
    return(
      <div>
        <h3 className="text-center">Create Course</h3>
        <div className="flex center">
          <IpfsUpload/>
        </div>
      </div>
    )
  }
}

export default Upload
