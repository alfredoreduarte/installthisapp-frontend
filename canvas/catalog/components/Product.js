import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Media } from 'react-bootstrap'
import _ from 'lodash'

const Product = ({ 
	size,
	featured,
	thumbnail,
	permalink,
	title,
	subtitle,
	price,
	displayMode,
}) =>
	<div style={{
		...styles.container, 
		width: size == 50 ? '45%' : '30%',
	}}>
		{featured ? <div className="ita-cali-product-grid-badge" style={styles.badge}>Featured</div> : null}
		<Link to={permalink}><img src={thumbnail} alt={title} style={{...styles.thumbnail, width: '100px', height: '100px'}} /></Link>
		<div style={styles.caption}>
			<h3 className="ita-cali-product-grid-title" style={styles.title}>
				<Link to={permalink} style={{color: 'inherit', textDecoration: 'none'}}>{title}</Link>
			</h3>
			<p className="ita-cali-product-grid-subtitle" style={styles.subtitle}>
				<Link to={permalink} style={{color: 'inherit', textDecoration: 'none'}}>{price}</Link>
			</p>
		</div>
	</div>

const styles = {
	container: {
		boxShadow: '0px 0px 8px rgba(0, 0, 0, .15)',
		borderRadius: '.25em',
		padding: '1em',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		position: 'relative',
		marginTop: '1em',
		marginBottom: '.5em',
		background: 'white',
	},
	thumbnail: {
		flex: 2,
		marginBottom: '1em',
		// height: '150px',
	},
	caption: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'space-around',
		justifyContent: 'space-around',
	},
	title: {
		margin: '0px',
	},
	subtitle: {
		margin: '0px',
	},
	badge: {
		position: 'absolute',
		alignSelf: 'flex-start',
		top: '-10px',
		left: '10px',
		padding: '3px 10px',
		borderRadius: '.25em',
	}
}

Product.propTypes = {
	permalink: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	price: PropTypes.string,
}


export default Product