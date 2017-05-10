import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { ButtonGroup, Button } from 'react-bootstrap'
import CategoriesList from 'canvas/catalog/components/CategoriesList'
import Image from 'canvas/catalog/components/Image'
import Product from 'canvas/catalog/components/Product'
import Header from 'canvas/catalog/components/Header'

const Index = ({ 
	headerImage,
	footerImage,
	currency,
	products,
	homeUrl,
	productListDisplayMode,
	categories,
	toggleListGrid,
}) => (
	<div>
		<div className="container">
			<Header homeUrl={homeUrl} logoImage={'https://localhost.ssl:5000/images/logo-round.png'} />
		</div>
		<div className="container">
			<div className="col-md-2">
				<CategoriesList categories={categories} />
			</div>
			<div className="col-md-10">
				<div className="row">
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
		</div>
		<Image source={footerImage} />
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