import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Header from 'canvas/photo_contest/components/Header'
import ToolBar from 'canvas/photo_contest/components/ToolBar'

const SingleView = ({ title, subtitle, uploadButton, mostRecent, mostVoted, photo, voted = true, handleVote, backUrl, uploadUrl }) => (
	<div className="container">
		<Header title={title} subtitle={subtitle} />
		<ToolBar 
			backUrl={backUrl} 
			uploadUrl={uploadUrl}
			uploadButton={uploadButton}
			mostRecent={mostRecent}
			mostVoted={mostVoted}
			 />
		<div className="row">
			<div className="col-sm-12">
				<div style={styles.photo}>
					<img src={photo.assetUrl} className="img-responsive" />
					<div style={styles.caption}>
						<div style={styles.metadata}>
							<div>
								<p className="ita-cali-caption-full">{photo.caption}</p>
								<p className="ita-cali-name-full">{photo.user.name}</p>
								<span className="ita-cali-vote-count--full">{photo.votes.length}</span>
								{' '}
								<span className="ita-cali-vote-label--full">votes</span>
							</div>
							<a
								style={styles.voteButton}
								onClick={() => handleVote(photo.id)}>
								<span className={`glyphicon glyphicon-heart ita-cali-heart-full${voted ? '--active' : null}`}></span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

const styles = {
	metadata: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	photo: {
		marginBottom: '20px',
		position: 'relative',
	},
	voteButton: {
		cursor: 'pointer',
		fontSize: '40px',
	},
	caption: {
		padding: '2%',
	}
}

SingleView.propTypes = {
	photo: PropTypes.object.isRequired,
	voted: PropTypes.bool.isRequired,
	handleVote: PropTypes.func.isRequired,
	backUrl: PropTypes.string.isRequired,
	uploadUrl: PropTypes.string.isRequired,
}

export default SingleView