import React, { Component } from 'react'
import { connect } from 'react-redux'

class Course extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="flex center">
        <div>
          <img src={'https://ipfs.io/ipfs/'+ this.props.course.image} width="320" height="240" />
          <h3>{this.props.course.title}</h3>
          <p>{this.props.course.description}</p>
          <video src={'https://ipfs.io/ipfs/'+ this.props.course.video} width="320" height="240" controls/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    course: state.user.course,
  }
}

export default connect( mapStateToProps )(Course)
