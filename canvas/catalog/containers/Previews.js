import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/catalog/components/Index'
import Categories from 'canvas/catalog/components/Categories'
import SingleProduct from 'canvas/catalog/components/SingleProduct'

/** Product samples. */
const demoProducts = [{"id":3,"name":"Smeg Toaster","slug":"smeg-toaster","featured":true,"description":"Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur.\n\nMaecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue.","shortDescription":"Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.","price":"128","regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":7,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1494729713398-234036685.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-14T02:41:58.630Z","updatedAt":"2017-05-14T02:41:58.630Z"},"permalink":"#","createdAt":"2017-05-04T23:18:48.222Z","media":[7,18],"categories":[5,4]},{"id":5,"name":"Mixer","slug":"mixer","featured":false,"description":"Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.","shortDescription":"Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.","price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":8,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495122797735-41UykMs7lIL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T15:53:20.538Z","updatedAt":"2017-05-18T15:53:20.538Z"},"permalink":"#","createdAt":"2017-05-18T15:53:35.981Z","media":[8],"categories":[7,4]},{"id":6,"name":"Kettle","slug":"kettle","featured":false,"description":"Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.","shortDescription":"Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur.","price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":9,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123353945-41PTBFWo JL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:02:36.185Z","updatedAt":"2017-05-18T16:02:36.185Z"},"permalink":"#","createdAt":"2017-05-18T15:56:21.647Z","media":[9],"categories":[4,8]},{"id":7,"name":"B&D Toaster","slug":"b-d-toaster","featured":false,"description":null,"shortDescription":"Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":10,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123400817-41TeJL3iFpL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:03:22.959Z","updatedAt":"2017-05-18T16:03:22.959Z"},"permalink":"#","createdAt":"2017-05-18T16:03:44.462Z","media":[10],"categories":[5,4]},{"id":8,"name":"Electric Kettle","slug":"electric-kettle","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":11,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123452539-41uKBlLEluL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:04:14.737Z","updatedAt":"2017-05-18T16:04:14.737Z"},"permalink":"#","createdAt":"2017-05-18T16:04:20.432Z","media":[11],"categories":[8,4]},{"id":9,"name":"HandVac","slug":"hand-vac","featured":true,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":12,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123771868-red hand vaccum.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:09:34.360Z","updatedAt":"2017-05-18T16:09:34.360Z"},"permalink":"#","createdAt":"2017-05-18T16:09:41.043Z","media":[12],"categories":[4,9]},{"id":10,"name":"Coffee machine","slug":"coffee-machine","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":13,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123869118-coffeemaker.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:11:11.926Z","updatedAt":"2017-05-18T16:11:11.926Z"},"permalink":"#","createdAt":"2017-05-18T16:11:15.383Z","media":[13],"categories":[4,10]},{"id":11,"name":"Dishrack","slug":"dishrack","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":14,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123889750-dishrack.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:11:31.604Z","updatedAt":"2017-05-18T16:11:31.604Z"},"permalink":"#","createdAt":"2017-05-18T16:11:38.640Z","media":[14],"categories":[4,11]},{"id":12,"name":"Kitchen Thermometer","slug":"kitchen-thermometer","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":15,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495124028579-thermo.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:13:50.719Z","updatedAt":"2017-05-18T16:13:50.719Z"},"permalink":"#","createdAt":"2017-05-18T16:13:55.360Z","media":[15],"categories":[4,13]},{"id":13,"name":"Induction Kitchen","slug":"induction-kitchen","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":16,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495124054331-kitchen.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:14:16.152Z","updatedAt":"2017-05-18T16:14:16.152Z"},"permalink":"#","createdAt":"2017-05-18T16:14:20.578Z","media":[16],"categories":[4,12]}]
const demoProduct = demoProducts[0]
const demoCategories = [{"id":4,"name":"Home Appliances","slug":"home-appliances","lft":1,"parentId":null,"permalink":"#","createdAt":"2017-05-18T14:39:36.073Z"},{"id":5,"name":"Toasters","slug":"toasters","lft":2,"parentId":4,"permalink":"#","createdAt":"2017-05-18T14:39:57.748Z"},{"id":7,"name":"Mixers","slug":"mixers","lft":4,"parentId":4,"permalink":"#","createdAt":"2017-05-18T15:54:19.025Z"},{"id":8,"name":"Kettles","slug":"kettles","lft":6,"parentId":4,"permalink":"#","createdAt":"2017-05-18T16:01:05.273Z"},{"id":9,"name":"Hand vaccums","slug":"hand-vaccums","lft":8,"parentId":4,"permalink":"#","createdAt":"2017-05-18T16:09:56.883Z"},{"id":10,"name":"Coffee Machines","slug":"coffee-machines","lft":10,"parentId":4,"permalink":"#","createdAt":"2017-05-18T16:10:21.599Z"},{"id":11,"name":"Dish racks","slug":"dish-racks","lft":12,"parentId":4,"permalink":"#","createdAt":"2017-05-18T16:10:36.557Z"},{"id":12,"name":"Electric kitchentops","slug":"electric-kitchentops","lft":14,"parentId":4,"permalink":"#","createdAt":"2017-05-18T16:12:41.576Z"},{"id":13,"name":"Kitchen thermometers","slug":"kitchen-thermometers","lft":16,"parentId":4,"permalink":"#","createdAt":"2017-05-18T16:13:11.855Z"}]
const demoProductMedia = [{"id":7,"attachment_url":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1494729713398-234036685.jpg","original":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1494729713398-234036685.jpg","thumbnail":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1494729713398-234036685.jpg","created_at":"2017-05-14T02:41:58.630Z"},{"id":18,"attachment_url":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495141689191-u_10136164.jpg","original":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495141689191-u_10136164.jpg","thumbnail":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495141689191-u_10136164.jpg","created_at":"2017-05-18T21:08:13.234Z"}]

const Previews = ({ screen, messages, images, settings }) => {
	switch (screen) {
		case 'intro':
			return <Index
				// 
				headerImage={images.header} 
				footerImage={images.footer} 
				logoDesktop={images.logoDesktop} 
				logoMobile={images.logoMobile}
				// 
				footerCopy={messages.footerCopy}
				topBarCopy={messages.topBarCopy}
				homePageLabel={messages.homePage}
				categoriesListTitle={messages.categories}
				// 
				categories={demoCategories} 
				homeUrl="#"
				currency={settings.currency} 
				// screen-specific
				products={demoProducts} 
				productListDisplayMode={'grid'} 
				category={null} 
				toggleListGrid={() => void(0)}
			 />
		case 'listView':
			return <Index
				// 
				headerImage={images.header} 
				footerImage={images.footer} 
				logoDesktop={images.logoDesktop} 
				logoMobile={images.logoMobile}
				// 
				footerCopy={messages.footerCopy}
				topBarCopy={messages.topBarCopy}
				homePageLabel={messages.homePage}
				categoriesListTitle={messages.categories}
				// 
				categories={demoCategories} 
				homeUrl="#"
				currency={settings.currency} 
				// screen-specific
				products={demoProducts} 
				productListDisplayMode={'list'} 
				category={null} 
				toggleListGrid={() => void(0)}
			 />
		case 'category':
			return <Index
				// 
				headerImage={images.header} 
				footerImage={images.footer} 
				logoDesktop={images.logoDesktop} 
				logoMobile={images.logoMobile}
				// 
				footerCopy={messages.footerCopy}
				topBarCopy={messages.topBarCopy}
				homePageLabel={messages.homePage}
				categoriesListTitle={messages.categories}
				// 
				categories={demoCategories} 
				homeUrl="#"
				currency={settings.currency} 
				// screen-specific
				products={demoProducts.slice(3, 6)} 
				productListDisplayMode={'grid'} 
				category={demoCategories[0]} 
				toggleListGrid={() => void(0)}
			 />
		case 'single':
			return <SingleProduct
				// 
				headerImage={images.header} 
				footerImage={images.footer} 
				logoDesktop={images.logoDesktop} 
				logoMobile={images.logoMobile} 
				// 
				footerCopy={messages.footerCopy}
				topBarCopy={messages.topBarCopy}
				homePageLabel={messages.homePage}
				categoriesListTitle={messages.categories}
				// 
				categories={demoCategories} 
				homeUrl="#"
				currency={settings.currency} 
				receiveOrders={settings.receiveOrders} 
				// screen-specific
				productCategories={demoProducts.slice(0, 2)}
				productMedia={demoProductMedia}
				permalink={demoProduct.permalink}
				productId={demoProduct.id}
				title={demoProduct.name}
				description={demoProduct.description}
				price={`${settings.currency} ${demoProduct.price}`}
				relatedProducts={demoProducts.slice(3,3)}
				messageSent={false}
				showContactModal={false}
				handleToggleContact={() => void(0)}
				orderButton={messages.orderButton}
				relatedProductsTitle={messages.relatedProductsTitle}
				// 
				requestFormTitle={messages.requestFormTitle}
				requestFormHint={messages.requestFormHint}
				requestFormSentTitle={messages.requestFormSentTitle}
				requestFormSentHint={messages.requestFormSentHint}
				requestFormEmail={messages.requestFormEmail}
				requestFormPhone={messages.requestFormPhone}
				requestFormMessage={messages.requestFormMessage}
				requestFormSubmit={messages.requestFormSubmit}
			 />
		case 'formEmpty':
			return <SingleProduct
				// 
				headerImage={images.header} 
				footerImage={images.footer} 
				logoDesktop={images.logoDesktop} 
				logoMobile={images.logoMobile} 
				// 
				footerCopy={messages.footerCopy}
				topBarCopy={messages.topBarCopy}
				homePageLabel={messages.homePage}
				categoriesListTitle={messages.categories}
				// 
				categories={demoCategories} 
				homeUrl="#"
				currency={settings.currency} 
				// screen-specific
				productCategories={demoProducts.slice(0, 2)}
				productMedia={demoProductMedia}
				permalink={demoProduct.permalink}
				productId={demoProduct.id}
				title={demoProduct.name}
				description={demoProduct.description}
				price={`${settings.currency} ${demoProduct.price}`}
				relatedProducts={demoProducts.slice(6,3)}
				messageSent={false}
				showContactModal={true}
				handleToggleContact={() => void(0)}
				orderButton={messages.orderButton}
				relatedProductsTitle={messages.relatedProductsTitle}
			 />
		case 'formSent':
			return <SingleProduct
				// 
				headerImage={images.header} 
				footerImage={images.footer} 
				logoDesktop={images.logoDesktop} 
				logoMobile={images.logoMobile} 
				// 
				footerCopy={messages.footerCopy}
				topBarCopy={messages.topBarCopy}
				homePageLabel={messages.homePage}
				categoriesListTitle={messages.categories}
				// 
				categories={demoCategories} 
				homeUrl="#"
				currency={settings.currency} 
				// screen-specific
				productCategories={demoProducts.slice(0, 2)}
				productMedia={demoProductMedia}
				permalink={demoProduct.permalink}
				productId={demoProduct.id}
				title={demoProduct.name}
				description={demoProduct.description}
				price={`${settings.currency} ${demoProduct.price}`}
				relatedProducts={demoProducts.slice(6,3)}
				messageSent={true}
				showContactModal={true}
				handleToggleContact={() => void(0)}
				orderButton={messages.orderButton}
				relatedProductsTitle={messages.relatedProductsTitle}
			 />
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'intro', label: 'Products Grid'},
	{ value: 'listView', label: 'Products List'},
	{ value: 'category', label: 'Products filtered by category'},
	{ value: 'single', label: 'Individual Product'},
	// Disabled until we figure out how to keep modals inside the preview's iframe
	// { value: 'formEmpty', label: 'Product request form'},
	// { value: 'formSent', label: 'Product request form sent'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
	messages: PropTypes.object.isRequired,
	images: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
}

export default Previews