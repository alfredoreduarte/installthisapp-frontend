import React, { PropTypes } from 'react'

const Credits = () => (
	<div style={{textAlign: 'center', margin: '15px 0px'}}>
		Powered by InstallThisApp.com | <a href="https://v3.installthisapp.com/photo-contest.html" target="_blank" title="Photo Contest for Facebook Pages">Run a Photo Contest in your Facebook Page</a>
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