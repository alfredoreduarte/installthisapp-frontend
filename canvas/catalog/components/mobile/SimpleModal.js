import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

const SimpleModal = ({ children, show, handleClose, title, subtitle, thumbnail }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title style={{
				marginBottom: '1em',
				// design
				lineHeight: 1.5,
				textAlign: 'left',
				color: '#5A6471',
				letterSpacing: '0px',
				fontSize: '14px',
				fontFamily: 'Montserrat',
				fontWeight: 'bold',
				fontStyle: 'normal',
				textDecoration: 'none',
				textTransform: 'none',
			}}>Request this product</Modal.Title>
			<p style={{
				marginLeft: '20px',
			}}>
				<span style={{
					// design
					lineHeight: 1.5,
					textAlign: 'left',
					color: '#5A6471',
					letterSpacing: '0px',
					fontSize: '12px',
					fontFamily: 'Montserrat',
					fontWeight: 'normal',
					fontStyle: 'normal',
					textDecoration: 'none',
					textTransform: 'none',
				}}>{title}</span>
				{' '}
				<span style={{
					// design
					lineHeight: 1.5,
					textAlign: 'left',
					color: '#C0C0C0',
					letterSpacing: '0px',
					fontSize: '11px',
					fontFamily: 'Montserrat',
					fontWeight: 'normal',
					fontStyle: 'normal',
					textDecoration: 'none',
					textTransform: 'none',
				}}>{subtitle}</span>
			</p>
			<p style={{
				// design
				lineHeight: 1.5,
				textAlign: 'left',
				color: '#5A6471',
				letterSpacing: '0px',
				fontSize: '12px',
				fontFamily: 'Montserrat',
				fontWeight: '300',
				fontStyle: 'normal',
				textDecoration: 'none',
				textTransform: 'none',
			}}>Please send use your contact data so we can get back to you. We’ll reply to your message as soon as possible.</p>
		</Modal.Header>
		<Modal.Body>
			{children}
		</Modal.Body>
	</Modal>
)

export default SimpleModal