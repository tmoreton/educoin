import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUpUser } from './SignUpFormActions'
import ipfs from '../../util/ipfs';

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      about: '',
      image: '',
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

  updateName = (event) => {
    event.preventDefault()
    this.setState({name: event.target.value})
  };

  updateAbout = (event) => {
    event.preventDefault()
    this.setState({about: event.target.value})
  };

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(signUpUser(this.state.name, this.state.about, this.state.image))
  }

  render() {
    return(
      <form  className="text-center" style={{ maxWidth: 450 }} onSubmit={this.handleSubmit.bind(this)}>

        <div>
          <label>Profile Pic</label>
          <img className="profile-img" role="presentation" src={'https://ipfs.io/ipfs/'+ this.state.image} />
          <input accept="image/png, image/jpeg" type="file" onChange={this.uploadImage} />
        </div>

        <div>
          <label>Your Name</label>
          <input type="text" value={this.state.name} onChange={this.updateName} />
        </div>  

        <div>
          <label>About Me</label>
          <textarea type="text"  value={this.state.about} maxLength="200" onChange={this.updateAbout} />
          <small>We have got your wallet information, simply input your name and your account is made!</small>
        </div>  

        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(SignUpForm)