import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/common-components/Image'

const Flyer = ({ messages, images, settings }) => (
	<div className="text-center">
		<a href={settings.flyerLinkUrl} target="_blank">
			<img
				src={images.flyer}
				style={{
					width: '820px',
					maxWidth: '100%',
				}}
			/>
		</a>
	</div>
)

Flyer.propTypes = {}

export default Flyer
