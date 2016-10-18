import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Header from 'canvas/top_fans/components/Header'
import HeaderImage from 'canvas/top_fans/components/HeaderImage'
import ListItem from 'canvas/top_fans/components/ListItem'

const Index = ({ title, subtitle, entries, maxScore, likesLabel, commentsLabel, pointsLabel }) => (
	<div className="col-sm-12">
		<div className="row">
			<HeaderImage source={'https://uploads.intercomcdn.com/i/o/11827466/b600e1c0b0b5aa12337c83be/Header.jpg'} />
		</div>
		<div className="row">
			{entries.map( (entry, index) => 
				<ListItem 
					likesLabel={likesLabel}
					commentsLabel={commentsLabel}
					pointsLabel={pointsLabel}
					first={index == 0}
					maxScore={maxScore}
					key={entry.senderId} 
					identifier={entry.senderId} 
					name={entry.senderName} 
					score={entry.score} 
					likes={entry.likes}
					comments={entry.comments}
					 />
			)}
		</div>
		<div className="row">
			<HeaderImage source={'https://uploads.intercomcdn.com/i/o/11827467/db60d96ccfedba85f9258d2a/header2.jpg'} />
		</div>
	</div>
)

Index.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	likesLabel: PropTypes.string.isRequired,
	commentsLabel: PropTypes.string.isRequired,
	pointsLabel: PropTypes.string.isRequired,
	entries: PropTypes.array.isRequired,
	maxScore: PropTypes.number.isRequired,
}

export default Index