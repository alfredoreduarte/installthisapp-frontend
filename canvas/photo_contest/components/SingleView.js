import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import HeaderImage from 'canvas/photo_contest/components/HeaderImage'
import Header from 'canvas/photo_contest/components/Header'
import ToolBar from 'canvas/photo_contest/components/ToolBar'
import Credits from 'canvas/photo_contest/components/Credits'

const SingleView = ({ 
	headerImg,
	footerImg,
	canUpload,
	canVote,
	// 
	title, 
	subtitle, 
	uploadButton, 
	mostRecent, 
	mostVoted, 
	photo, 
	voted, 
	handleVote, 
	back, 
	backUrl, 
	uploadUrl
}) => (
	<div>
		<div className="row">
			<HeaderImage source={headerImg} />
		</div>
		<div className="container">
			<Header title={title} subtitle={subtitle} />
			<ToolBar 
				canUpload={canUpload} 
				// 
				back={back}
				backUrl={backUrl} 
				uploadUrl={uploadUrl}
				uploadButton={uploadButton}
				mostRecent={mostRecent}
				mostVoted={mostVoted}
				 />
			<div className="col-sm-12">
				<div style={styles.photo}>
					<img src={photo.attachmentUrl} style={styles.photo.img} className="img-responsive" />
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
								style={{ ...styles.voteButton, cursor: voted || !canVote ? 'not-allowed' : 'pointer' }}
								disabled={voted || !canVote}
								onClick={() => !voted && canVote ? handleVote(photo.id) : null}>
								<span 
									className={`glyphicon glyphicon-heart${voted ? '' : '-empty'} ita-cali-vote-button-full${voted ? '--active' : ''}`}>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="row">
			<HeaderImage source={footerImg} />
		</div>
		<Credits />
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
		img: {
			margin: 'auto',
		}
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
	headerImg: PropTypes.string, 
	footerImg: PropTypes.string, 
	photo: PropTypes.object.isRequired,
	voted: PropTypes.bool.isRequired,
	canVote: PropTypes.bool.isRequired,
	canUpload: PropTypes.bool.isRequired,
	handleVote: PropTypes.func.isRequired,
	back: PropTypes.string.isRequired,
	backUrl: PropTypes.string.isRequired,
	uploadUrl: PropTypes.string.isRequired,
}

export default SingleView