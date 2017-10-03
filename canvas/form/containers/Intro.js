import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntroView from 'canvas/form/components/Intro'

class Intro extends Component {
	render(){ 
		return !this.props.loading ? <IntroView { ...this.props } /> : <p>Loading...</p>
	}
}

const mapStateToProps = state => {
	return {
		// image: state.images.intro,
		image: 'https://static.pexels.com/photos/164516/pexels-photo-164516.jpeg',
		// linkUrl: `/${window.canvasId}/${window.checksum}/login`
		linkUrl: `/form/${window.checksum}/login`
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)