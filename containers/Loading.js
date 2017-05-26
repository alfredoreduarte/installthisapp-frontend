import React from 'react'
import { connect } from 'react-redux'

const Loading = ({ active }) => (
	<div
		style={{
			position: 'fixed',
			backgroundColor: 'white',
			display: active ? 'flex' : 'none',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			zIndex: 9999,
		}}
	>
		<img src="/images/source-loading.svg" style={{
		position: 'fixed',
		top: '50%',
		left: '50%',
		marginLeft: '-37px',
		marginTop: '-37px',
		}} />
	</div>
)

export default Loading