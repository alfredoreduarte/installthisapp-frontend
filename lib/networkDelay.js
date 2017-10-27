const simulateDelay = payload => {
	if (process.env.NODE_ENV == 'development') {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(payload)
				// }, 2000)
			}, 1)
		})
	} else {
		return Promise.resolve(payload)
	}
}

export default simulateDelay
