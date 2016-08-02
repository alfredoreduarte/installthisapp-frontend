process.env.PORT = process.env.PORT || 4000
process.env.HOST = process.env.HOST || 'installthisapp.local'

const getUrl = () => {
	switch (process.env.NODE_ENV){
		case 'test':
			return 'http://installthisapp.local:4000'
		case 'production':
			// return 'https://' + process.env.HOST + ':' + process.env.PORT
			return ''
		case 'development':
			// return 'http://' + process.env.HOST + ':' + process.env.PORT
			return 'https://local.installthisapp.com'
		default:
			return 'http://' + process.env.HOST + ':' + process.env.PORT
	}
}

export const BASE_URL = getUrl()