import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { digestFacebookResponse } from 'canvas/trivia/actions/user'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			logging: false
		}
		this.fbCallback = this.fbCallback.bind(this)
	}
	fbCallback(response) {
		this.setState({
			logging: response.id
		})
		if (response.id) {
			this.props.processResponse(response)
		}
	}
	render(){
		const { title } = this.props
		return (
			<div className="text-center">
				<div
					style={{
						position: 'absolute',
						top: '20%',
						left: '50%',
						transform: 'translate(-50%)'
					}}
				>
				<h1 className="text-center">{title}</h1>
				<h3 className="text-center">Please sign in to participate.</h3>
				<FacebookLogin
					appId={window.facebookAppId}
					cssClass={`btn btn-primary btn-lg ${this.state.logging ? 'disabled' : null}`}
					autoLoad={true}
					textButton={this.state.logging ? "Please wait..." : "Sign In"}
					disableMobileRedirect={true}
					callback={response => this.fbCallback(response)} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	title: state.settings.applicationTitle
})

const mapDispatchToProps = (dispatch, props) => ({
	processResponse: response => dispatch(digestFacebookResponse(response))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)