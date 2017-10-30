import React from 'react'
import { connect } from 'react-redux'
import { digestFacebookResponse } from 'canvas/photo_contest/actions/user'
import { toggleLogin } from 'canvas/photo_contest/actions/activityIndicators'
import Login from 'canvas/photo_contest/components/Login'

const LoginContainer = ({ logging, title, fbCallback }) => <Login title={title} fbCallback={fbCallback} logging={logging} />

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
			} else {
				return dispatch(digestFacebookResponse(response, ''))
			}
		}
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
