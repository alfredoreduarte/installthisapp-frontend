import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import TagsInput from 'react-tagsinput'
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
import MdClear from 'react-icons/lib/md/clear'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<input {...input} className="form-control" placeholder="1" type={type} />
		{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
)

const OptionsDictionary = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<TagsInput
			inputProps={{
				placeholder: 'Type in each code and press enter. You can also copy/paste directly from Excel or a text file.',
			}}
			className="multiline-taginput"
			value={input.value}
			addOnPaste={true}
			renderLayout={(tagComponents, inputComponent) => (
				<span>
					{inputComponent}
					{tagComponents}
					{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
				</span>
			)}
			pasteSplit={data => {
				const separators = [',', ';', '\\(', '\\)', '\\*', '/', ':', '\\?', '\n', '\r']
				return data.split(new RegExp(separators.join('|'))).map(d => d.trim())
			}}
			renderTag={({ tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other }) => (
				<span key={key} {...other}>
					{getTagDisplayValue(tag)}
					{!disabled && (
						<a className={classNameRemove} onClick={e => onRemove(key)}>
							<MdClear
								size={16}
								style={{
									color: 'white',
									cursor: 'pointer',
								}}
							/>
						</a>
					)}
				</span>
			)}
			onChange={tags => input.onChange(tags)}
		/>
	</div>
)

const CreateVouchersModal = ({ data, valid, mode, onHide, handleSubmit }) => (
	<Animate
		// Set some default data
		default={{
			scale: 0.8,
			opacity: 0,
		}}
		// Update your data to whatever you want
		data={{
			scale: 1,
			opacity: 1,
		}}
		duration={400}
		easing="easeQuadIn">
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
					},
				}}>
				<MdClose size="16" style={styles.close} onClick={onHide} />
				<h1 className="text-center" style={{ fontSize: '24px', marginBottom: '42px' }}>
					Generate redemption vouchers
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label className="control-label">How would you like to generate the coupons?</label>
						<Field name="mode" component="select" className="form-control">
							<option value={'auto'}>Auto-generate the codes</option>
							<option value={'custom'}>Insert my own coupon codes</option>
						</Field>
					</div>
					{mode == 'auto' && (
						<div className="form-group" style={{ marginBottom: '20px' }}>
							<label className="control-label">How many coupons?</label>
							<Field name={'quantity'} component={renderField} type="number" />
						</div>
					)}
					{mode == 'custom' && (
						<div className="form-group" style={{ marginBottom: '20px' }}>
							<label className="control-label">Custom codes</label>
							<Field name={'codes'} component={OptionsDictionary} />
						</div>
					)}
					<div className="text-center">
						<button type="submit" disabled={!valid} className="btn btn-success">
							Create coupons
						</button>
					</div>
				</form>
			</Modal>
		)}
	</Animate>
)

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
	},
}

export default CreateVouchersModal
