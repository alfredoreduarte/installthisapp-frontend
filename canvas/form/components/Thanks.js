import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/form/components/Image'

const Thanks = ({ messages, images, settings }) => 
<div>
	<div className="text-center">
		<img src={images.header} style={{
			width: '820px',
			maxWidth: '100%',
		}} />
	</div>
	<div className="container-fluid">
		<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
			<h1 style={{
				marginTop: '86px',
				marginBottom: '46px',
			}}>{messages.thankYouHeading}</h1>
			<p style={{
				marginBottom: '46px',
			}}>{messages.thankYouCopy}</p>
			<a href={settings.finishedUrl} target="_blank" rel="noopener" className="btn btn-primary btn-lg">{messages.finishButton}</a>
		</div>
	</div>
</div>

Thanks.propTypes = {
	
}

export default Thanks