import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser, getMyPurchases, getMyCourses } from './ProfileFormActions'
import { getCourses } from '../ipfsupload/ipfsUploadActions'
import { getBalance, watchCourse } from '../loginbutton/LoginButtonActions'
import ipfs from '../../util/ipfs';
import { browserHistory } from 'react-router'

class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.data.name,
      about: this.props.user.data.about,
      image: this.props.user.data.image,
      userAddress: this.props.user.data.userAddress,
      balance: this.props.user.data.balance,
    }
  }

  componentDidMount() {
    this.props.dispatch(getMyPurchases(this.props.user.data.myPurchases));
    this.props.dispatch(getMyCourses(this.props.user.data.myCourses));
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

  watchCourse(){
    this.state.props.dispatch(watchCourse(this.result.index))
  }

  render() {
    return(
      <div>
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
          
        </form>
        <h1>My Purchases</h1>
        <div className="flex">
          {this.props.user.myPurchases.map(result => (

            <div className="text-center">
              <img src={'https://ipfs.io/ipfs/'+ result.image} width="320" height="240" />
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <button onClick={this.watchCourse.bind({state: this, result: result})}>Watch</button>
            </div>

          ))}
        </div>
        <h1>My Courses</h1>
        <div className="flex">
          {this.props.user.myCourses.map(result => (

            <div className="text-center">
              <img src={'https://ipfs.io/ipfs/'+ result.image} width="320" height="240" />
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <button onClick={this.watchCourse.bind({state: this, result: result})}>Watch</button>
            </div>

          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps )(ProfileForm)