// import { $, jQuery } from 'jquery'
// global.jQuery = require('jquery')
// window.$ = $
// window.jQuery = jQuery
import slick from 'slick-carousel'
import scrollTo from 'jquery.scrollto'
import visible from 'jquery-visible'
import featuresPageChart from 'assets/landing/features-chart'
require('assets/landing-v2/styles.sass')
require('damnGdpr/src/damnGdpr.js')
require('damnGdpr/src/damnGdpr.css')

$(document).ready(() => {
	$.damnGdpr({
		language: 'en',
		readMoreUrl: 'https://staging.installthisapp.com/privacy-policy',
		cookieNames: ['cookie1', 'cookie1'],
	})
	// featuresPageChart('features-chart')
	if ($('#create').length > 0) {
		$(window).on('scroll', () => {
			if ($('#create').visible()) {
				if ($('#create').get(0).paused) {
					$('#create')
						.get(0)
						.play()
					$('#customize')
						.get(0)
						.pause()
					$('#customize').get(0).currentTime = 0
					$('#publish')
						.get(0)
						.pause()
					$('#publish').get(0).currentTime = 0
				}
			} else if ($('#customize').visible()) {
				if ($('#customize').get(0).paused) {
					$('#customize')
						.get(0)
						.play()
					$('#create')
						.get(0)
						.pause()
					$('#create').get(0).currentTime = 0
					$('#publish')
						.get(0)
						.pause()
					$('#publish').get(0).currentTime = 0
				}
			} else if ($('#publish').visible()) {
				if ($('#publish').get(0).paused) {
					$('#publish')
						.get(0)
						.play()
					$('#customize')
						.get(0)
						.pause()
					$('#customize').get(0).currentTime = 0
					$('#create')
						.get(0)
						.pause()
					$('#create').get(0).currentTime = 0
				}
			} else {
				$('#create')
					.get(0)
					.pause()
				$('#create').get(0).currentTime = 0
				$('#customize')
					.get(0)
					.pause()
				$('#customize').get(0).currentTime = 0
				$('#publish')
					.get(0)
					.pause()
				$('#publish').get(0).currentTime = 0
			}
		})
	}
})
