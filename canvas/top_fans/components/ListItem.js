import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

const ListItem = ({ id, name, likes, comments, score }) => (
	<ListGroupItem header={name}>
		<h4>{score} points</h4>
		<small>{likes} likes </small><br/>
		<small>{comments} comments</small>
	</ListGroupItem>
)

export default ListItem