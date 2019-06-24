const rollParser = require('roll-parser');

function parse(str) {
	return rollParser.parseAndRoll(str);
}

module.exports = {
    parse: parse
}
