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
				subtitle={price}
				thumbnail={productMedia[0].thumbnail}
				handleClose={handleToggleContact}
			>
				<ContactForm sent={messageSent} productId={productId} />
			</SimpleModal>
			<Header copy={"Phone: 021 123 456"} />
			<div className="container">
				<div className="col-md-12">
					<LogoBar 
						homeUrl={homeUrl} 
						logoImage={'https://s3-us-west-2.amazonaws.com/installthisapp/catalog-default-logo-desktop.png'}
					/>
				</div>
			</div>
			<div className="container">
				<div>
					<ol className="breadcrumb" style={{
						backgroundColor: 'transparent',
						borderWidth: '1px',
						borderStyle: 'solid',
						borderLeftWidth: '0px',
						borderRightWidth: '0px',
						borderRadius: '0px',
						padding: '15px',
						// design
						borderColor: '#DBDBDB',
					}}>
						<li><Link to={homeUrl} style={{
							// design
							lineHeight: 1.5,
							textAlign: 'left',
							color: '#5A6471',
							letterSpacing: '0px',
							fontSize: '12px',
							fontFamily: 'Montserrat',
							fontWeight: 'normal',
							fontStyle: 'normal',
							textDecoration: 'none',
							textTransform: 'none',
						}}>Home page</Link></li>
						<li><Link to={productCategories[productCategories.length - 1].permalink} style={{
							// design
							lineHeight: 1.5,
							textAlign: 'left',
							color: '#5A6471',
							letterSpacing: '0px',
							fontSize: '12px',
							fontFamily: 'Montserrat',
							fontWeight: 'normal',
							fontStyle: 'normal',
							textDecoration: 'none',
							textTransform: 'none',
						}}>{productCategories[productCategories.length - 1].name}</Link></li>
					</ol>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-6 col-lg-6" style={{
					marginTop: '30px',
				}}>
					<ImageGallery
						// items={productMedia}
						// slideInterval={2000}
						// lazyLoad={true}
						showBullets={true}
						showNav={false}
						// showFullscreenButton={false}
						// showThumbnails={false}
						// showPlayButton={false}
						// 
						items={productMedia}
						slideInterval={2000}
						lazyLoad={true}
						showPlayButton={false}
						onImageLoad={() => console.log('load')}/>
				</div>
				<div className="col-xs-12 col-sm-8 col-md-6 col-lg-6">
					<h1 style={{
						marginBottom: '0px',
						// design
						lineHeight: 1.5,
						textAlign: 'left',
						color: '#5A6471',
						letterSpacing: '0px',
						fontSize: '32px',
						fontFamily: 'Montserrat',
						fontWeight: 'normal',
						fontStyle: 'normal',
						textDecoration: 'none',
						textTransform: 'none',
					}}>{title}</h1>
					<p style={{
						marginBottom: '2em',
					}}>
						<Link to={productCategories[productCategories.length - 1].permalink} style={{
							// design
							lineHeight: 1.5,
							textAlign: 'left',
							color: '#6A588B',
							letterSpacing: '0px',
							fontSize: '12px',
							fontFamily: 'Montserrat',
							fontWeight: '300',
							fontStyle: 'normal',
							textDecoration: 'none',
							textTransform: 'none',
						}}>{productCategories[productCategories.length - 1].name}</Link>
					</p>
					<div style={{
						marginBottom: '2em',
						// design
						lineHeight: 2,
						textAlign: 'left',
						color: '#5A6471',
						letterSpacing: '0px',
						fontSize: '14px',
						fontFamily: 'Montserrat',
						fontWeight: '300',
						fontStyle: 'normal',
						textDecoration: 'none',
						textTransform: 'none',
					}}>
						{description}
					</div>
					<p style={{
						marginBottom: '2em',
						// design
						lineHeight: 1.5,
						textAlign: 'left',
						color: '#5A6471',
						letterSpacing: '0px',
						fontSize: '18px',
						fontFamily: 'Montserrat',
						fontWeight: 'normal',
						fontStyle: 'normal',
						textDecoration: 'none',
						textTransform: 'none',
					}}>{price}</p>
					<p><button onClick={handleToggleContact} className="btn" style={{
						padding: '1em 2em',
						marginBottom: '2em',
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
					}}>Order</button></p>
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
					<h3 style={{
						// design
						lineHeight: 1.5,
						textAlign: 'center',
						color: '#3D0843',
						letterSpacing: '0px',
						fontSize: '18px',
						fontFamily: 'Montserrat',
						fontWeight: 'normal',
						fontStyle: 'normal',
						textDecoration: 'none',
						textTransform: 'uppercase',
					}}>Related Products</h3>
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
							thumbnail={featuredImage.attachmentUrl} 
							subtitle={shortDescription}
						/>
					)}
				</div>
			</div>
			<Footer copy={'© 2017 - My Store - All rights reserved'} />
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