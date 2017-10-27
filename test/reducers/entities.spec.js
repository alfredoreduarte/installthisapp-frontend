import expect from 'expect'
import entities from 'reducers/entities'

describe('Reducers', () => {
	describe('entities', () => {
		it('Should provide the initial state', () => {
			const initialState = { apps: {}, users: {}, pages: {} }
			expect(entities(undefined, {})).toEqual(initialState)
		})
		describe('When receiving entities', () => {
			it('should save entities', () => {
				const entitiesReceived = {
					apps: {
						fdsa: {
							checksum: 'fdsa',
						},
					},
					users: {
						'1': {
							id: '1',
						},
					},
					pages: {
						'123234': {
							id: 123234,
						},
					},
				}
				const action = {
					type: 'RECEIVE_ENTITIES',
					response: {
						entities: entitiesReceived,
					},
				}
				expect(entities(undefined, action)).toEqual(entitiesReceived)
			})
		})
	})
})
