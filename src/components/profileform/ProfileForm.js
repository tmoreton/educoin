import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from './ProfileFormActions'
import { getCourses } from '../ipfsupload/ipfsUploadActions'
import { getBalance } from '../loginbutton/LoginButtonActions'
import ipfs from '../../util/ipfs';

class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name,
      about: this.props.user.about,
      image: this.props.user.image,
      userAddress: this.props.user.userAddress,
      balance: this.props.user.balance,
      courses: this.props.user.courses
    }
  }

  componentDidMount() {
    this.props.dispatch(getCourses(this.props.user.userAddress))
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
    this.props.dispatch(updateUser(this.state.name, this.state.about, this.state.image))
  }

  render() {
    return(
      <form className="flex center" onSubmit={this.handleSubmit.bind(this)}>

        <div>
          <img src={'https://ipfs.io/ipfs/'+ this.state.image} width="150" height="150" />
          <input accept="image/png, image/jpeg" type="file" onChange={this.uploadImage} />
          <input type="text" value={this.state.name} onChange={this.updateName} />
          <textarea type="text"  value={this.state.about} maxLength="200" onChange={this.updateAbout} />
          <p>Token Balance: {this.state.balance} EDU</p>
          <p>Token Address: {this.state.userAddress}</p>
        </div>

        <button type="submit">Update</button>

        <div>
          <h1>My Courses</h1>
          {this.props.ipfs.myCourses.map(result => (

            <div key={result.index.toNumber()} className="text-center">
              <img src={'https://ipfs.io/ipfs/'+ result.image} width="320" height="240" />
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <button>Watch</button>
            </div>

          ))}
        </div>
        
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.data,
    ipfs: state.ipfs
  }
}

export default connect( mapStateToProps )(ProfileForm)