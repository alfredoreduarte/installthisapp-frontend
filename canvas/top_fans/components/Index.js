import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Header from 'canvas/top_fans/components/Header'
import HeaderImage from 'canvas/top_fans/components/HeaderImage'
import ListItem from 'canvas/top_fans/components/ListItem'

const LaImage = HeaderImage

const Index = ({ header, footer, title, subtitle, entries, maxScore, likesLabel, commentsLabel, pointsLabel }) => (
	<div className="col-sm-12">
		<div className="row">
			<LaImage source={header} />
		</div>
		<Header title={title} subtitle={subtitle} />
		<div className="row">
			{entries.map( (entry, index) => 
				<ListItem 
					likesLabel={likesLabel}
					commentsLabel={commentsLabel}
					pointsLabel={pointsLabel}
					first={index == 0}
					maxScore={maxScore}
					key={entry.senderId} 
					userName={entry.senderName} 
					identifier={entry.senderId}
					score={entry.score} 
					likes={entry.likes}
					comments={entry.comments}
					 />
			)}
		</div>
		<div className="row">
			<LaImage source={footer} />
		</div>
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
}

export default Index