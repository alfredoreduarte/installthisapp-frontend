import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/catalog/components/Image'

const SingleProduct = ({ headerImage, footerImage, galleryImages, productCategories, productMedia, title, description, price, categories }) => (
	<div>
		<Image source={headerImage} />
		<div className="container">
			<div className="col-md-12">
				<ol className="breadcrumb">
					<li><a href="#">Homepage</a></li>
					<li><a href="#">{productCategories[0].name}</a></li>
				</ol>
			</div>
			<div className="col-xs-12 col-sm-4 col-md-6 col-lg-6">
				{productMedia.map(({ id, attachmentUrl }) => 
					<img key={id} src={attachmentUrl} className="img-responsive" />
				)}
			</div>
			<div className="col-xs-12 col-sm-8 col-md-6 col-lg-6">
				<h1>{title}</h1>
				<ul className="list-unstyled">
					<li>social btn</li>
					<li>social btn</li>
					<li>social btn</li>
				</ul>
				<div>
					{description}
				</div>
				<p>{price}</p>
				<p><Link to={'contact-form'} className="btn btn-lg">Order</Link></p>
			</div>
		</div>
		<Image source={footerImage} />
	</div>
)

SingleProduct.propTypes = {
	// image: PropTypes.string.isRequired,
	// linkUrl: PropTypes.string.isRequired,
}

export default SingleProduct