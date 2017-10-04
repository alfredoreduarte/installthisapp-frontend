import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/form/components/Image'

const Thanks = ({ messages, images, settings }) => (
	<div className="col-sm-4 col-md-offset-4 text-center">
		<h1>{messages.thankYouHeading}</h1>
		<h2>{messages.thankYouCopy}</h2>
		<a href={settings.finishedUrl} target="_blank" rel="noopener" className="btn btn-primary btn-block">{messages.finishButton}</a>
	</div>
)

Thanks.propTypes = {
	
}

export default Thanks