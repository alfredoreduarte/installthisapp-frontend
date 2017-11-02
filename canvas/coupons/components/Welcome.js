import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import FacebookProvider, { Login } from 'react-facebook'
import Credits from 'canvas/common-components/Credits'

const Welcome = ({ messages, images, settings, handleLogin, isPreview }) => (
	<div>
		{settings.welcomeLayout == 'html' && (
			<div>
				<div className="text-center">
					<img
						src={images.header}
						style={{
							width: '820px',
							maxWidth: '100%',
						}}
					/>
				</div>
				<div className="container-fluid">
					<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
						<h1
							style={{
								marginTop: '86px',
								marginBottom: '46px',
							}}>
							{messages.welcomeHeadline}
						</h1>
						<p
							style={{
								marginBottom: '46px',
							}}>
							{messages.welcomeCopy}
						</p>
						{isPreview && <span className="btn btn-primary btn-lg">{messages.startButton}</span>}
						{!isPreview && (
							<FacebookProvider appId={window.facebookAppId}>
								<Login
									scope="email"
									onResponse={handleLogin}
									onError={handleLogin}
									render={({ isLoading, isWorking, onClick }) => (
										<span className="btn btn-primary btn-lg" onClick={onClick}>
											{isLoading || isWorking ? <span>Loading...</span> : messages.startButton}
										</span>
									)}
								/>
							</FacebookProvider>
						)}
					</div>
				</div>
			</div>
		)}
		{settings.welcomeLayout == 'flyer' && (
			<div className="text-center">
				{isPreview && (
					<img
						src={images.welcome}
						style={{
							width: '820px',
							maxWidth: '100%',
						}}
					/>
				)}
				{!isPreview && (
					<FacebookProvider appId={window.facebookAppId}>
						<Login
							scope="email"
							onResponse={handleLogin}
							onError={handleLogin}
							render={({ isLoading, isWorking, onClick }) => (
								<img
									src={images.welcome}
									onClick={onClick}
									style={{
										width: '820px',
										maxWidth: '100%',
										cursor: 'pointer',
									}}
								/>
							)}
						/>
					</FacebookProvider>
				)}
			</div>
		)}
		<p className="text-center" style={{ marginTop: '46px' }}>
			<a href={settings.privacyPolicyUrl} target="_blank">
				{messages.privacyPolicyLinkText}
			</a>
		</p>
		<Credits />
	</div>
)

Welcome.propTypes = {}

export default Welcome
