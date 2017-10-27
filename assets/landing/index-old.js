import $ from 'jquery'
import slick from 'slick-carousel'
import scrollTo from 'jquery.scrollto'
// require('assets/newlanding/styles.sass')
require('assets/landing-v2/styles.sass')

$(document).ready(() => {
	$('.coso').slick({
		autoplay: true,
		arrows: false,
	})
	$('.slick-nav').on('click', e => {
		let index = parseInt($(e.currentTarget).attr('data-slick-index'))
		$('.coso').slick('slickGoTo', index - 1)
	})
	$('#below-fold-anchor').on('click', e => {
		$(window).scrollTo('#below-fold', 500)
	})
})
