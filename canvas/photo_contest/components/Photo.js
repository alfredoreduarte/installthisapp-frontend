import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// const Heart = require('./Heart.png')

const Photo = ({ id, name, canVote, votes, voted, photoUrl, handleVote, singlePhotoUrl = '' }) => (
	<div style={styles.photo}>
		<Link to={singlePhotoUrl ? `${singlePhotoUrl}/${id}` : ' '} style={{ ...styles.photoLink, height: styles.photo.height, backgroundImage: `url("${photoUrl}")` }}>
			<img src={photoUrl} style={{ display: 'none' }} />
		</Link>
		<div style={styles.caption}>
			<div style={styles.metadata}>
				<div>
					<span className="ita-cali-vote-count">{votes}</span>
					{' '}
					<span className="ita-cali-vote-label">votes</span><br/>
					<div className="ita-cali-photo-name">{name}</div>
				</div>
				<a
					style={{ ...styles.voteButton, cursor: voted || !canVote ? 'not-allowed' : 'pointer' }}
					disabled={voted || !canVote}
					onClick={() => !voted && canVote ? handleVote(id) : null}>
					<span 
						className={`glyphicon glyphicon-heart${voted ? '' : '-empty'} ita-cali-vote-button${voted ? '--active' : ''}`}>
					</span>
				</a>
			</div>
		</div>
	</div>
)

const styles = {
	metadata: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	photo: {
		marginBottom: '28px',
		position: 'relative',
		height: '260px',
	},
	photoLink: {
		display: 'block',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	},
	voteButton: {
		fontSize: '20px',
	},
	caption: {
		padding: '5% 5%',
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
	canVote: PropTypes.bool.isRequired,
	photoUrl: PropTypes.string.isRequired,
	handleVote: PropTypes.func.isRequired,
	singlePhotoUrl: PropTypes.string,
}

export default Photo