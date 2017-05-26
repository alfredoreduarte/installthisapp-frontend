import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/catalog/components/Index'
import Categories from 'canvas/catalog/components/Categories'
import SingleProduct from 'canvas/catalog/components/SingleProduct'

/** Product samples. */
const demoProducts = [{"id":3,"name":"Smeg Toaster","slug":"smeg-toaster","featured":true,"description":"Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur.\n\nMaecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue.","shortDescription":"Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.","price":"128","regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":7,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1494729713398-234036685.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-14T02:41:58.630Z","updatedAt":"2017-05-14T02:41:58.630Z"},"permalink":"/app5/SDBCA7/smeg-toaster","createdAt":"2017-05-04T23:18:48.222Z","media":[7,18],"categories":[5,4]},{"id":5,"name":"Mixer","slug":"mixer","featured":false,"description":"Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.","shortDescription":"Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.","price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":8,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495122797735-41UykMs7lIL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T15:53:20.538Z","updatedAt":"2017-05-18T15:53:20.538Z"},"permalink":"/app5/SDBCA7/mixer","createdAt":"2017-05-18T15:53:35.981Z","media":[8],"categories":[7,4]},{"id":6,"name":"Kettle","slug":"kettle","featured":false,"description":"Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.","shortDescription":"Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur.","price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":9,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123353945-41PTBFWo JL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:02:36.185Z","updatedAt":"2017-05-18T16:02:36.185Z"},"permalink":"/app5/SDBCA7/kettle","createdAt":"2017-05-18T15:56:21.647Z","media":[9],"categories":[4,8]},{"id":7,"name":"B&D Toaster","slug":"b-d-toaster","featured":false,"description":null,"shortDescription":"Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":10,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123400817-41TeJL3iFpL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:03:22.959Z","updatedAt":"2017-05-18T16:03:22.959Z"},"permalink":"/app5/SDBCA7/b-d-toaster","createdAt":"2017-05-18T16:03:44.462Z","media":[10],"categories":[5,4]},{"id":8,"name":"Electric Kettle","slug":"electric-kettle","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":11,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123452539-41uKBlLEluL._AC_US218_.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:04:14.737Z","updatedAt":"2017-05-18T16:04:14.737Z"},"permalink":"/app5/SDBCA7/electric-kettle","createdAt":"2017-05-18T16:04:20.432Z","media":[11],"categories":[8,4]},{"id":9,"name":"HandVac","slug":"hand-vac","featured":true,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":12,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123771868-red hand vaccum.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:09:34.360Z","updatedAt":"2017-05-18T16:09:34.360Z"},"permalink":"/app5/SDBCA7/hand-vac","createdAt":"2017-05-18T16:09:41.043Z","media":[12],"categories":[4,9]},{"id":10,"name":"Coffee machine","slug":"coffee-machine","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":13,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123869118-coffeemaker.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:11:11.926Z","updatedAt":"2017-05-18T16:11:11.926Z"},"permalink":"/app5/SDBCA7/coffee-machine","createdAt":"2017-05-18T16:11:15.383Z","media":[13],"categories":[4,10]},{"id":11,"name":"Dishrack","slug":"dishrack","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":14,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495123889750-dishrack.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:11:31.604Z","updatedAt":"2017-05-18T16:11:31.604Z"},"permalink":"/app5/SDBCA7/dishrack","createdAt":"2017-05-18T16:11:38.640Z","media":[14],"categories":[4,11]},{"id":12,"name":"Kitchen Thermometer","slug":"kitchen-thermometer","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":15,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495124028579-thermo.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:13:50.719Z","updatedAt":"2017-05-18T16:13:50.719Z"},"permalink":"/app5/SDBCA7/kitchen-thermometer","createdAt":"2017-05-18T16:13:55.360Z","media":[15],"categories":[4,13]},{"id":13,"name":"Induction Kitchen","slug":"induction-kitchen","featured":false,"description":null,"shortDescription":null,"price":null,"regularPrice":null,"salePrice":null,"onSaleFrom":null,"onSaleTo":null,"menuOrder":null,"featuredImage":{"id":16,"attachmentUrl":"https://degleanuj61sc.cloudfront.net/catalog-media/SDBCA7/1495124054331-kitchen.jpg","attachmentType":null,"attachmentAlt":null,"applicationId":1,"createdAt":"2017-05-18T16:14:16.152Z","updatedAt":"2017-05-18T16:14:16.152Z"},"permalink":"/app5/SDBCA7/induction-kitchen","createdAt":"2017-05-18T16:14:20.578Z","media":[16],"categories":[4,12]}]
const demoCategories = [{"id":4,"name":"Home Appliances","slug":"home-appliances","lft":1,"parentId":null,"permalink":"/app5/SDBCA7/categories/home-appliances","createdAt":"2017-05-18T14:39:36.073Z"},{"id":5,"name":"Toasters","slug":"toasters","lft":2,"parentId":4,"permalink":"/app5/SDBCA7/categories/toasters","createdAt":"2017-05-18T14:39:57.748Z"},{"id":7,"name":"Mixers","slug":"mixers","lft":4,"parentId":4,"permalink":"/app5/SDBCA7/categories/mixers","createdAt":"2017-05-18T15:54:19.025Z"},{"id":8,"name":"Kettles","slug":"kettles","lft":6,"parentId":4,"permalink":"/app5/SDBCA7/categories/kettles","createdAt":"2017-05-18T16:01:05.273Z"},{"id":9,"name":"Hand vaccums","slug":"hand-vaccums","lft":8,"parentId":4,"permalink":"/app5/SDBCA7/categories/hand-vaccums","createdAt":"2017-05-18T16:09:56.883Z"},{"id":10,"name":"Coffee Machines","slug":"coffee-machines","lft":10,"parentId":4,"permalink":"/app5/SDBCA7/categories/coffee-machines","createdAt":"2017-05-18T16:10:21.599Z"},{"id":11,"name":"Dish racks","slug":"dish-racks","lft":12,"parentId":4,"permalink":"/app5/SDBCA7/categories/dish-racks","createdAt":"2017-05-18T16:10:36.557Z"},{"id":12,"name":"Electric kitchentops","slug":"electric-kitchentops","lft":14,"parentId":4,"permalink":"/app5/SDBCA7/categories/electric-kitchentops","createdAt":"2017-05-18T16:12:41.576Z"},{"id":13,"name":"Kitchen thermometers","slug":"kitchen-thermometers","lft":16,"parentId":4,"permalink":"/app5/SDBCA7/categories/kitchen-thermometers","createdAt":"2017-05-18T16:13:11.855Z"}]

const Previews = ({ screen, messages, images }) => {
	switch (screen) {
		case 'intro':
			return <Index
				headerImage={images.header} 
				footerImage={images.footer} 
				currency={'US$'} 
				products={demoProducts} 
				productListDisplayMode={'grid'} 
				categories={demoCategories} 
				homeUrl={'#'} 
				toggleListGrid={() => void(0)}
			 />
		case 'category':
			return <Index
				headerImage={images.header} 
				footerImage={images.footer} 
				currency={'US$'} 
				products={demoProducts} 
				productListDisplayMode={'grid'} 
				categories={demoCategories} 
				homeUrl={'#'} 
				toggleListGrid={() => void(0)}
			 />
		case 'categories':
			return <Categories
				headerImage={images.header}
				footerImage={images.footer}
				categories={demoCategories}
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
				categories={demoCategories}
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