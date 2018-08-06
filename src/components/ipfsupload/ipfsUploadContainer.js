import { connect } from 'react-redux'
import ipfsUpload from './ipfsUpload'
import { ipfsStore } from './ipfsUploadActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    ipfsUploadSubmit: (name) => {
      dispatch(ipfsStore(name))
    }
  }
}

const ipfsUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ipfsUpload)

export default ipfsUploadContainer
