import React, { PropTypes } from 'react'

const Credits = () => (
	<div style={{textAlign: 'center', margin: '15px 0px'}}>
		Powered by <a href="https://v3.installthisapp.com" target="_blank"><b>Install</b>This<b>App V3</b></a>
	</div>
)

const styles = {
	img: {
		// marginBottom: '38px',
		width: 'auto',
		maxWidth: '100%',
	}
}

Credits.propTypes = {
	// source: PropTypes.string.isRequired,
}

export default Credits