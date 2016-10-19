import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListGroupItem } from 'react-bootstrap'
import FbPhoto from 'canvas/top_fans/components/FbPhoto'

const ListItem = ({ 
	width,
	userName,
	identifier, 
	likes, 
	comments, 
	score, 
	first, 
	maxScore, 
	likesLabel, 
	commentsLabel, 
	pointsLabel
}) => (
	<div 
		className="cali-score-bar-fake" style={{
		...styles.scoreBar, 
		width: width,
	}}>
		<div className="ita-cali-score-bar" style={{flex: 1}}></div>
		<div style={styles.scoreContainer}>
			<div className="ita-cali-user-meta" style={styles.userMeta}>
				{userName}
			</div>
			<div className="ita-cali-score-summary" style={styles.scoreSummary}>
				<div>{likes} {likesLabel}</div>
				<div>{comments} {commentsLabel}</div>
			</div>
			<div style={styles.scoreDetail}>
				<div className="ita-cali-score-detail-value">{score}</div>
				<div className="ita-cali-score-detail-label">{pointsLabel}</div>
			</div>
		</div>
		<FbPhoto 
			identifier={identifier} 
			width={first ? 100 : 70}
			height={first ? 100 : 70}
			className={
				first ? 'ita-cali-user-picture-winner' : 'ita-cali-user-picture'
			}
			style={{
				...styles.userPicture,
				marginTop: first ? styles.userPicture.marginTop : '-17px',
				marginBottom: first ? styles.userPicture.marginBottom : '-17px',
				// marginRight: first ? styles.userPicture.marginRight : '-17px',
				marginRight: styles.userPicture.marginRight,
				// marginLeft: first ? styles.userPicture.marginLeft : '17px',
				marginLeft: styles.userPicture.marginLeft,
			}}
			 />
	</div>
)

const styles = {
	userMeta: {
		display: 'flex',
		alignItems: 'center',
	},
	scoreContainer: {
		display: 'flex',
		margin: '0px 20px',
	},
	scoreBar: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '10px 0px 10px',
		position: 'relative',
		marginBottom: '30px',
		borderRadius: '50px',
		marginLeft: '-30px',
		marginRight: '-30px',
	},
	scoreSummary: {
		marginRight: '10px',
		marginLeft: '10px',
		// textAlign: 'right',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
	},
	scoreDetail: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	userPicture: {
		width: '100px',
		height: '100px',
		marginTop: '-33px',
		marginBottom: '-33px',
		// marginRight: '-25px',
		marginRight: '0px',
		// marginLeft: '25px',
		marginLeft: '0px',
		borderRadius: '100px',
		backgroundColor: 'white',
	},
}

ListItem.propTypes = {
	userName: PropTypes.string.isRequired,
	identifier: PropTypes.number.isRequired,
	likes: PropTypes.number.isRequired,
	comments: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired,
	first: PropTypes.bool,
	likesLabel: PropTypes.string.isRequired,
	commentsLabel: PropTypes.string.isRequired,
	pointsLabel: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
	const { first, score, maxScore } = ownProps
	let width
	if (document.body.clientWidth > 810) {
		width = first ? '80%' : `${score * 100 / maxScore}%`
	}
	else {
		width = first ? '80%' : `70%`
	}
	return {
		width
	}
}

export default connect(mapStateToProps)(ListItem)