import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Button from './Button'
import Welcome from './Welcome'

// Catalog canvas
import CatalogMobileTopBar from '../canvas/catalog/components/mobile/TopBar'
import CatalogMobileMenu from '../canvas/catalog/components/mobile/Menu'
import CatalogDesktopTopBar from '../canvas/catalog/components/desktop/TopBar'
import CatalogDesktopFooter from '../canvas/catalog/components/desktop/Footer'
import CatalogProduct from '../canvas/catalog/components/Product'

storiesOf('Catalog Mobile Menu', module).add('Basic', () => (
	<CatalogMobileMenu options={[{ key: 'clothing', value: 'Clothing' }, { key: 'home', value: 'Home Appliances' }]} />
))
storiesOf('Catalog Mobile TopBar', module).add('Basic', () => (
	<CatalogMobileTopBar logoImage="https://localhost.ssl:5000/images/logo-round.png" homeUrl="#" />
))
storiesOf('Catalog Desktop TopBar', module).add('Basic', () => <CatalogDesktopTopBar copy="Phone: 021 123 456" />)

storiesOf('Catalog Desktop Footer', module).add('Basic', () => <CatalogDesktopFooter copy="© 2017 - My Store - All rights reserved" />)

storiesOf('CatalogProduct', module).add('Basic', () => (
	<CatalogProduct
		thumbnail="https://cdn.ambientedirect.com/chameleon/mediapool/thumbs/0/f7/none_800x800-ID557872-4981e6811fcf80e1ed833b67b607017e.jpg"
		permalink="#"
		title="Smeg Toaster"
		subtitle="sub"
		price="$128.00"
		displayMode="grid"
	/>
))
storiesOf('CatalogProduct', module).add('Featured', () => (
	<CatalogProduct
		featured={true}
		thumbnail="https://cdn.ambientedirect.com/chameleon/mediapool/thumbs/0/f7/none_800x800-ID557872-4981e6811fcf80e1ed833b67b607017e.jpg"
		permalink="#"
		title="Smeg Toaster"
		subtitle="sub"
		price="$128.00"
		displayMode="grid"
	/>
))
storiesOf('CatalogProduct', module).add('As list item', () => (
	<CatalogProduct
		featured={true}
		thumbnail="https://cdn.ambientedirect.com/chameleon/mediapool/thumbs/0/f7/none_800x800-ID557872-4981e6811fcf80e1ed833b67b607017e.jpg"
		permalink="#"
		title="Smeg Toaster"
		subtitle="Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas sed diam eget risus varius blandit sit amet non magna."
		price="$128.00"
		displayMode="list"
	/>
))

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
	.add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
	.add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)
