import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import CategoriesList from 'canvas/catalog/components/CategoriesList'
import Image from 'canvas/catalog/components/Image'
import Product from 'canvas/catalog/components/Product'
import Header from 'canvas/catalog/components/Header'

const Index = ({ 
	headerImage,
	footerImage,
	currency,
	products,
	categories,
}) => (
	<div>
		<div className="container">
			<Header logoImage={'https://localhost.ssl:5000/images/logo-round.png'} />
		</div>
		<div className="container">
			<div className="col-md-2">
				<CategoriesList categories={categories} />
			</div>
			<div className="col-md-10">
				<div className="row">
					{products.map( ({ id, permalink, name, price, shortDescription, featuredImage }) => 
						<Product 
							key={id} 
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
}

export default Index