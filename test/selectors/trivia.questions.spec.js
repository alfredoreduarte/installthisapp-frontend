import expect from 'expect'
import { getCurrentAppChecksum } from 'selectors/apps'
import { getQuestionsForCurrentApp } from 'modules/trivia/selectors/questions'

const state = {
	trivia: {
		questions: [
			{
				id: 231314,
				index: 2,
				appChecksum: "LF7H3",
				text: "Pregunta dos",
				createdOn: "2015-02-01T20:46:22.000-04:00",
				updatedOn: "2016-02-01T20:46:22.000-04:00",
				options: [ 89273, 3728]
			},
			{
				id: 231315,
				index: 1,
				appChecksum: "DB9QK",
				text: "Pregunta uno",
				createdOn: "2015-03-01T20:46:22.000-04:00",
				updatedOn: "2016-03-01T20:46:22.000-04:00",
				options: []
			}
		]
	}
}
const props = {
	params: {
		checksum: 'LF7H3'
	}
}

describe('selectors', () => {
	describe('getQuestionsForCurrentApp', () => {
		it('should get questions for the current trivia', () => {
			const expectedResult = [
				{
					id: 231314,
					index: 2,
					appChecksum: "LF7H3",
					text: "Pregunta dos",
					createdOn: "2015-02-01T20:46:22.000-04:00",
					updatedOn: "2016-02-01T20:46:22.000-04:00",
					options: [ 89273, 3728]
				}
			]
			expect(getQuestionsForCurrentApp(state, props)).toEqual(expectedResult)
		})
	})
})
