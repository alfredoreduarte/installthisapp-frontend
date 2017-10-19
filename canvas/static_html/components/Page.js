import React, { PropTypes } from 'react'
import Frame from 'react-frame-component'

const Page = ({ messages, images, settings }) => 
<div>
	{settings.contentMode == 'iframe' &&
		<iframe style={frameStyles} src={settings.iframeUrl} />
	}
	{settings.contentMode == 'html' && <Frame style={frameStyles}>
		<div dangerouslySetInnerHTML={{__html:settings.htmlContent}} />
	</Frame>}
</div>

Page.propTypes = {
	
}

const frameStyles = {
	width: '100%',
	height: '100%',
	position: 'absolute',
	border: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
}

export default Page