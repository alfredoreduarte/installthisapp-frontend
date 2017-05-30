import React, { PropTypes } from 'react'

const CategoryTitle = ({ 
	text,
}) => <div className="col-md-12"><h1 className="ita-cali-mobile-category-title">{text}</h1></div>

CategoryTitle.propTypes = {
	text: PropTypes.string.isRequired,
}

export default CategoryTitle