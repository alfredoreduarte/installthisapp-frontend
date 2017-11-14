import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import FacebookProvider, { Login } from 'react-facebook'

import Image from 'canvas/common-components/Image'
import Credits from 'canvas/common-components/Credits'

const Welcome = ({ messages, images, settings, handleLogin, isPreview }) => (
	<div>
		{settings.welcomeLayout == 'html' && (
			<div>
				<Image source={images.header} />
				<div className="container-fluid">
					<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
						<h1
							id="welcomeHeadline"
							style={{
								marginTop: '86px',
								marginBottom: '46px',
							}}>
							{messages.welcomeHeadline}
						</h1>
						<p
							id="welcomeCopy"
							style={{
								marginBottom: '46px',
							}}>
							{messages.welcomeCopy}
						</p>
						{isPreview && (
							<span className="btn btn-primary btn-lg" id="startButton">
								{messages.startButton}
							</span>
						)}
						{!isPreview && (
							<FacebookProvider appId={window.facebookAppId}>
								<Login
									scope="email"
									onResponse={handleLogin}
									onError={handleLogin}
									render={({ isLoading, isWorking, onClick }) => (
										<span className="btn btn-primary btn-lg" id="startButton" onClick={onClick}>
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
