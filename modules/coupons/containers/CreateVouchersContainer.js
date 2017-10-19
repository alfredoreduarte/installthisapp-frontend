import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { createVouchers, temporaryBackHack } from 'modules/coupons/actions/vouchers'
import CreateVouchersModal from 'modules/coupons/components/CreateVouchersModal'

let CreateVouchersContainer = props => <CreateVouchersModal {...props} />

CreateVouchersContainer = reduxForm({
	form: 'couponVouchersCreator',  // <------ same form name
	validate: values => {
		const errors = {}
		if ( values.mode == 'auto' && (!values.quantity || values.quantity <= 0) ) {
			errors.quantity = 'Please insert a positive number'
		}
		if ( values.mode == 'custom' && values.codes.length == 0 ) {
			errors.codes = 'Please insert at least one code'
		}
		return errors
	}
	// destroyOnUnmount: false,     // <------ preserve form data
})(CreateVouchersContainer)

const selector = formValueSelector('couponVouchersCreator')

const mapStateToProps = (state, props) => ({
	initialValues: {
		mode: 'auto',
		codes: [],
	},
	mode: selector(state, 'mode'),
})

const mapDispatchToProps = (dispatch, props) => ({
	handleSubmit: e => {
		e.preventDefault()
		dispatch(createVouchers())
	},
	onHide: () => dispatch(temporaryBackHack())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateVouchersContainer)