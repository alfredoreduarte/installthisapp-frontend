import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'

const SimpleModal = ({ 
	children, 
	show, 
	handleClose, 
	title, 
	subtitle, 
	thumbnail,
	// 
	requestFormTitle,
	requestFormHint,
}) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title className="ita-cali-modal-title" style={styles.title}>{requestFormTitle}</Modal.Title>
			<p style={styles.product}>
				<span className="ita-cali-modal-product-name">{title}</span>
				{' '}
				<span className="ita-cali-modal-product-price">{subtitle}</span>
			</p>
			<p className="ita-cali-modal-hint">{requestFormHint}</p>
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

SimpleModal.propTypes = {
	requestFormTitle: PropTypes.string.isRequired,
	requestFormHint: PropTypes.string.isRequired,
}

export default SimpleModal