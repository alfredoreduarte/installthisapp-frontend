import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { ShareButtons } from 'react-share'
import bsBreakpoints from 'lib/bsBreakpoints'
import MdClose from 'react-icons/lib/md/close'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaWhatsapp from 'react-icons/lib/fa/whatsapp'
import MediaQuery from 'react-responsive'
import ImageGallery from 'react-image-gallery'
import Image from 'canvas/catalog/components/Image'
import Product from 'canvas/catalog/components/Product'

import SimpleModal from 'canvas/catalog/components/mobile/SimpleModal'
import ContactForm from 'canvas/catalog/components/mobile/ContactForm'
import TopBar from 'canvas/catalog/components/mobile/TopBar'

import Header from 'canvas/catalog/components/desktop/TopBar'
import Breadcrumbs from 'canvas/catalog/components/desktop/Breadcrumbs'
import LogoBar from 'canvas/catalog/components/desktop/LogoBar'
import Footer from 'canvas/catalog/components/desktop/Footer'

const {
	FacebookShareButton,
	WhatsappShareButton,
	TwitterShareButton,
} = ShareButtons

const SingleProduct = ({ 
	headerImage,
	footerImage,
	logoDesktop,
	logoMobile,
	// 
	footerCopy,
	topBarCopy,
	homePageLabel,
	categoriesListTitle,
	// 
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
	// 
	currency,
	relatedProducts,
	orderButton,
	relatedProductsTitle,
	// 
	requestFormTitle,
	requestFormHint,
	requestFormSentTitle,
	requestFormSentHint,
	requestFormEmail,
	requestFormPhone,
	requestFormMessage,
	requestFormSubmit,
}) => (
	<div>
		<div className="visible-xs hidden-sm hidden-md hidden-lg">
			<SimpleModal
				show={showContactModal}
				title={title}
				subtitle={price}
				thumbnail={productMedia.length > 0 ? productMedia[0].thumbnail : 'https://via.placeholder.com/100x100'}
				handleClose={handleToggleContact}
				requestFormTitle={requestFormTitle}
				requestFormHint={requestFormHint}
			>
				<ContactForm 
					sent={messageSent} 
					productId={productId}
					requestFormSentTitle={requestFormSentTitle}
					requestFormSentHint={requestFormSentHint}
					requestFormEmail={requestFormEmail}
					requestFormPhone={requestFormPhone}
					requestFormMessage={requestFormMessage}
					requestFormSubmit={requestFormSubmit}
				/>
			</SimpleModal>
			<TopBar homeUrl={homeUrl} logoImage={logoMobile} />
			<div style={{
				boxShadow: '0px 0px 8px rgba(0, 0, 0, .15)',
				borderRadius: '.25em',
				padding: '1em',
				display: 'flex',
				flexDirection: 'column',
				margin: '.5em 1em',
				background: 'white'
			}}>
				<MdClose onClick={browserHistory.goBack} size={20} color={'#DBDBDB'} style={{
					alignSelf: 'flex-end',
				}} />
				{productMedia.length > 0 && <ImageGallery
					items={productMedia}
					slideInterval={2000}
					lazyLoad={true}
					showBullets={true}
					showNav={false}
					showFullscreenButton={false}
					showThumbnails={false}
					showPlayButton={false}
					onImageLoad={() => console.log('load')}/>}
				<h1 className="ita-cali-mobile-single-product-title" style={{
					margin: '.5em 0em .1em',
				}}>{title}</h1>
				<h3 className="ita-cali-mobile-single-product-price" style={{
					margin: '0em 0em .5em',
				}}>{price}</h3>
				<p className="ita-cali-mobile-single-product-description" style={{
					margin: '.5em 0em',
				}}>{description}</p>
			</div>
			<button onClick={handleToggleContact} className="btn ita-cali-mobile-single-product-order-button" style={{
				padding: '1em',
				margin: '.5em 1em',
				border: 'none',
				borderRadius: '.25em',
			}}>{orderButton}</button>
		</div>

		<div className="hidden-xs visible-sm visible-md visible-lg">
			<SimpleModal
				show={showContactModal}
				title={title}
				subtitle={price}
				thumbnail={productMedia.length > 0 ? productMedia[0].thumbnail : 'https://via.placeholder.com/100x100'}
				handleClose={handleToggleContact}
				requestFormTitle={requestFormTitle}
				requestFormHint={requestFormHint}
			>
				<ContactForm 
					sent={messageSent} 
					productId={productId}
					requestFormSentTitle={requestFormSentTitle}
					requestFormSentHint={requestFormSentHint}
					requestFormEmail={requestFormEmail}
					requestFormPhone={requestFormPhone}
					requestFormMessage={requestFormMessage}
					requestFormSubmit={requestFormSubmit}
				/>
			</SimpleModal>
			<Header copy={topBarCopy} />
			<div className="container">
				<div className="col-md-12">
					<LogoBar homeUrl={homeUrl} logoImage={logoDesktop} />
				</div>
			</div>
			<div className="container">
				<div>
					<Breadcrumbs
						homeLabel={homePageLabel}
						homeUrl={homeUrl}
						childLabel={productCategories.length ? productCategories[productCategories.length - 1].name : null}
						childUrl={productCategories.length ? productCategories[productCategories.length - 1].permalink : null}
					 />
				</div>
				<div className="col-xs-12 col-sm-4 col-md-6 col-lg-6" style={{
					marginTop: '30px',
				}}>
					{productMedia.length > 0 && <ImageGallery
						showBullets={true}
						showNav={false}
						items={productMedia}
						slideInterval={2000}
						lazyLoad={true}
						showPlayButton={false}
						onImageLoad={() => console.log('load')}/>}
				</div>
				<div className="col-xs-12 col-sm-8 col-md-6 col-lg-6">
					<h1 className="ita-cali-desktop-single-product-title" style={{
						marginBottom: '0px',
					}}>{title}</h1>
					{productCategories.length ? 
						<p style={{
							marginBottom: '2em',
						}}>
							<Link 
								to={productCategories[productCategories.length - 1].permalink} 
								className="ita-cali-desktop-single-product-category"
							>
								{productCategories[productCategories.length - 1].name}
							</Link>
						</p>
					: null }
					<div className="ita-cali-desktop-single-product-description" style={{
						marginBottom: '2em',
					}}>
						{description}
					</div>
					<p className="ita-cali-desktop-single-product-price" style={{
						marginBottom: '2em',
					}}>{price}</p>
					<p><button onClick={handleToggleContact} className="btn ita-cali-desktop-single-product-order-button" style={{
						padding: '1em 2em',
						marginBottom: '2em',
						border: 'none',
						borderRadius: '.25em',
					}}>{orderButton}</button></p>
					<div style={{
						marginBottom: '2em',
					}}>
						<FacebookShareButton 
							url={`${location.protocol}//${window.location.host}${permalink}`}
							style={{
								display: 'inline-block',
								marginRight: '10px',
								backgroundColor: '#3A5B9A',
								borderRadius: '200px',
								padding: '15px',
								lineHeight: 1,
								cursor: 'pointer',
							}}
						>
							<FaFacebook size={14} color={'#ffffff'} />
						</FacebookShareButton>
						<TwitterShareButton 
							url={`${location.protocol}//${window.location.host}${permalink}`}
							style={{
								display: 'inline-block',
								marginRight: '10px',
								backgroundColor: '#00AEF0',
								borderRadius: '200px',
								padding: '15px',
								lineHeight: 1,
								cursor: 'pointer',
							}}
						>
							<FaTwitter size={14} color={'#ffffff'} />
						</TwitterShareButton>
						<WhatsappShareButton 
							url={`${location.protocol}//${window.location.host}${permalink}`}
							style={{
								display: 'inline-block',
								marginRight: '10px',
								backgroundColor: '#0DC143',
								borderRadius: '200px',
								padding: '15px',
								lineHeight: 1,
								cursor: 'pointer',
							}}
						>
							<FaWhatsapp size={14} color={'#ffffff'} />
						</WhatsappShareButton>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="col-md-12">
					<hr />
					<h3 className="ita-cali-desktop-single-product-related-title">{relatedProductsTitle}</h3>
				</div>
				<div style={{
					display: 'flex', 
					justifyContent: 'space-around', 
					flexWrap: 'wrap', 
					width: '100%', 
					padding: '0px 10%', 
					marginBottom: '2em'
				}}>
					{relatedProducts.map( ({ id, permalink, name, price, shortDescription, featured, featuredImage }) => 
						<Product 
							key={id} 
							size={33}
							displayMode={'grid'} 
							permalink={permalink} 
							title={name} 
							featured={featured} 
							price={price ? `${currency} ${price}` : null} 
							thumbnail={featuredImage ? featuredImage.attachmentUrl : 'https://via.placeholder.com/100x100'} 
							subtitle={shortDescription}
						/>
					)}
				</div>
			</div>
			<Footer copy={footerCopy} />
		</div>
	</div>
)

SingleProduct.propTypes = {
	// 
	headerImage: PropTypes.string,
	footerImage: PropTypes.string,
	logoDesktop: PropTypes.string,
	logoMobile: PropTypes.string,
	// 
	footerCopy: PropTypes.string,
	topBarCopy: PropTypes.string,
	homePageLabel: PropTypes.string,
	categoriesListTitle: PropTypes.string,
	// 
	categories: PropTypes.array.isRequired,
	homeUrl: PropTypes.string.isRequired,
	currency: PropTypes.string.isRequired,
	// screen-specific
	productCategories: PropTypes.array.isRequired,
	productMedia: PropTypes.array.isRequired,
	permalink: PropTypes.string.isRequired,
	productId: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	price: PropTypes.string,
	relatedProducts: PropTypes.array,
	messageSent: PropTypes.bool.isRequired,
	showContactModal: PropTypes.bool.isRequired,
	handleToggleContact: PropTypes.func.isRequired,
	orderButton: PropTypes.string.isRequired,
	relatedProductsTitle: PropTypes.string.isRequired,
	// 
	requestFormTitle: PropTypes.string.isRequired,
	requestFormHint: PropTypes.string.isRequired,
	requestFormSentTitle: PropTypes.string.isRequired,
	requestFormSentHint: PropTypes.string.isRequired,
	requestFormEmail: PropTypes.string.isRequired,
	requestFormPhone: PropTypes.string.isRequired,
	requestFormMessage: PropTypes.string.isRequired,
	requestFormSubmit: PropTypes.string.isRequired,
}

export default SingleProduct