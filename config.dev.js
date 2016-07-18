// export const BASE_URL = 'http://localhost:4000'

process.env.PORT = process.env.PORT || 4000
process.env.HOST = process.env.HOST || 'localhost'

export const BASE_URL = 'http://' + process.env.HOST + ':' + process.env.PORT