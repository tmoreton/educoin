import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCourses } from '../components/ipfsupload/ipfsUploadActions'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.dispatch(getCourses(this.props.ipfs))
  }


  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Home</h1>
            {this.props.ipfs.courses.map(result => (

              <div>
                <p>{result.title}</p>
                <img src={'https://ipfs.io/ipfs/'+ result.image} width="320" height="240" />
              </div>
 
            ))}
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ipfs: state.ipfs,
  }
}

export default connect( mapStateToProps )(Home)