import React from 'react'

const Credits = () => (
	<div style={styles.container}>
		Powered by InstallThisApp.com |{' '}
		<a href="https://v3.installthisapp.com" target="_blank" rel="noopener" title="Memory Match contest for Facebook Pages">
			<b>Get this app for your Facebook Page</b>
		</a>
	</div>
)

const styles = {
	container: {
		display: 'block',
		width: '100%',
		textAlign: 'center',
		margin: '35px 0px 15px',
	},
}

export default Credits
