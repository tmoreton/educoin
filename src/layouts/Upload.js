import React, { Component } from 'react'
import IpfsUpload from '../components/ipfsupload/ipfsUpload'

class Upload extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Upload Videos</h1>
            <IpfsUpload/>
          </div>
        </div>
      </main>
    )
  }
}

export default Upload
