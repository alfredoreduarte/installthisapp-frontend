import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import FacebookProvider, { Login } from 'react-facebook'

import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/common-components/Image'

const Single = ({ messages, images, settings, photo, handleVote, listPath, isPreview }) => (
	<div>
		{settings.showHeaderImageAtSinglePhotoScreen && <Image source={images.header} />}
		<div id="topbar">
			<div className="container">
				<div id="topbar-content">
					<Link to={listPath} className="btn btn-primary" id="back-button">
						{messages.backButtonLabel}
					</Link>
					<div style={{ opacity: 0 }}>.</div>
				</div>
			</div>
		</div>
		<div className="container">
			<div className="col-xs-12 col-md-6 col-md-offset-3">
				<div id="single-photo">
					<img src={photo.attachmentUrl} className="img-responsive" />
					<h4>{photo.user.name}</h4>
					<p>
						{photo.votesCount} {messages.votesLabel}
					</p>
					{!isPreview && (
						<FacebookProvider appId={window.facebookAppId}>
							<Login
								scope="email"
								onResponse={e => handleVote(e, photo.id)}
								onError={e => {}}
								render={({ isLoading, isWorking, onClick }) => (
									<p>
										<button
											disabled={isLoading || isWorking}
											className="btn btn-primary"
											id="vote-button"
											onClick={onClick}>
											{isLoading || isWorking ? '...' : messages.voteButtonLabel}
										</button>
									</p>
								)}
							/>
						</FacebookProvider>
					)}
					{isPreview && (
						<p>
							<button className="btn btn-primary" id="vote-button" onClick={handleVote}>
								{messages.voteButtonLabel}
							</button>
						</p>
					)}
					<p>{photo.caption}</p>
				</div>
			</div>
		</div>
		{settings.showFooterImageAtSinglePhotoScreen && <Image source={images.footer} />}
		<Credits />
	</div>
)

Single.propTypes = {}

export default Single
