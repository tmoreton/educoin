import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from './ProfileFormActions'
import { getCourses } from '../ipfsupload/ipfsUploadActions'

class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name
    }
  }

  componentDidMount() {
    this.props.dispatch(getCourses())
  }
  
  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2) {
      return alert('Please fill in your name.')
    }

    this.props.dispatch(updateUser(this.state.name))
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
        <button type="submit">Update</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.user.data.name
  }
}

export default connect( mapStateToProps )(ProfileForm)