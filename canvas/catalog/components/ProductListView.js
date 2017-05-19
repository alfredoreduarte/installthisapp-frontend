import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Media } from 'react-bootstrap'
import _ from 'lodash'

const Product = ({ 
	featured,
	thumbnail,
	permalink,
	title,
	subtitle,
	price,
	displayMode,
}) => 
	{return displayMode == 'grid' ? 
		<div style={{...styles.container, width: '23%'}}>
			{featured ? <div className="ita-cali-product-grid-badge" style={styles.badge}>Featured</div> : null}
			<Link to={permalink}><img src={thumbnail} alt={title} style={{...styles.thumbnail, width: '100px', height: '100px'}} /></Link>
			<div style={styles.caption}>
				<h3 className="ita-cali-product-grid-title" style={styles.title}><Link to={permalink} style={{color: 'inherit'}}>{title}</Link></h3>
				<p className="ita-cali-product-grid-subtitle" style={styles.subtitle}><Link to={permalink} style={{color: 'inherit'}}>{price}</Link></p>
			</div>
		</div>
	:
		<Media style={{...styles.container, 
			flexDirection: 'inherit',
			alignItems: 'inherit',
			width: 'auto',
		}}>
			<Media.Left align="middle" style={{
				marginRight: '1em',
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
			}}>
				<Link to={permalink}>
					<img className="media-object" src={thumbnail} alt={title} style={{width: '218px', height: '218px'}} />
				</Link>
			</Media.Left>
			<Media.Body align="middle" style={{
				flex: 3,
				display: 'flex',
				flexDirection: 'column',
				flexWrap: 'wrap',
				alignItems: 'flex-start',
			}}>
				<Link to={permalink}><h4 className="ita-cali-product-grid-title" style={{...styles.title, 
					fontWeight: '300',
					fontSize: '24px',
				}}>{title}</h4></Link>
				<p className="ita-cali-product-grid-subtitle" style={{...styles.subtitle, 
					fontSize: '12px'
				}}>{price}</p>
				<p className="ita-cali-product-grid-description" style={styles.description}>{subtitle}</p>
			</Media.Body>
		</Media>
	}


const layout = {
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

const variableStyles = {
	container: {
		// flexBasis: '160px',
		// width: '160px',
		// height: '200px',
	},
	thumbnail: {
		
	},
	caption: {

	},
	title: {
		lineHeight: 1.5,
		textAlign: 'center',
		color: '#5A6471',
		letterSpacing: '0px',
		fontSize: '14px',
		fontFamily: 'Montserrat',
		fontWeight: 'normal',
		fontStyle: 'normal',
		textDecoration: 'none',
		textTransform: 'none',
	},
	subtitle: {
		lineHeight: 1.5,
		textAlign: 'center',
		color: '#5A6471',
		letterSpacing: '0px',
		fontSize: '11px',
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		fontStyle: 'normal',
		textDecoration: 'none',
		textTransform: 'none',
	},
	description: {
		lineHeight: 1.5,
		textAlign: 'left',
		color: '#5A6471',
		letterSpacing: '0px',
		fontSize: '14px',
		fontFamily: 'Montserrat',
		fontWeight: '300',
		fontStyle: 'normal',
		textDecoration: 'none',
		textTransform: 'none',
	},
	badge: {
		background: '#FF4344',
		lineHeight: 1.5,
		textAlign: 'center',
		color: '#ffffff',
		letterSpacing: '0px',
		fontSize: '11px',
		fontFamily: 'Montserrat',
		fontWeight: 'normal',
		fontStyle: 'normal',
		textDecoration: 'none',
		textTransform: 'none',
	}
}

const styles = _.merge(layout, variableStyles)

Product.propTypes = {
	permalink: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	price: PropTypes.string,
}


export default Product