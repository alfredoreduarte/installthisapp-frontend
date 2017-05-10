import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import CategoriesList from 'canvas/catalog/components/CategoriesList'
import Image from 'canvas/catalog/components/Image'
import Product from 'canvas/catalog/components/Product'

const Index = ({ 
	headerImage,
	footerImage,
	products,
	categories,
}) => (
	<div>
		<Image source={headerImage} />
		<div className="container">
			<div className="col-md-12">
				<h1>Products</h1>
			</div>
		</div>
		<div className="container">
			<div className="col-md-2">
				<CategoriesList categories={categories} />
			</div>
			<div className="col-md-10">
				<div className="row">
					{products.map( ({ id, slug, name, price, shortDescription }) => <Product key={id} slug={slug} title={name} price={price} shortDescription={shortDescription} />)}
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