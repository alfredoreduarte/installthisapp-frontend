import React from 'react'
import { connect } from 'react-redux'
import { digestFacebookResponse } from 'canvas/form/actions/user'
import { toggleLogin } from 'canvas/form/actions/activityIndicators'
import LoginView from 'canvas/form/components/Login'

const Login = ({ logging, title, fbCallback }) => (
	<LoginView title={title} fbCallback={fbCallback} logging={logging} />
)

const mapStateToProps = state => ({
	title: state.applicationData.title,
	logging: state.activityIndicators.login,
})

const mapDispatchToProps = (dispatch, props) => ({
	fbCallback: response => {
		if (response.id) {
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