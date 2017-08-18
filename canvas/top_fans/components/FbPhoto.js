import React, { PropTypes } from 'react'

const FbPhoto = ({ className, identifier, width, height, style }) => (
	<a 
		href={`https://fb.com/${identifier}`} 
		target="_blank" rel="noopener" 
		style={{...style, display: 'inline-block', width: width, height: height}}
		>
		<img 
			className={className} 
			src={`https://graph.facebook.com/${identifier}/picture?width=100&height=100`}
			style={{
				width: '100%',
				borderRadius: '100px',
			}}
		/>
	</a>
)

FbPhoto.propTypes = {
	className: PropTypes.string,
	identifier: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]),
	width: PropTypes.number,
	height: PropTypes.number,
}

export default FbPhoto