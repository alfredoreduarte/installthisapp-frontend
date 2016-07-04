export const stringContains = (string, filter) => {
	return string.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) !== -1
}