import React, { Component } from 'react'
import { connect } from 'react-redux'

class Course extends Component {
  render() {
    return(
      <div className="flex center">
        <div>
          <img role="presentation" src={'https://ipfs.io/ipfs/'+ this.props.course.image} width="320" height="240" />
          <h1>{this.props.course.title}</h1>
          <p>{this.props.course.description}</p>
          <h3>Intro</h3>
          <video src={'https://ipfs.io/ipfs/'+ this.props.course.video} width="320" height="240" controls/>
          {Object.keys(this.props.course.lessons).map((key) => (
            <div>
              <h3>{this.props.course.lessons[key].title}</h3>
              <video src={'https://ipfs.io/ipfs/'+this.props.course.lessons[key].video} width="320" height="240" controls />
              <a href={'https://ipfs.io/ipfs/'+this.props.course.lessons[key].file} download />
            </div>
          ))}
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
