const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const storageService = require('./service/storageService.js');
const port = 3000;
const handlers = require('./handlers');

const app = http.createServer((req, res) => {
    
    if (req.url == '/') {
        const content = fs.readFileSync('./views/home/index.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(content)
    } else if (req.url == '/styles/site.css') {
        const content = fs.readFileSync('./styles/site.css');
        res.writeHead(200, {
            'Content-Type': 'text/css'
        })
        res.write(content)
    } else if (req.url == '/cats/add-cat' && req.method == 'GET') {
        const content = fs.readFileSync('./views/addCat.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(content)
    } else if (req.url == '/cats/add-cat' && req.method == 'POST') {
        const form = new formidable.IncomingForm()

        form.parse(req, (err, fields, files) => {
            storageService.saveCat(fields)
        })

        //Redirecting
        res.writeHead(302, {
            Location: '/'
        })

    } else if (req.url == '/cats/add-breed' && req.method == 'GET') {

        const content = fs.readFileSync('./views/addBreed.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(content)
    } else if (req.url == '/cats/add-breed' && req.method == 'POST') {
        const form = new formidable.IncomingForm()

        form.parse(req, (err, fields, files) => {
            storageService.saveBreed(fields)
        })

        //Redirecting
        res.writeHead(302, {
            Location: '/'
        })
        
    } else if (req.url == '/cats-edit/:id' && req.method == 'GET') {
        
        const content = fs.readFileSync('./views/editCat.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(content)
    }
    res.end();

})

app.listen(port);