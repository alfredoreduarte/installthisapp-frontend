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
		if (!values.quantity) {
			errors.quantity = 'Required'
		}
		return errors
	}
	// destroyOnUnmount: false,     // <------ preserve form data
})(CreateVouchersContainer)

const selector = formValueSelector('couponVouchersCreator')

const mapStateToProps = (state, props) => ({
	quantity: selector(state, 'quantity'),
	initialValues: {
		quantity: 1,
	}
})

const mapDispatchToProps = (dispatch, props) => ({
	handleSubmit: e => {
		e.preventDefault()
		dispatch(createVouchers())
	},
	onHide: () => dispatch(temporaryBackHack())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateVouchersContainer)