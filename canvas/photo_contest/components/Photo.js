import React from 'react'
import { Link } from 'react-router'

const Photo = ({ id, caption, name, votes, voted, photoUrl, handleVote, singlePhotoUrl }) => (
	<div className="ita-photo-element">
		<Link to={`${singlePhotoUrl}/${id}`}>
			<img src={photoUrl} className="img-responsive" />
		</Link>
		<div className="caption">
			<div>
				<span className="ita-cali-vote-count">{votes}</span>
				{' '}
				<span className="ita-cali-vote-label">votes</span>
			</div>
			<div>
				<div className="ita-cali-photo-name pull-left">{name}</div>
				<div className="pull-right">
					<a 
						className={`ita-cali-vote-button ${voted ? 'ita-cali-vote-button--active' : null}`} 
						onClick={handleVote}>
						<span className="glyphicon glyphicon-heart"></span>
					</a>
				</div>
			</div>
			{caption ? <p>{caption}</p> : null}
		</div>
	</div>
)

export default Photo