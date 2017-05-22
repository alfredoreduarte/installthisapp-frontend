/**
 * @flow
 */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { ButtonGroup, Button } from 'react-bootstrap'
import bsBreakpoints from 'lib/bsBreakpoints'
import MediaQuery from 'react-responsive'
import CategoriesList from 'canvas/catalog/components/CategoriesList'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import Image from 'canvas/catalog/components/Image'
import Product from 'canvas/catalog/components/Product'
import TopBar from 'canvas/catalog/components/mobile/TopBar'


import Header from 'canvas/catalog/components/desktop/TopBar'
import LogoBar from 'canvas/catalog/components/desktop/LogoBar'
import Footer from 'canvas/catalog/components/desktop/Footer'

const Index = ({ 
	headerImage,
	footerImage,
	currency,
	products,
	homeUrl,
	productListDisplayMode,
	category,
	categories,
	toggleListGrid,
}: {
	headerImage: string,
	footerImage: string,
	currency: string,
	products: Array<{
		id: number,
		permalink: string,
		name: string,
		price: string,
		shortDescription: string,
		featuredImage: {
			attachmentUrl: string,
		},
	}>,
	homeUrl: string,
	productListDisplayMode: string,
	categories: string,
	toggleListGrid: string
}) => (
	<div>
		<MediaQuery maxWidth={bsBreakpoints.sm - 1}>
			<TopBar homeUrl={homeUrl} logoImage={'https://s3-us-west-2.amazonaws.com/installthisapp/catalog-default-logo-mobile.png'} />
			<div style={{
				display: 'flex',
				flexWrap: 'nowrap',
				marginBottom: '.5em',
				// design
				backgroundColor: '#F3F3F3',
			}}>
				{category ? 
				<div style={{
					flex: '0 0 auto',
					padding: '13px 16px 12px',
				}}>
					<MdArrowBack size={20} color={'#5A6471'} onClick={browserHistory.goBack} />
				</div>
				: null }
				<div style={{
					display: 'flex',
					flexWrap: 'nowrap',
					overflow: 'auto',
					'-webkit-overflow-scrolling': 'touch',
					'-ms-overflow-style': '-ms-autohiding-scrollbar',
				}}>
					{categories.map(cat => <Link key={cat.slug} to={cat.permalink} style={{
						flex: '0 0 auto',
						padding: '13px 16px 12px',
						// design
						lineHeight: 1.5,
						textAlign: 'left',
						color: '#6A588B',
						letterSpacing: '0px',
						fontSize: '12px',
						fontFamily: 'Montserrat',
						fontWeight: '300',
						fontStyle: 'normal',
						// textDecoration: 'none',
						textTransform: 'none',
					}}>{cat.name}</Link>)}
				</div>
			</div>
			{category ? <div className="col-md-12"><h1 style={{
				// design
				lineHeight: 1.5,
				textAlign: 'left',
				color: '#5A6471',
				letterSpacing: '0px',
				fontSize: '18px',
				fontFamily: 'Montserrat',
				fontWeight: '300',
				fontStyle: 'normal',
				textDecoration: 'none',
				textTransform: 'none',
			}}>{category.name}</h1></div> : null}
			<div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
				{products.map( ({ id, permalink, name, price, shortDescription, featured, featuredImage }) => 
					<Product 
						key={id} 
						displayMode={productListDisplayMode} 
						permalink={permalink} 
						title={name} 
						featured={featured} 
						price={price ? `${currency} ${price}` : null} 
						thumbnail={featuredImage.attachmentUrl} 
						subtitle={shortDescription}
					/>
				)}
			</div>
		</MediaQuery>
		<MediaQuery minWidth={bsBreakpoints.sm}>
			<Header copy={"Phone: 021 123 456"} />
			<div className="container">
				<div className="col-md-12">
					<LogoBar homeUrl={homeUrl} logoImage={'https://localhost.ssl:5000/images/logo-round.png'} />
				</div>
			</div>
			<div className="container">
				<div className="col-md-12 hide">
					<ButtonGroup>
						<Button disabled={productListDisplayMode == 'grid'} onClick={toggleListGrid}>
							Grid
						</Button>
						<Button disabled={productListDisplayMode == 'list'} onClick={toggleListGrid}>
							List
						</Button>
					</ButtonGroup>
				</div>

				<div className="col-md-12 hide">
					<ol className="breadcrumb">
						<li><Link to={homeUrl}>Home page</Link></li>
						<li><Link to={'#'}>Products</Link></li>
					</ol>
				</div>
				<div className="col-md-2">
					<CategoriesList title="Categories" categories={categories} />
				</div>
				<div className="col-xs-12 col-sm-12 col-md-10" style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
					{products.map( ({ id, permalink, name, price, shortDescription, featured, featuredImage }) => 
						<Product 
							key={id} 
							displayMode={productListDisplayMode} 
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
			<Footer copy={'fdsa'} />
		</MediaQuery>
	</div>
)

Index.propTypes = {
	headerImage: PropTypes.string,
	footerImage: PropTypes.string,
	products: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	homeUrl: PropTypes.string.isRequired,
}

export default Index