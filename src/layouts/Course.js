import React, { Component } from 'react'
import { connect } from 'react-redux'

class Course extends Component {
  render() {
    return(
      <div className="flex center">
        <div className="text-center" style={{ maxWidth: 550 }} >
          <img role="presentation" src={'https://ipfs.io/ipfs/'+ this.props.course.image} />
          <h4>{this.props.course.title}</h4>
          <p>{this.props.course.description}</p>
          <hr/>
          <h3>Course Intro</h3>
          <video src={'https://ipfs.io/ipfs/'+ this.props.course.video} controls/>
          {Object.keys(this.props.course.lessons).map((key) => (
            <div>
              <hr/>
              <h4>{this.props.course.lessons[key].title}</h4>
              <video src={'https://ipfs.io/ipfs/' + this.props.course.lessons[key].video} controls />
              <a href={'https://ipfs.io/ipfs/' + this.props.course.lessons[key].file} download >
                <button>Lesson Files</button>
              </a>
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
