import React from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { digestFacebookResponse } from 'canvas/example/actions/user'
import { toggleLogin } from 'canvas/example/actions/activityIndicators'

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