import React, { PropTypes } from 'react'

const Credits = () => (
	<div style={{textAlign: 'center', margin: '15px 0px'}}>
		Powered by InstallThisApp.com | <a href="https://v3.installthisapp.com/trivia-contest.html" target="_blank" title="Trivia Quiz for Facebook pages">Run a Trivia Quiz in your Facebook Page</a>
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