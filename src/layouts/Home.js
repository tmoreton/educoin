import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCourses } from '../components/ipfsupload/ipfsUploadActions'
import { purchaseCourse } from '../components/loginbutton/LoginButtonActions'
import getWeb3 from '../util/getWeb3'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      preview: ''
    };
  }

  componentDidMount(){
    // Initialize web3 and set in Redux.
    getWeb3.then(results => {
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

  showModal(){
    this.state.setState({
      showModal: true,
      preview: this.result.video
    })
  }

  closeModal(){
    this.setState({showModal: false})
  }

  modal(){
    if(this.state.showModal){
      return (
        <div className="modal">
          <div className="modal-content">
            <video src={ "https://ipfs.io/ipfs/" + this.state.preview } controls />
            <button onClick={() => this.closeModal()}>Close</button>
          </div>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <div className="flex center">
          {this.props.ipfs.courses.map(result => (
            <div>
              <div className="course">
                <img role="presentation" src={'https://ipfs.io/ipfs/'+ result.image} width="320" height="240" />
                <div className="text-center">
                  <h4>{result.title}</h4>
                  <small>{result.description}</small>
                  <br/>
                  
                </div>
                <button onClick={this.buyButton.bind({state: this, result: result})}>Buy Course</button>
              </div>
              <small className="text-center" onClick={this.showModal.bind({state: this, result: result})}>Preview</small>
            </div>
          ))}
        </div>

        {this.modal()}

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