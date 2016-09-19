import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// const Heart = require('./Heart.png')

const Photo = ({ id, name, votes, voted, photoUrl, handleVote, singlePhotoUrl = '' }) => (
	<div style={styles.photo}>
		<Link to={singlePhotoUrl ? `${singlePhotoUrl}/${id}` : ' '}>
			<img src={photoUrl} className="img-responsive" />
		</Link>
		<div style={styles.caption}>
			<div>
				<span className="ita-cali-vote-count">{votes}</span>
				{' '}
				<span className="ita-cali-vote-label">votes</span>
			</div>
			<div style={styles.metadata}>
				<div className="ita-cali-photo-name">{name}</div>
				<div className="">
					<a
						style={styles.voteButton}
						onClick={() => handleVote(id)}>
						<span 
							className={`glyphicon glyphicon-heart ita-cali-heart${voted ? '--active' : null}`}>
						</span>
					</a>
				</div>
			</div>
		</div>
	</div>
)

const styles = {
	metadata: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	photo: {
		marginBottom: '20px',
		position: 'relative',
	},
	voteButton: {
		cursor: 'pointer',
	},
	caption: {
		padding: '2% 5%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		backgroundImage: 'linear-gradient(transparent, black)',
	}
}

Photo.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	votes: PropTypes.number.isRequired,
	voted: PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.func,
	]),
	photoUrl: PropTypes.string.isRequired,
	handleVote: PropTypes.func.isRequired,
	singlePhotoUrl: PropTypes.string,
}

export default Photo