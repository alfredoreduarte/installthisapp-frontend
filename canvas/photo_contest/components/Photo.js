import React from 'react'

const Photo = ({ caption, name, votes, voted, photoUrl, handleVote }) => (
	<div className="ita-photo-element">
		<img src={photoUrl} className="img-responsive" />
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