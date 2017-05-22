import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { ShareButtons } from 'react-share'
import bsBreakpoints from 'lib/bsBreakpoints'
import MdClose from 'react-icons/lib/md/close'
import MediaQuery from 'react-responsive'
import ImageGallery from 'react-image-gallery'
import Image from 'canvas/catalog/components/Image'
import Header from 'canvas/catalog/components/Header'

import SimpleModal from 'canvas/catalog/components/mobile/SimpleModal'
import ContactForm from 'canvas/catalog/components/mobile/ContactForm'
import TopBar from 'canvas/catalog/components/mobile/TopBar'

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
	productId,
	messageSent,
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
		<MediaQuery maxWidth={bsBreakpoints.sm - 1} style={{
			display: 'flex',
			flexDirection: 'column',
		}}>
			<SimpleModal
				show={showContactModal}
				title={title}
				subtitle={price}
				thumbnail={productMedia[0].thumbnail}
				handleClose={handleToggleContact}
			>
				<ContactForm sent={messageSent} productId={productId} />
			</SimpleModal>
			<TopBar homeUrl={homeUrl} logoImage={'https://s3-us-west-2.amazonaws.com/installthisapp/catalog-default-logo-mobile.png'} />
			<div style={{
				boxShadow: '0px 0px 8px rgba(0, 0, 0, .15)',
				borderRadius: '.25em',
				padding: '1em',
				display: 'flex',
				flexDirection: 'column',
				margin: '.5em 1em',
				background: 'white',
				// design
			}}>
				<MdClose onClick={browserHistory.goBack} size={20} color={'#DBDBDB'} style={{
					alignSelf: 'flex-end',
				}} />
				<ImageGallery
					items={productMedia}
					slideInterval={2000}
					lazyLoad={true}
					showBullets={true}
					showNav={false}
					showFullscreenButton={false}
					showThumbnails={false}
					showPlayButton={false}
					onImageLoad={() => console.log('load')}/>
				<h1 style={{
					margin: '.5em 0em .1em',
					// design
					lineHeight: 1.5,
					textAlign: 'left',
					color: '#5A6471',
					letterSpacing: '0px',
					fontSize: '19px',
					fontFamily: 'Montserrat',
					fontWeight: 'normal',
					fontStyle: 'normal',
					textDecoration: 'none',
					textTransform: 'none',
				}}>{title}</h1>
				<h3 style={{
					margin: '0em 0em .5em',
					// design
					lineHeight: 1.5,
					textAlign: 'left',
					color: '#5A6471',
					letterSpacing: '0px',
					fontSize: '11px',
					fontFamily: 'Montserrat',
					fontWeight: 'bold',
					fontStyle: 'normal',
					textDecoration: 'none',
					textTransform: 'none',
				}}>{price}</h3>
				<p style={{
					margin: '.5em 0em',
					// design
					lineHeight: 2,
					textAlign: 'left',
					color: '#5A6471',
					letterSpacing: '0px',
					fontSize: '12px',
					fontFamily: 'Montserrat',
					fontWeight: '300',
					fontStyle: 'normal',
					textDecoration: 'none',
					textTransform: 'none',
				}}>{description}</p>
			</div>
			<button onClick={handleToggleContact} className="btn" style={{
				padding: '1em',
				margin: '.5em 1em',
				border: 'none',
				borderRadius: '.25em',
				// design
				lineHeight: 1.5,
				textAlign: 'center',
				color: '#ffffff',
				backgroundColor: '#6A588B',
				letterSpacing: '0px',
				fontSize: '18px',
				fontFamily: 'Montserrat',
				fontWeight: 'normal',
				fontStyle: 'normal',
				textDecoration: 'none',
				textTransform: 'uppercase',
			}}>Order</button>
		</MediaQuery>
		<MediaQuery minWidth={bsBreakpoints.sm}>
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
		</MediaQuery>
	</div>
)

SingleProduct.propTypes = {
	homeUrl: PropTypes.string.isRequired,
	permalink: PropTypes.string.isRequired,
	price: PropTypes.string,
	// image: PropTypes.string.isRequired,
	// linkUrl: PropTypes.string.isRequired,
}

export default SingleProduct