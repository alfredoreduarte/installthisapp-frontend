import 'isomorphic-fetch'
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
		this.digestFacebookResponse = this.digestFacebookResponse.bind(this)
	}
	componentDidMount() {
		
	}
	digestFacebookResponse(response) {
		this.setState({
			logging: true
		})
		this.props.digestFacebookResponse(response)
	}
	render(){
		const { digestFacebookResponse, title } = this.props
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
				<h1 className="text-center" style={{color: 'white'}}>{title}</h1>
				{!this.state.logging ?
				<FacebookLogin
					appId={window.appId}
					cssClass="btn btn-primary btn-lg"
					autoLoad={true}
					textButton="Sign In"
					callback={response => this.digestFacebookResponse(response)} />
				:
				<button
					className="btn btn-primary btn-lg" disabled={true}>
					Please wait...
				</button>
				}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		title: state.settings.applicationTitle
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		digestFacebookResponse: res => dispatch(digestFacebookResponse(res))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)