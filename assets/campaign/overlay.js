import $ from 'jquery'
import Cookies from 'js-cookie'
import * as EmailValidator from 'email-validator'
import 'whatwg-fetch'

let originalSubmitText = null

const showOverlay = () => {
	window.scrollTo(0, 0)
	$('#overlay').addClass('visible animated fadeInUp')
}

const hideOverlay = () => {
	$('#overlay').addClass('fadeOutDown')
	setTimeout(() => {
		$('#overlay').removeClass('visible animated fadeInUp fadeOutDown')
	}, 500)
}

const populateFields = email => {
	$('#actual-email').val(email)
}

const ITAregister = (email, password) => {
	fetch(window.apiUrl + '/auth.json', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
			confirm_success_url: 'https://' + window.location.hostname + '/d'
		})
	}).then(response => {
		return response.json()
	})
	.then(json => {
		if (json.status == "success") {
			ITAlogin(email, password, false)
		}
		else {
			$('#actual-submit').removeAttr('disabled', 'disabled').html(originalSubmitText)
			alert(json.errors.full_messages)
		}
	})
	.catch(exception =>
		console.log('parsing failed', exception)
	)
}

const ITAlogin = (email, password) => {
	fetch(window.apiUrl + '/auth/sign_in.json', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
	.then(response => {
		Cookies.set('access-token', response.headers.get('access-token'))
		Cookies.set('token-type', response.headers.get('token-type'))
		Cookies.set('client', response.headers.get('client'))
		Cookies.set('uid', response.headers.get('uid'))
		return response.json()
	})
	.then(json => {
		analytics.track('Account Created', () => {
			top.location = location.protocol + '//' + window.location.host + '/d/apps/create'
		})
	})
	.catch(exception =>
		console.log('parsing failed', exception)
	)
}

$(document).ready(() => {
	$('.lead-form').on('submit', e => {
		e.preventDefault()
		const form = $(e.target)
		console.log('hola')
		console.log($(this))
		console.log(form)
		const email = form.find('.lead-email').val()
		if (email && EmailValidator.validate(email)) {
			showOverlay()
			populateFields(email)
		}
		else {
			$('.lead-form-alert').show()
			console.log('no email', email)
		}
	})
	$('#close-button').on('click', e => {
		hideOverlay()
	})
	$('#actual-form').on('submit', e => {
		e.preventDefault()
		originalSubmitText = $('#actual-submit').html()
		$('#actual-submit').attr('disabled', 'disabled').html('Please wait...')
		const email = $('#actual-email').val()
		const password = $('#actual-password').val()
		if (email && password && EmailValidator.validate(email)) {
			ITAregister(email, password)
		}
		else {
			$('.actual-form-alert').show()
			console.log('no email', email)
			$('#actual-submit').removeAttr('disabled', 'disabled').html(originalSubmitText)
		}
	})
})