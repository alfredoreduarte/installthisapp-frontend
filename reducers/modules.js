const entities = (
	state = {
		active: [
			'top_fans',
			'trivia',
			'photo_contest',
			'memory_match',
			'catalog',
			'form',
			'fan_gate',
			'coupons',
			'static_html',
			'capture_the_flag',
			'promo_code',
		],
		inactive: ['story_contest', 'puzzle', 'photo_trivia', 'audio_trivia'],
	},
	action
) => {
	switch (action.type) {
		default:
			return state
	}
}

export default entities
