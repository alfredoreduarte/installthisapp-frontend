import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import ListItem from 'canvas/top_fans/components/ListItem'
import { getEntries } from 'canvas/top_fans/selectors/entries'

const Index = ({ entries, likeMultiplier, commentMultiplier }) => (
	<div className="col-sm-12">
		<h1>Top Fans</h1>
		<ListGroup>
			{entries.map( entry => 
				<ListItem 
					key={entry.userIdentifier} 
					id={entry.userIdentifier} 
					name={entry.userName} 
					score={entry.likes * likeMultiplier + entry.comments * commentMultiplier} 
					likes={entry.likes}
					comments={entry.comments}
					 />
			)}
		</ListGroup>
	</div>
)

const mapStateToProps = state => {
	const entries = getEntries(state)
	console.log('entries')
	console.log(entries)
	return {
		entries,
		likeMultiplier: state.settings.pointsPerLike,
		commentMultiplier: state.settings.pointsPerComment,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)