import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { push } from 'react-router-redux'
import Cookies from 'js-cookie'
import { fetchEntities } from 'canvas/Trivia/actions/'
import 'isomorphic-fetch'

const Login = ({ digestFacebookResponse }) => (
	<div className="col-sm-12 text-center">
		<FacebookLogin
			appId={window.appId}
			cssClass="btn btn-primary btn-lg"
			autoLoad={true}
			textButton="Sign In"
			callback={response => digestFacebookResponse(response)} />
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		digestFacebookResponse: response => {
			if (response.signedRequest) {
				fetch('https://local.installthisapp.com/users.json', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						signed_request: response.signedRequest,
						checksum: window.checksum
					})
				})
				.then(response => response.text())
				.then(text =>{
					window.canvasApiKey = text
					dispatch(push(`/${window.checksum}/logged`))
					dispatch(fetchEntities(window.checksum))
				})
				.catch(exception =>
					{
						console.log('Login: parsing failed', exception)
					}
				)
			}
			else{
				console.log('response', response)
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)