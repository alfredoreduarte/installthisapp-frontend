import expect from 'expect'
import { 
	getAllApps, 
	getCurrentApp, 
	getAllAppsByText,
	getAppToBeDeleted
} from 'selectors/apps'

const state = {
	deleteApp: {
		checksum: 'P97K2'
	},
	filterText: 'un',
	entities: {
		apps: [
			{
				id: 231315,
				status: 'ready',
				checksum: "LF7H3",
				title: "Trivia uno",
				users: [1, 3]
			},
			{
				id: 231314,
				status: 'installed',
				checksum: "P97K2",
				title: "Trivia dos",
				users: [1, 2, 3]
			},
			{
				id: 834913,
				status: 'deleted',
				checksum: "P97K6",
				title: "Trivia borrada",
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
	describe('getAllApps', () => {
		it('should get all non-deleted apps', () => {
			const expectedResult = [
				{
					id: 231315,
					status: 'ready',
					checksum: "LF7H3",
					title: "Trivia uno",
					users: [1, 3]
				},
				{
					id: 231314,
					status: 'installed',
					checksum: "P97K2",
					title: "Trivia dos",
					users: [1, 2, 3]
				}
			]
			expect(getAllApps(state, props)).toEqual(expectedResult)
		})
	})
	describe('getCurrentApp', () => {
		it('should get the current app being viewed', () => {
			const expectedResult = {
				id: 231314,
				status: 'installed',
				checksum: "P97K2",
				title: "Trivia dos",
				users: [1, 2, 3]
			}
			expect(getCurrentApp(state, props)).toEqual(expectedResult)
		})
	})
	describe('getAppToBeDeleted', () => {
		it('should get the app marked for confirmation to delete', () => {
			const expectedResult = {
				id: 231314,
				status: 'installed',
				checksum: "P97K2",
				title: "Trivia dos",
				users: [1, 2, 3]
			}
			expect(getAppToBeDeleted(state, props)).toEqual(expectedResult)
		})
	})
	describe('getAllAppsByText', () => {
		it('should filter apps by name (case-insensitive)', () => {
			const expectedResult = [
				{
					id: 231315,
					status: 'ready',
					checksum: "LF7H3",
					title: "Trivia uno",
					users: [1, 3]
				},
			]
			expect(getAllAppsByText(state, props)).toEqual(expectedResult)
		})
	})
})
