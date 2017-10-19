const entities = (state = {
	active: [
		'top_fans',
		'trivia',
		'photo_contest',
		'memory_match',
		'catalog',
		'form',
		'fan_gate',
		'coupons',
	],
	inactive: [
		'photo_trivia',
		'audio_trivia',
		'spot_the_difference',
		'story_contest',
		'puzzle',
	]
}, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export default entities