import React from 'react'
import { connect } from 'react-redux'
import Coupon from 'canvas/coupons/components/Coupon'

const CouponContainer = props => <Coupon {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
	code: state.coupon.code,
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer)