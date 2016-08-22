import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

const ListItem = ({ id, name, likes }) => (
	<ListGroupItem header={name}>
		{likes} likes
	</ListGroupItem>
)

export default ListItem