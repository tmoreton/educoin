import React, { Component } from 'react'

class ipfsUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buffer: ''
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)    
  };

  convertToBuffer = async(reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({buffer});
  };

  handleSubmit(event) {
    event.preventDefault()
    this.props.ipfsUploadSubmit(this.state.buffer)
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="file" onChange={this.captureFile} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default ipfsUpload