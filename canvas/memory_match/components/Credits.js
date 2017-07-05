import React, { PropTypes } from 'react'

const Credits = () => (
	<div style={{textAlign: 'center', margin: '15px 0px'}}>
		Powered by InstallThisApp.com | <a href="https://v3.installthisapp.com" target="_blank" title="Memory Match contest for Facebook Pages"><b>Get this app on your Facebook Page</b></a>
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