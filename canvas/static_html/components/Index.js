import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from 'canvas/static_html/components/Image'

const Index = ({ 
	headerImage,
	footerImage,
	entries
}) => (
	<div>
		<Image source={headerImage} />
		<h1>Entries</h1>
		<ul>
			{entries.map( entry => <li>{entry}</li>)}
		</ul>
		<Image source={footerImage} />
	</div>
)

Index.propTypes = {
	headerImage: PropTypes.string,
	footerImage: PropTypes.string,
	entries: PropTypes.array.isRequired,
}

export default Index