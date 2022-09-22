function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';

    } else if ('TODO....') {
        //TODO...
    }
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.startsWith('/content') && req.method === 'GET') {
        //TODO...
    } else {
        return true
    }
}