import React, { Component } from 'react'
import IpfsUploadContainer from '../components/ipfsupload/ipfsUploadContainer'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Good to Go!</h1>
            <IpfsUploadContainer/>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
