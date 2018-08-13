import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCourses, purchaseCourse } from '../components/ipfsupload/ipfsUploadActions'
import { loginUser } from '../components/loginbutton/LoginButtonActions'
import getWeb3 from '../util/getWeb3'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    // Initialize web3 and set in Redux.
    getWeb3
      .then(results => {
        console.log('Web3 initialized!')
        this.props.dispatch(getCourses())
        // this.props.dispatch(loginUser())        
      })
      .catch(() => {
        console.log('Error in web3 initialization.')
      })
  }

  buyButton = () => {
    
    this.props.dispatch(purchaseCourse("0xa267863bce691917df94fc3141ec11fdd6e82253", 100))
  }

  render() {
    return(
      <div>
        <h1 className="text-center">Home</h1>
        <div className="flex center">
          {this.props.ipfs.courses.map(result => (

            <div className="text-center">
              <img src={'https://ipfs.io/ipfs/'+ result.image} width="320" height="240" />
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <button onClick={this.buyButton}>Buy Course</button>
            </div>

          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ipfs: state.ipfs,
  }
}

export default connect( mapStateToProps )(Home)