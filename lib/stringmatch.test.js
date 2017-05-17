const stringContains = require('./stringmatch').stringContains

test('string "fdas" contains "da"', () => {
	expect(stringContains("fdas", "da")).toBe(true)
})