var restify = require('restify');
var fs = require('fs');
var cheerio = require('cheerio')
let recipeparser = require('./index');
let request = require('request')

var server = restify.createServer();

server.use(restify.plugins.bodyParser({ mapParams: true }));

server.get('/', function(req, res, next) {
  let body = `<html>
      <head></head>
      <body>
      <form action="/scrape" method="POST">
        <label>URL:</label>
        <input type="text" name="url" value="http://www.skinnytaste.com/air-fryer-french-fries/"/>
      </form>
      </body>
    </html>`;
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/html'
  });
  res.write(body);
  res.end();
  next();
})

server.post('/scrape', (req, res, next) => {
  let url = req.params.url;

  request(url, async function (err, resp, html) {
    try {
      let parsed = await recipeparser(html);
      res.send(parsed);
    } catch (error) {
      console.log('caught', error.message);
      res.send(error);
    }
    next();
  });
})

server.listen(5000, function() {
  console.log('%s listening at %s', server.name, server.url);
});