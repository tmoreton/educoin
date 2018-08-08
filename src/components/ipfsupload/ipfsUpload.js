import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCourse } from './ipfsUploadActions'
import ipfs from '../../util/ipfs';

class ipfsUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      image: '',
      video: ''
    }
  }

  uploadImage = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result);
      ipfs.add(buffer, (err, ipfsHash) => {
        this.setState({image: ipfsHash[0].hash});
      })
    }    
  };

  uploadVideo = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result);
      ipfs.add(buffer, (err, ipfsHash) => {
        this.setState({video: ipfsHash[0].hash});
      })
    }    
  };

  updateName = (event) => {
    event.preventDefault()
    this.setState({title: event.target.value})
  };

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(addCourse(this.state.title, this.state.image, this.state.video))
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>

        <div>
          <label for="course-title">Course Title</label>
          <input type="text" class="course-title" onChange={this.updateName} />
        </div>  

        <div>
          <label for="course-image">Upload Thumbnail Image</label>
          <img src={'https://ipfs.io/ipfs/'+ this.state.image} width="320" height="240" />
          <input accept="image/png, image/jpeg" type="file" class="course-image" onChange={this.uploadImage} />
        </div>

        <div>
          <label for="course-video">Upload Video</label>
          <video src={'https://ipfs.io/ipfs/'+this.state.video} width="320" height="240" controls />
          <input accept="video/mp4,video/x-m4v,video/*"  type="file" class="course-video" onChange={this.uploadVideo} />
        </div>     
        
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(ipfsUpload)