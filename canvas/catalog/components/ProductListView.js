import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Media } from 'react-bootstrap'
import _ from 'lodash'

const ProductListView = ({ 
	featured,
	thumbnail,
	permalink,
	title,
	subtitle,
	price,
	displayMode,
}) => 
	<Media style={{...styles.container, 
		flexDirection: 'inherit',
		alignItems: 'inherit',
		width: 'auto',
	}}>
		<Media.Left style={{
			marginRight: '1em',
			flex: 1,
			display: 'flex',
			justifyContent: 'center',
		}}>
			<Link to={permalink}>
				<img className="media-object" src={thumbnail} alt={title} style={{width: '218px', height: '218px'}} />
			</Link>
		</Media.Left>
		<Media.Body style={{
			flex: 3,
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap',
			alignItems: 'flex-start',
		}}>
			<Link to={permalink}><h4 className="ita-cali-product-list-title" style={{...styles.title, 
				textDecoration: 'none'
			}}>
				{featured ? <span className="ita-cali-product-list-badge" style={styles.badge}>Featured</span> : null}
				{title}
			</h4></Link>
			<p className="ita-cali-product-list-subtitle" style={styles.subtitle}>{price}</p>
			<p className="ita-cali-product-list-description" style={styles.description}>{subtitle}</p>
		</Media.Body>
	</Media>

const styles = {
	container: {
		boxShadow: '0px 0px 8px rgba(0, 0, 0, .15)',
		borderRadius: '.25em',
		padding: '2em',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		position: 'relative',
		marginTop: '1em',
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
		marginBottom: '.5em',
	},
	subtitle: {
		margin: '0px',
		marginBottom: '1em',
	},
	badge: {
		// position: 'absolute',
		alignSelf: 'flex-start',
		// top: '-10px',
		// left: '10px',
		padding: '3px 10px',
		marginRight: '.5em',
		borderRadius: '.25em',
	}
}

ProductListView.propTypes = {
	permalink: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	price: PropTypes.string,
}


export default ProductListView