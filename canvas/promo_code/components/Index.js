import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from 'canvas/common-components/Image'

const Index = ({ messages, images, settings, entries }) => (
	<div>
		<Image source={images.header} />
		<h1>Entries</h1>
		<ul>{entries.map(entry => <li>{entry}</li>)}</ul>
		<Image source={images.footer} />
	</div>
)

Index.propTypes = {}

export default Index
