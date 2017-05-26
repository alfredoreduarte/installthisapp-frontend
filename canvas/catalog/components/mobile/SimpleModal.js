import React from 'react'
import { Modal } from 'react-bootstrap'

const SimpleModal = ({ children, show, handleClose, title, subtitle, thumbnail }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title className="ita-cali-modal-title" style={styles.title}>Request this product</Modal.Title>
			<p style={styles.product}>
				<span className="ita-cali-modal-product-name">{title}</span>
				{' '}
				<span className="ita-cali-modal-product-price">{subtitle}</span>
			</p>
			<p className="ita-cali-modal-hint">Please send use your contact data so we can get back to you. We’ll reply to your message as soon as possible.</p>
		</Modal.Header>
		<Modal.Body>
			{children}
		</Modal.Body>
	</Modal>
)

const styles = {
	title: {
		marginBottom: '1em',
	},
	product: {
		marginLeft: '20px',
	},
}

export default SimpleModal