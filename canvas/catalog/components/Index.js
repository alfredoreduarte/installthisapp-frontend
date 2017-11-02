import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { ButtonGroup, Button } from 'react-bootstrap'
import bsBreakpoints from 'lib/bsBreakpoints'
import MediaQuery from 'react-responsive'
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted'
import MdGridOn from 'react-icons/lib/md/grid-on'
import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/catalog/components/Image'
import Product from 'canvas/catalog/components/Product'
import ProductListView from 'canvas/catalog/components/ProductListView'

import TopBar from 'canvas/catalog/components/mobile/TopBar'
import CategoriesListMobile from 'canvas/catalog/components/mobile/CategoriesList'
import CategoryTitle from 'canvas/catalog/components/mobile/CategoryTitle'

import Breadcrumbs from 'canvas/catalog/components/desktop/Breadcrumbs'
import Header from 'canvas/catalog/components/desktop/TopBar'
import LogoBar from 'canvas/catalog/components/desktop/LogoBar'
import Footer from 'canvas/catalog/components/desktop/Footer'
import CategoriesList from 'canvas/catalog/components/desktop/CategoriesList'

const Index = ({
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
	currency,
	products,
	homeUrl,
	productListDisplayMode,
	category,
	categories,
	toggleListGrid,
}) => (
	<div>
		<div>
			<Image source={headerImage} />
		</div>
		<div className="visible-xs hidden-sm hidden-md hidden-lg">
			<TopBar homeUrl={homeUrl} logoImage={logoMobile} />
			<CategoriesListMobile showBack={category ? true : false} categories={categories} />
			{category ? <CategoryTitle text={category.name} /> : null}
			<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
				{products.map(({ id, permalink, name, price, shortDescription, featured, featuredImage }) => (
					<Product
						key={id}
						size={50}
						displayMode={productListDisplayMode}
						permalink={permalink}
						title={name}
						featured={featured}
						price={price ? `${currency} ${price}` : null}
						thumbnail={featuredImage ? featuredImage.attachmentUrl : 'http://via.placeholder.com/100x100'}
						subtitle={shortDescription}
					/>
				))}
			</div>
		</div>
		<div className="hidden-xs visible-sm visible-md visible-lg">
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
						childLabel={category ? category.name : null}
						childUrl={category ? category.permalink : null}
					/>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}>
						<ButtonGroup>
							<Button disabled={productListDisplayMode == 'grid'} onClick={toggleListGrid}>
								<MdGridOn size={20} color={'#5A6471'} />
							</Button>
							<Button disabled={productListDisplayMode == 'list'} onClick={toggleListGrid}>
								<MdFormatListBulleted size={20} color={'#5A6471'} />
							</Button>
						</ButtonGroup>
					</div>
				</div>
				<div className="col-xs-3 col-sm-3 col-md-2">
					<CategoriesList title={categoriesListTitle} categories={categories} />
				</div>
				{productListDisplayMode == 'grid' ? (
					<div
						className="col-xs-9 col-sm-9 col-md-9 col-md-offset-1"
						style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
						{products.map(({ id, permalink, name, price, shortDescription, featured, featuredImage }) => (
							<Product
								key={id}
								size={33}
								displayMode={productListDisplayMode}
								permalink={permalink}
								title={name}
								featured={featured}
								price={price ? `${currency} ${price}` : null}
								thumbnail={featuredImage ? featuredImage.attachmentUrl : 'http://via.placeholder.com/100x100'}
								subtitle={shortDescription}
							/>
						))}
					</div>
				) : (
					<div
						className="col-xs-9 col-sm-9 col-md-9 col-md-offset-1"
						style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
						{products.map(({ id, permalink, name, price, shortDescription, featured, featuredImage }) => (
							<ProductListView
								key={id}
								size={33}
								displayMode={productListDisplayMode}
								permalink={permalink}
								title={name}
								featured={featured}
								price={price ? `${currency} ${price}` : null}
								thumbnail={featuredImage.attachmentUrl}
								subtitle={shortDescription}
							/>
						))}
					</div>
				)}
			</div>
			<Footer copy={footerCopy} />
		</div>
		<div>
			<Image source={footerImage} />
		</div>
		<Credits />
	</div>
)

Index.propTypes = {
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
	products: PropTypes.array.isRequired,
	productListDisplayMode: PropTypes.string.isRequired,
	category: PropTypes.object,
	toggleListGrid: PropTypes.func.isRequired,
}

export default Index
