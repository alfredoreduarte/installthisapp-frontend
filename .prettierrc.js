module.exports = {
	"printWidth": 136,

	// If true, will use single instead of double quotes
	"singleQuote": true,

	// Controls the printing of trailing commas wherever possible.
	//
	// Valid options:
	//
	// "none" - No trailing commas
	// "es5"  - Trailing commas where valid in ES5 (objects, arrays, etc)
	// "all"  - Trailing commas wherever possible (function arguments)
	"trailingComma": "es5",

	// Controls the printing of spaces inside array and objects
	"bracketSpacing": true,

	// If true, puts the `>` of a multi-line jsx element at the end of
	// the last line instead of being alone on the next line
	"jsxBracketSameLine": true,

	// Which parser to use. Valid options are "flow", "babylon",
	// "typescript" and "css".
	//
	// If CSS or TypeScript is detected in Sublime Text, the parser option
	// will always be internally overridden and set to "css" or
	// "typescript" respectively.
	"parser": "babylon",

	// Whether to add a semicolon at the end of every line (semi: true), or
	// only at the beginning of lines that may introduce
	// ASI failures (semi: false)
	"semi": false,

	// Prettier can restrict itself to only format files that contain a
	// special comment, called a pragma, at the top of the file. This is
	// very useful when gradually transitioning large, unformatted codebases
	// to prettier.
	"requirePragma": false
}
