import Papa from 'papaparse'
export default Papa

export const config = {
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: true, // extract column headers
	transformHeader: undefined,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: undefined,
	error: undefined,
	download: false,
	downloadRequestHeaders: undefined,
	downloadRequestBody: undefined,
	skipEmptyLines: false,
	chunk: undefined,
	chunkSize: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	delimitersToGuess: [',', '\t', '|', ';', '^', '\\s', Papa.RECORD_SEP, Papa.UNIT_SEP]
}

