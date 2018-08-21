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
      courses: []
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


  uploadFile(event) {
    event.preventDefault()
    var courses = this.self.state.courses
    var key = parseInt(this.key)

    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result);
      ipfs.add(buffer, (err, ipfsHash) => {
        courses[key].file = ipfsHash[0].hash
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


  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(
      addCourse(
        this.state.title, 
        this.state.description, 
        this.state.image, 
        this.state.video,
        JSON.stringify(this.state.courses)
      )
    )
  }

  render() {
    return(
      <div  style={{ maxWidth: 550 }}>
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
          <img src={'https://ipfs.io/ipfs/'+ this.state.image} />
          <input accept="image/png, image/jpeg" type="file" onChange={this.uploadImage} />
        </div>

        <div>
          <label>Intro Video</label>
          <video src={'https://ipfs.io/ipfs/'+this.state.video} controls />
          <input accept="video/mp4,video/x-m4v,video/*"  type="file" onChange={this.uploadVideo} />
        </div>     

        {Object.keys(this.state.courses).map((key) => (
          <div>
            <hr/>
            <div>
              <label>{'Lesson ' + key}</label>
              <input type="text" placeholder="Lesson Title Here" value={this.state.courses[key].title} onChange={this.updateCourseTitle.bind({ self: this, key: key })} />
            </div>  

            <div>
              <video src={'https://ipfs.io/ipfs/'+this.state.courses[key].video} controls />
              <input accept="video/mp4,video/x-m4v,video/*"  type="file" onChange={this.uploadCourseVideo.bind({ self: this, key: key })} />
            </div>

            <div>
              <label>File Upload <small>(zip file)</small></label>
              <input accept=".zip"  type="file" onChange={this.uploadFile.bind({ self: this, key: key })} />
            </div>

          </div>
        ))}

        <button className="button-outline" onClick={this.addClass.bind(this)}>Add Class</button>
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(ipfsUpload)