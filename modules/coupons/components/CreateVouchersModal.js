import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { Animate } from 'react-move'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login'
import FaCircleO from 'react-icons/lib/fa/circle-o'
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaArrowRight from 'react-icons/lib/fa/arrow-right'
import MdCloud from 'react-icons/lib/md/cloud'
import MdClose from 'react-icons/lib/md/close'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => 
<div>
	<input {...input} className="form-control" placeholder={label} type={type}/>
	{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
</div>

const CreateVouchersModal = ({
	data,
	schema,
	entry,
	show,
	onHide,
	quantity,
	handleSubmit,
}) => <Animate
	// Set some default data
	default={{
		scale: .8,
		opacity: 0,
	}}
	// Update your data to whatever you want
	data={{
		scale: 1,
		opacity: 1,
	}}
	duration={400}
	easing='easeQuadIn'
>
	{data => (
	<Modal
		isOpen={true}
		onAfterOpen={() => console.log('afteropen')}
		onRequestClose={onHide}
		contentLabel="Modal"
		style={{
			overlay: {
				...styles.overlay,
				opacity: `${data.opacity}`,
			},
			content: {
				...styles.content,
				transform: `scale(${data.scale})`,
				opacity: `${data.opacity}`,
			}
		}}
	>
		<MdClose size="16" style={styles.close} onClick={onHide} />
		<h1 className="text-center" style={{fontSize: '24px', marginBottom: '42px'}}>
			Generate redemption vouchers
		</h1>
		<p className="text-center hide">Indicate a quantity and we'll create the coupon vouchers.</p>
		<form onSubmit={handleSubmit}>
			<div className="form-group" style={{ marginBottom: '20px' }}>
				<label className="control-label">How many would you like to add?</label>
				<Field 
					name={'quantity'} 
					component={renderField}
					type="number" />
			</div>
			<div className="text-center">
				<button type="submit" disabled={!quantity} className="btn btn-success btn-sm">Create vouchers</button>
			</div>
		</form>
	</Modal>
	)}
</Animate>

const styles = {
	overlay: {
		position: 'fixed',
		top: '0px',
		left: '0px',
		right: '0px',
		bottom: '0px',
		backgroundColor: 'rgba(80, 88, 98, .9)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		overflow: 'visible',
		position: 'absolute',
		top: 'auto',
		left: 'auto',
		right: 'auto',
		bottom: 'auto',
		border: '1px solid rgb(204, 204, 204)',
		background: 'rgb(255, 255, 255)',
		borderRadius: '4px',
		outline: 'none',
		padding: '20px',
		boxShadow: '0px 0px 10px rgba(0,0,0,.1)',
		width: '50%',
		padding: '20px',
	},
	close: {
		color: 'white',
		cursor: 'pointer',
		position: 'absolute',
		top: '-20px',
		right: '-20px',
	}
}

export default CreateVouchersModal