import React from 'react'
import { connect } from 'react-redux'
import NoCoupons from 'canvas/coupons/components/NoCoupons'

const NoCouponsContainer = props => <NoCoupons {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(NoCouponsContainer)