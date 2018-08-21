import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCourses } from '../components/ipfsupload/ipfsUploadActions'
import { purchaseCourse } from '../components/loginbutton/LoginButtonActions'
import getWeb3 from '../util/getWeb3'

class Home extends Component {

  componentDidMount(){
    // Initialize web3 and set in Redux.
    getWeb3
      .then(results => {
        console.log('Web3 initialized!')
        this.props.dispatch(getCourses())
      })
      .catch(() => {
        console.log('Error in web3 initialization.')
      })
  }

  buyButton() {
    this.state.props.dispatch(
      purchaseCourse(
        this.result.userAddress, 
        100, 
        this.result.index.toNumber()
      )
    )
  }

  render() {
    return(
      <div>
        <h1 className="text-center">Home</h1>
        <div className="flex center">
          {this.props.ipfs.courses.map(result => (

            <div className="text-center">
              <img role="presentation" src={'https://ipfs.io/ipfs/'+ result.image} width="320" height="240" />
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <button onClick={this.buyButton.bind({state: this, result: result})}>Buy Course</button>
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