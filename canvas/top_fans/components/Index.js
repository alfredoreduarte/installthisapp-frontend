import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Header from 'canvas/top_fans/components/Header'
import ListItem from 'canvas/top_fans/components/ListItem'

const Index = ({ title, subtitle, entries, maxScore, likesLabel, commentsLabel, pointsLabel }) => (
	<div className="col-sm-12">
		<div className="row">
			<Header title={title} subtitle={subtitle} />
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