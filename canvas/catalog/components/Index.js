/**
 * @flow
 */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { ButtonGroup, Button } from 'react-bootstrap'
import bsBreakpoints from 'lib/bsBreakpoints'
import MediaQuery from 'react-responsive'
import CategoriesList from 'canvas/catalog/components/CategoriesList'
import Image from 'canvas/catalog/components/Image'
import Product from 'canvas/catalog/components/Product'
import Header from 'canvas/catalog/components/desktop/TopBar'
import Footer from 'canvas/catalog/components/desktop/Footer'
import TopBar from 'canvas/catalog/components/mobile/TopBar'

const Index = ({ 
	headerImage,
	footerImage,
	currency,
	products,
	homeUrl,
	productListDisplayMode,
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
			<TopBar homeUrl={homeUrl} logoImage={'https://localhost.ssl:5000/images/logo-round.png'} />
			<div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
				{products.map( ({ id, permalink, name, price, shortDescription, featuredImage }) => 
					<Product 
						key={id} 
						displayMode={productListDisplayMode} 
						permalink={permalink} 
						title={name} 
						price={`${currency} ${price}`} 
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
					<ButtonGroup>
						<Button disabled={productListDisplayMode == 'grid'} onClick={toggleListGrid}>
							Grid
						</Button>
						<Button disabled={productListDisplayMode == 'list'} onClick={toggleListGrid}>
							List
						</Button>
					</ButtonGroup>
				</div>
				<div className="col-md-2">
					<CategoriesList categories={categories} />
				</div>
				<div className="col-xs-12 col-sm-12 col-md-10" style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
					{products.map( ({ id, permalink, name, price, shortDescription, featuredImage }) => 
						<Product 
							key={id} 
							displayMode={productListDisplayMode} 
							permalink={permalink} 
							title={name} 
							price={`${currency} ${price}`} 
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