import { fetchImages } from 'canvas/fan_gate/actions/images'
import { fetchMessages } from 'canvas/fan_gate/actions/messages'
import { fetchSettings } from 'canvas/fan_gate/actions/settings'
import Cookies from 'js-cookie'
// import Facebook from 'react-facebook/src/Facebook'

export const getStaticContent = (nextState, replace, next, dispatch) => 
	dispatch(fetchMessages())
	.then(() => dispatch(fetchImages()))
	.then(() => dispatch(fetchSettings()))
	.then(() => {
		return next()
	}
)

let fbSafeInterval = setInterval(() => {
	if (window.FB) {
		FB.Event.subscribe ('edge.create', function (response) {
			Cookies.set('fanGatePassed', window.checksum, { expires: 365, path: `/` })
			window.location.href = `/${window.module}/${window.checksum}/flyer`
		})
		clearInterval(fbSafeInterval)
	}
}, 100)