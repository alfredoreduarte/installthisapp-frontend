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
import StepLabel from 'leadgen/components/StepLabel'
import FbPhoto from 'components/FbPhoto'

const WinnerModal = ({
	data,
	schema,
	entry,
	show,
	onHide,
	onRaffle,
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
			The winner is...
		</h1>
		<p className="text-center hide">We'll send a test lead to confirm it's working.</p>
		<div style={{ height: "280px", overflow: "scroll", marginBottom: '20px' }}>
			<table className="table table-striped table-bordered">
				<tbody>
					{schema.map( (field, index) =>
						<tr key={field.id}>
							<td><b>{field.question}</b></td>
							<td>{entry[index]}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
		<div className="row hide">
			<div className="col-md-6 col-md-offset-3 text-center">
				<button onClick={onRaffle} className="btn btn-primary btn-outline btn-sm">Get another winer</button>
			</div>
		</div>
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

export default WinnerModal