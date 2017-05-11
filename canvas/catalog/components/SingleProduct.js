import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { ShareButtons } from 'react-share'
import ImageGallery from 'react-image-gallery'
import Image from 'canvas/catalog/components/Image'
import SimpleModal from 'canvas/catalog/components/SimpleModal'
import ContactForm from 'canvas/catalog/components/ContactForm'
import Header from 'canvas/catalog/components/Header'

const {
	FacebookShareButton,
	WhatsappShareButton,
	TwitterShareButton,
} = ShareButtons

const SingleProduct = ({ 
	headerImage, 
	footerImage, 
	productCategories, 
	productMedia, 
	permalink,
	title,
	description,
	price,
	categories,
	homeUrl,
	// 
	showContactModal,
	handleToggleContact,
}) => (
	<div>
		<SimpleModal
			show={showContactModal}
			title={title}
			subtitle={description}
			thumbnail={productMedia[0].thumbnail}
			handleClose={handleToggleContact}
		>
			<ContactForm />
		</SimpleModal>
		<div className="container">
			<Header homeUrl={homeUrl} logoImage={'https://localhost.ssl:5000/images/logo-round.png'} />
		</div>
		<div className="container">
			<div className="col-md-12">
				<ol className="breadcrumb">
					<li><Link to={homeUrl}>Homepage</Link></li>
					<li><Link to={productCategories[0].permalink}>{productCategories[0].name}</Link></li>
				</ol>
			</div>
			<div className="col-xs-12 col-sm-4 col-md-6 col-lg-6">
				<ImageGallery
				items={productMedia}
				slideInterval={2000}
				lazyLoad={true}
				showPlayButton={false}
				onImageLoad={() => console.log('load')}/>
			</div>
			<div className="col-xs-12 col-sm-8 col-md-6 col-lg-6">
				<h1>{title}</h1>
				<ul className="list-unstyled">
					<li>
						<FacebookShareButton 
							className="btn btn-primary" 
							url={`${location.protocol}//${window.location.host}${permalink}`}
						>
							Share on Facebook
						</FacebookShareButton>
					</li>
					<li>
						<TwitterShareButton 
							className="btn btn-primary" 
							url={`${location.protocol}//${window.location.host}${permalink}`}
						>
							Share on Twitter
						</TwitterShareButton>
					</li>
					<li>
						<WhatsappShareButton 
							className="btn btn-primary" 
							url={`${location.protocol}//${window.location.host}${permalink}`}
						>
							Share on Whatsapp
						</WhatsappShareButton>
					</li>
				</ul>
				<div>
					{description}
				</div>
				<p>{price}</p>
				<p><button onClick={handleToggleContact} className="btn btn-lg btn-primary">Order</button></p>
			</div>
		</div>
		<Image source={footerImage} />
	</div>
)

SingleProduct.propTypes = {
	homeUrl: PropTypes.string.isRequired,
	permalink: PropTypes.string.isRequired,
	// image: PropTypes.string.isRequired,
	// linkUrl: PropTypes.string.isRequired,
}

export default SingleProduct