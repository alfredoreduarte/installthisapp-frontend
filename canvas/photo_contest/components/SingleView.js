import React from 'react'
import { Link } from 'react-router'
import Photo from 'canvas/photo_contest/components/Photo'

const SingleView = ({ photo, voted = true, handleVote, backUrl, uploadUrl }) => (
	<div className="container">
		<div className="col-sm-12 ita-title-bar">
			<div className="ita-cali-title">This is the main heading</div>
			<div className="ita-cali-subtitle">Nibh Mattis Ridiculus Egestas</div>
		</div>
		<div className="col-sm-12">
			<div className="row ita-toolbar">
				<div className="col-sm-4">
					<Link to={backUrl} className="btn btn-primary btn-sm">Back</Link>
				</div>
				<div className="col-sm-4 text-center">
					
				</div>
				<div className="col-sm-4 text-right">
					<Link to={uploadUrl} className="btn btn-primary btn-sm">Upload Photo</Link>
				</div>
			</div>
		</div>
		<div className="">
			<div className="col-sm-12">
				<div className="ita-photo-element">
					<img src={photo.assetUrl} className="img-responsive" />
					<div className="caption">
						<div className="row">
							<div>
								<span className="ita-cali-vote-count">{photo.votes.length}</span>
								{' '}
								<span className="ita-cali-vote-label">votes</span>
							</div>
							<div className="ita-cali-photo-name pull-left">{photo.user.name}</div>
							<div className="pull-right">
								<a 
									className={`ita-cali-vote-button ${voted ? 'ita-cali-vote-button--active' : null}`} 
									onClick={() => handleVote(photo.id)}>
									<span className="glyphicon glyphicon-heart"></span>
								</a>
							</div>
						</div>
						<div className="row">
							<p className="ita-cali-photo-caption">{photo.caption}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default SingleView