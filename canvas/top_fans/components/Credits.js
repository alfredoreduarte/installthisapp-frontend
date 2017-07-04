import React, { PropTypes } from 'react'

const Credits = () => (
	<div style={{textAlign: 'center', margin: '15px 0px'}}>
		Powered by InstallThisApp.com | <a href="https://v3.installthisapp.com/top-fans-for-facebook-pages.html" target="_blank" title="Top Fans contest for Facebook pages"><b>Get this app on your Facebook page</b></a>
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