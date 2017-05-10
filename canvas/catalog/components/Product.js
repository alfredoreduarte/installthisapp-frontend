import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Image from 'canvas/catalog/components/Image'

const Product = ({ 
	slug,
	title,
	description,
	price,
}) => (
	<div className="col-xs-12 col-sm-6 col-md-3">
		<h1><Link to={'SDBCA7/' + slug}>{title}</Link></h1>
		<p>{description}</p>
		<p>{price}</p>
	</div>
)

Product.propTypes = {
	slug: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	price: PropTypes.string,
}


export default Product