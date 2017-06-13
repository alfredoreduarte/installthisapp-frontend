import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Header from 'canvas/top_fans/components/Header'
import HeaderImage from 'canvas/top_fans/components/HeaderImage'
import ListItem from 'canvas/top_fans/components/ListItem'
import Credits from 'canvas/top_fans/components/Credits'
import FbPhoto from 'canvas/top_fans/components/FbPhoto'

const LaImage = HeaderImage

const Index = ({ 
	header, 
	footer, 
	title, 
	subtitle, 
	entries, 
	maxScore, 
	likesLabel, 
	commentsLabel, 
	pointsLabel, 
	currentUserScore, 
	currentUserName, 
	currentUserIdentifier,
	getSingleUserScores,
	// 
	signInLabel,
	anonUserLoginPrompt,
	loggedUserScoreLabel,
	updateLabel,
}) => (
	<div className="col-sm-12">
		<div className="row">
			<LaImage source={header} />
		</div>
		<Header title={title} subtitle={subtitle} />
		<div className="row">
			<div className="col-md-6 col-md-push-6" style={{marginBottom: '42px'}}>
				{currentUserName ? 
					<div>
						<div className="visible-xs visible-sm hidden-md hidden-lg text-center row">
							<div style={{marginBottom: '20px'}}>
								<FbPhoto identifier={currentUserIdentifier} width={50} height={50} className="img-circle" />
							</div>
							<p className="ita-cali-logged-user-label">{loggedUserScoreLabel}</p>
							<p className="ita-cali-logged-user-score">{currentUserScore}</p>
							<button onClick={() => getSingleUserScores()} className="btn btn-default ita-cali-update-button">{updateLabel}</button>
						</div>
						<div className="hidden-xs hidden-sm visible-md visible-lg">
							<div className="col-md-2">
								<FbPhoto 
									identifier={currentUserIdentifier} 
									width={100}
									height={100}
									className="img-circle"
									/>
							</div>
							<div className="col-md-10">
								<p className="ita-cali-logged-user-label">{loggedUserScoreLabel}</p>
								<p className="ita-cali-logged-user-score">{currentUserScore}</p>
								<button onClick={() => getSingleUserScores()} className="btn btn-default ita-cali-update-button">{updateLabel}</button>
							</div>
						</div>
					</div>
				:
					<div>
						<div className="visible-xs visible-sm hidden-md hidden-lg text-center">
							<p className="ita-cali-please-log-in">{anonUserLoginPrompt}</p>
							<Link to={`/${window.canvasId}/${window.checksum}/login`} className="btn btn-default ita-cali-login-button">{signInLabel}</Link>
						</div>
						<div className="hidden-xs hidden-sm visible-md visible-lg">
							<p className="ita-cali-please-log-in">{anonUserLoginPrompt}</p>
							<Link to={`/${window.canvasId}/${window.checksum}/login`} className="btn btn-default ita-cali-login-button">{signInLabel}</Link>
						</div>
					</div>
				}
			</div>
			<div className="col-md-6 col-md-pull-6">
				{entries.map( (entry, index) => 
					<ListItem 
						key={entry.senderId} 
						likesLabel={likesLabel}
						commentsLabel={commentsLabel}
						pointsLabel={pointsLabel}
						first={index == 0}
						maxScore={maxScore}
						userName={entry.senderName} 
						identifier={entry.senderId}
						score={entry.score} 
						likes={entry.likes}
						comments={entry.comments}
						 />
				)}
			</div>
		</div>
		<div className="row">
			<LaImage source={footer} />
		</div>
		<Credits />
	</div>
)

Index.propTypes = {
	// header: PropTypes.string.isRequired,
	// footer: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	likesLabel: PropTypes.string.isRequired,
	commentsLabel: PropTypes.string.isRequired,
	pointsLabel: PropTypes.string.isRequired,
	entries: PropTypes.array.isRequired,
	maxScore: PropTypes.number.isRequired,
	// 
	signInLabel: PropTypes.string,
	anonUserLoginPrompt: PropTypes.string,
	loggedUserScoreLabel: PropTypes.string,
	updateLabel: PropTypes.string,
}

export default Index