import expect from 'expect'
import { getCurrentApp, getAllAppsByText } from 'selectors/apps'

const state = {
	filterText: 'un',
	entities: {
		apps: [
			{
				id: 231315,
				checksum: "LF7H3",
				title: "Trivia uno",
				users: [1, 3]
			},
			{
				id: 231315,
				checksum: "P97K2",
				title: "Trivia dos",
				users: [1, 2, 3]
			}
		]
	}
}
const props = {
	params: {
		checksum: 'P97K2'
	}
}

describe('selectors', () => {
	describe('getCurrentApp', () => {
		it('should get the current app being viewed', () => {
			const expectedResult = {
				id: 231315,
				checksum: "P97K2",
				title: "Trivia dos",
				users: [1, 2, 3]
			}
			expect(getCurrentApp(state, props)).toEqual(expectedResult)
		})
	})
	describe('getAllAppsByText', () => {
		it('should filter apps by name (case-insensitive)', () => {
			const expectedResult = [
				{
					id: 231315,
					checksum: "LF7H3",
					title: "Trivia uno",
					users: [1, 3]
				}
			]
			expect(getAllAppsByText(state, props)).toEqual(expectedResult)
		})
	})
})
