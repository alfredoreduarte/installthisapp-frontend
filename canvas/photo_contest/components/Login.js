import React from 'react'
import FacebookLogin from 'react-facebook-login'

const Login = ({ logging, title, fbCallback }) => (
	<div className="text-center">
		<div
			style={{
				position: 'absolute',
				top: '20%',
				left: '50%',
				transform: 'translate(-50%)',
			}}>
			<h1 className="text-center">{title}</h1>
			<h3 className="text-center">Please sign in to participate.</h3>
			<FacebookLogin
				appId={window.facebookAppId}
				cssClass={`btn btn-primary btn-lg ${logging ? 'disabled' : null}`}
				autoLoad={true}
				textButton={logging ? 'Please wait...' : 'Sign In'}
				disableMobileRedirect={true}
				callback={fbCallback}
			/>
		</div>
	</div>
)

export default Login
