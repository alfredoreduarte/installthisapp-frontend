import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import FaHeart from 'react-icons/lib/fa/heart'
import FacebookProvider, { Login } from 'react-facebook'

import Image from 'canvas/common-components/Image'

const PhotosList = ({ messages, images, settings, photos, handleLogin, singlePath, getMore, isPreview }) => (
	<div>
		<Image source={images.header} />
		<div id="topbar">
			<div className="container">
				<div id="topbar-content">
					<div style={{ opacity: 0 }}>.</div>
					{!isPreview && (
						<FacebookProvider appId={window.facebookAppId}>
							<Login
								scope="email"
								onResponse={handleLogin}
								onError={e => {}}
								render={({ isLoading, isWorking, onClick }) => (
									<button
										disabled={isLoading || isWorking}
										className="btn btn-primary"
										id="upload-button"
										onClick={onClick}>
										{isLoading || isWorking ? '...' : messages.uploadButtonLabel}
									</button>
								)}
							/>
						</FacebookProvider>
					)}
					{isPreview && (
						<span className="btn btn-primary" id="upload-button">
							{messages.uploadButtonLabel}
						</span>
					)}
				</div>
			</div>
		</div>
		<div id="photos-list">
			{photos.map(photo => (
				<div key={photo.id} className="col-xs-12 col-sm-4">
					<div className="photo">
						<Link to={`${singlePath}/${photo.id}`} key={photo.id}>
							<img src={photo.attachmentUrl} className="img-responsive" />
						</Link>
						<div className="meta">
							<h2 className="photo-title">{photo.user.name}</h2>
							<p className="photo-votes">
								{photo.votes.length} <FaHeart className="votes-heart" size={20} />
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
		<p className="text-center hide">
			{photos.length > 0 && (
				<button className="btn btn-primary" id="more-button" onClick={getMore}>
					{messages.loadMoreButtonLabel}
				</button>
			)}
		</p>
		<Image source={images.footer} />
	</div>
)

PhotosList.propTypes = {}

export default PhotosList
