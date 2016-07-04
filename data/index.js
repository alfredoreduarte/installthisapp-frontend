import v4 from 'node-uuid'

const data = {
	admin: {
		id: v4(),
		name: 'Alfredo Re',
		firstName: 'Alfredo',
		lastName: 'Re',
		email: 'alfredoreduarte@gmail.com'
	},
	apps: [
		{
			id: 231315,
			checksum: "LF7H3",
			title: "Trivia uno",
			type: "trivia",
			active: false,
			scheduled: true,
			page: 413,
			summary: [

			],
			users: [
				{
					id: 1342923825725048,
					name: "Rodrigo Keen",
				},
				{
					id: 1315096875183600,
					name: "Mikhail Herrero",
				},
				{
					id: 1097180737021047,
					name: "Jorge Díaz",
				}
			]
		},
		{
			id: 231312,
			checksum: "X91H7",
			title: "Trivia dos",
			type: "trivia",
			active: true,
			scheduled: false,
			page: 411,
			summary: [

			],
			users: [
				{
					id: 10208910337057839,
					name: "User de otra app",
				},
			]
		}
	],
	pages: [,
		{
			id: 411,
			identifier: 123423423,
			name: "Testecito"
		},
		{
			id: 413,
			identifier: 123423423,
			name: "Alfred Tests"
		}
	]
}

export default data