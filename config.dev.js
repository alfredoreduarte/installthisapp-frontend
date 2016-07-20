process.env.PORT = process.env.PORT || 4000
process.env.HOST = process.env.HOST || 'localhost'

const getUrl = () => {
	switch (process.env.NODE_ENV){
		case 'test':
			return 'http://localhost:4000'
		case 'production':
			// return 'https://' + process.env.HOST + ':' + process.env.PORT
			return ''
		case 'development':
			// return 'http://' + process.env.HOST + ':' + process.env.PORT
			return 'http://local.installthisapp.com'
		default:
			return 'http://' + process.env.HOST + ':' + process.env.PORT
	}
}

export const BASE_URL = getUrl()