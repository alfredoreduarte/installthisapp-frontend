import expect from 'expect'
import * as actions from 'actions/appsSorting'

describe('Actions', () => {
	describe('appsSorting', () => {
		it("should update apps sorting key", () => {
			const key = 'title'
			const expectedAction = {
				type: 'SORT_APPS',
				payload: key
			}
			expect(actions.sortAppsBy(key)).toEqual(expectedAction)
		})
	})
})