import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import ListItem from 'canvas/top_fans/components/ListItem'
import { getLikes } from 'canvas/top_fans/selectors/likes'

const Index = ({ likes }) => (
	<div className="col-sm-12">
		<h1>Top Fans</h1>
		<h1>People who liked the most posts on this page</h1>
		<ListGroup>
			{likes.map( like => 
				<ListItem 
					key={like.id.userIdentifier} 
					id={like.id.userIdentifier} 
					name={like.id.userName} 
					likes={like.likes} />
			)}
		</ListGroup>
	</div>
)

const mapStateToProps = state => {
	const likes = getLikes(state)
	return {
		likes
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)