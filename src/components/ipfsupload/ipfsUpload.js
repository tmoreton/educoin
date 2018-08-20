import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCourse } from './ipfsUploadActions'
import ipfs from '../../util/ipfs';

class ipfsUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      image: '',
      video: '',
      courses: [{ title:'', video:'' }]
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

  updateDescription = (event) => {
    event.preventDefault()
    this.setState({description: event.target.value})
  };

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(
      addCourse(
        this.state.title, 
        this.state.description, 
        this.state.image, 
        this.state.video,
        this.state.courses
      )
    )
  }

  updateCourseTitle(event) {
    event.preventDefault()
    var courses = this.self.state.courses
    var key = parseInt(this.key)
    courses[key].title = event.target.value
    this.self.setState({courses: courses})
  };

  uploadCourseVideo(event) {
    event.preventDefault()
    var courses = this.self.state.courses
    var key = parseInt(this.key)

    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result);
      ipfs.add(buffer, (err, ipfsHash) => {
        courses[key].video = ipfsHash[0].hash
        this.self.setState({ courses: courses })
      })
    }    
  };

  addClass(){
    event.preventDefault()
    var courses = this.state.courses
    courses.push({ title:'', video:'' })
    this.setState({courses: courses})
  }

  render() {
    return(
      <div>

        <div>
          <label>Course Title</label>
          <input type="text" onChange={this.updateName} />
        </div>  

        <div>
          <label>Course Description</label>
          <textarea type="text"  maxLength="200" onChange={this.updateDescription} />
        </div>  

        <div>
          <label>Course Image</label>
          <img src={'https://ipfs.io/ipfs/'+ this.state.image} width="320" height="240" />
          <input accept="image/png, image/jpeg" type="file" onChange={this.uploadImage} />
        </div>

        <div>
          <label>Intro Video</label>
          <video src={'https://ipfs.io/ipfs/'+this.state.video} width="320" height="240" controls />
          <input accept="video/mp4,video/x-m4v,video/*"  type="file" onChange={this.uploadVideo} />
        </div>     

        {Object.keys(this.state.courses).map((key) => (
          <div>
            <div>
              <label>Course Title</label>
              <input type="text" value={this.state.courses[key].title} onChange={this.updateCourseTitle.bind({ self: this, key: key })} />
            </div>  
            <div>
              <video src={'https://ipfs.io/ipfs/'+this.state.courses[key].video} width="320" height="240" controls />
              <input accept="video/mp4,video/x-m4v,video/*"  type="file" onChange={this.uploadCourseVideo.bind({ self: this, key: key })} />
            </div> 
          </div>
        ))}
        
        <button onClick={this.addClass.bind(this)}>Add Class</button>
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(ipfsUpload)