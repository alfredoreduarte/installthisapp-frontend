import React from 'react'
import { connect } from 'react-redux'
import { digestFacebookResponse } from 'canvas/memory_match/actions/user'
import { toggleLogin } from 'canvas/memory_match/actions/activityIndicators'
import LoginView from 'canvas/memory_match/components/Login'

const Login = ({ logging, title, fbCallback }) => (
	<LoginView title={title} fbCallback={fbCallback} logging={logging} />
)

const mapStateToProps = state => ({
	title: state.applicationData.title,
	logging: state.activityIndicators.login,
})

const mapDispatchToProps = (dispatch, props) => ({
	fbCallback: response => {
		if (response.status != 'not_authorized') {
			dispatch(toggleLogin())
			if (props.location.state && props.location.state.nextPathname) {
				return dispatch(digestFacebookResponse(response, props.location.state.nextPathname))
			}
			else{
				return dispatch(digestFacebookResponse(response, ''))
			}
		}
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)