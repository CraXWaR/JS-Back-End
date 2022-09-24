const homeHandler = require('./home');
const staticFiles = require('./static-files');
const catHandler = reuqire('./cat')
module.exports = [
    homeHandler,
    staticFiles,
    catHandler
];