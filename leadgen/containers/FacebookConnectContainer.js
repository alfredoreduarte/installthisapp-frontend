import React from 'react'
import { connect } from 'react-redux'
import FacebookConnect from 'leadgen/components/FacebookConnect'
import { fbConnect } from 'actions/admin'

const FacebookConnectContainer = props => <SourceCreatorView { ...props } />

const mapStateToProps = state => {
	return {
		adminId: state.admin.id,
		adminName: state.admin.name,
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		fbLoginCallback: response => dispatch(fbConnect(response)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookConnectContainer)