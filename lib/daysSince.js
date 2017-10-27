const daysSince = dateParam => {
	if (dateParam) {
		const now = new Date()
		let date
		switch (typeof dateParam) {
			case 'string':
				return (date = new Date(dateParam))
			case 'object':
				return (date = dateParam)
			default:
				return 0
		}
		const diff = now.getTime() - date.getTime()
		return parseInt(diff / (1000 * 60 * 60 * 24))
	}
	console.error('Param date is not a valid Date object')
	return 0
}

export default daysSince
