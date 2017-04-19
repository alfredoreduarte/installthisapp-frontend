import $ from 'jquery'
import visible from 'jquery-visible'
require('assets/campaign/overlay')
require('assets/campaign/stylesheets/4.sass')

$(document).ready(() => {
	$(window).on('scroll', () => {
		if ($('#customize').visible()) {
			if ($('#customize').get(0).paused) {
				$('#customize').get(0).play()
				$('#publish').get(0).pause()
				$('#publish').get(0).currentTime = 0
			}
		}
		if ($('#publish').visible()) {
			if ($('#publish').get(0).paused) {
				$('#publish').get(0).play()
				$('#customize').get(0).pause()
				$('#customize').get(0).currentTime = 0
			}
		}
	})
})