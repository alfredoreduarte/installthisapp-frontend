import React from 'react'

const SummaryNumber = ({ num, active = false }) => (
	<span
		style={{
			width: '50px',
			height: '50px',
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: active ? '#6DBA4B' : '#a94442',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			color: active ? '#6DBA4B' : '#a94442',
			fontWeight: 'bold',
			fontSize: '28px',
			borderRadius: '100px',
			fontFamily: 'Helvetica',
		}}>
		{num}
	</span>
)

export default SummaryNumber
