import React, { Component } from 'react'
import { connect } from 'react-redux'

class Course extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.course)
  }

  render() {
    return(
      <div className="flex flex-6 center">
        <div>
          <img src={'https://ipfs.io/ipfs/'+ this.props.course.image} width="100%" height="240" />
          <h3>{this.props.course.title}</h3>
          <p>{this.props.course.description}</p>
          <video src={'https://ipfs.io/ipfs/'+ this.props.course.video}/>
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
