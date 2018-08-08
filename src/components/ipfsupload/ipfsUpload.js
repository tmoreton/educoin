import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCourse } from './ipfsUploadActions'
import ipfs from '../../util/ipfs';

class ipfsUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      name: '',
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)    
  };

  updateName = (event) => {
    event.preventDefault()
    this.setState({name: event.target.value})
  };

  convertToBuffer = async(reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    
    ipfs.add(buffer, (err, ipfsHash) => {
      this.setState({file: ipfsHash[0].hash});
    })
  };

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(addCourse(this.state.name, this.state.file))
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <video src={'https://ipfs.io/ipfs/'+this.state.file} width="320" height="240" controls />
        <input type="file" onChange={this.captureFile} />
        <p>{this.state.name}</p>
        <input type="text" onChange={this.updateName} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(ipfsUpload)