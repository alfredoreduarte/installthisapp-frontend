import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/catalog/components/Index'
import Categories from 'canvas/catalog/components/Categories'
import SingleProduct from 'canvas/catalog/components/SingleProduct'

/** Product samples. */
const demoProducts = []

const Previews = ({ screen, messages, images }) => {
	switch (screen) {
		case 'intro':
			return <Index
				headerImage={images.header} 
				footerImage={images.footer} 
				currency={'US$'} 
				products={[]} 
				productListDisplayMode={'grid'} 
				categories={[]} 
				homeUrl={'#'} 
				toggleListGrid={() => void(0)}
			 />
		case 'category':
			return <Index
				headerImage={images.header} 
				footerImage={images.footer} 
				currency={'US$'} 
				products={[]} 
				productListDisplayMode={'grid'} 
				categories={[]} 
				homeUrl={'#'} 
				toggleListGrid={() => void(0)}
			 />
		case 'categories':
			return <Categories
				headerImage={images.header}
				footerImage={images.footer}
				categories={[]}
				homeUrl={'#'}
			 />
		case 'single':
			return <SingleProduct
				headerImage={images.header} 
				footerImage={images.footer} 
				productCategories={[]}
				productMedia={[]}
				permalink={'#'}
				title={'title'}
				description={'desc'}
				price={'US$128.00'}
				categories={[]}
				homeUrl={'#'}
				// 
				showContactModal={() => void(0)}
				handleToggleContact={() => void(0)}
			 />
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'intro', label: 'Products'},
	{ value: 'category', label: 'Products filtered by category'},
	{ value: 'categories', label: 'Categories list'},
	{ value: 'single', label: 'Individual Photo'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews