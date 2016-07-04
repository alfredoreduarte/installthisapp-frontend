import v4 from 'node-uuid'

const data = {
	adminUser: {
		id: v4(),
		name: 'Alfredo Re',
		firstName: 'Alfredo',
		lastName: 'Re',
		email: 'alfredoreduarte@gmail.com',
	},
	apps: [
		{
			id: v4(),
			checksum: "LF7H3",
			title: "Trivia uno",
			type: "trivia",
			active: false
		}
	],
	pages: [
		{
			id: v4(),
			identifier: 123423423,
			name: "Alfred Tests"
		}
	]
}

export default data