// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way
app.get('/', function (req, res) {
  res.send('<h3 style="color:green">Welcome to the default page!  <br> <br>' +
    'Try going to different URIs by adding these at the end: <br> <br>' +
    '/hey-ya <br>' +
    '/mega <br>' +
    '/respond <br>' +
    '/wish/yourname <br>' +
    '/hey-you/Dr.Rogers <br>' +
    '/fortune <br>' +
    '/fancy/?first=Nikitha&last=Kethireddy <br>' +
    '/external-img <br>'+
    '<br> <br> </h3>' +
    'Fork the source code from <a href="https://github.com/denisecase/node-express-app">https://github.com/denisecase/node-express-app</a>'
  )
})

// or use the new arrow function syntax
// respond with text
app.get('/hey-ya', (req, res) => {
  res.send('<h4>Hii World!</h4>')
})

// or respond with html
app.get('/mega', (req, res) => {
  res.send('<h1 style="color:green">Hey World!</h1>')
})

app.get('/external-img', (req, res) => {
  res.send('<img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2010/05/free_flowers_shutterstock_13325443_web.jpg">')
})

// or respond with JSON
app.get('/respond', (req, res) => {
  res.send('<h4 style="color:green">{"Name" : "Nikitha"}</h4>')
})

// :name indicates a parameter at this location in the URI
app.get('/wish/:id', (req, res) => {
  res.send(`<h4>Hi! Your name will always be ${req.params.id}.</h4>`)
})

// combine your skills and get creative
app.get('/hey-you/:buddy', (req, res) => {
  res.send(`<h1 style="color:green">Bojour!, ${req.params.buddy}!</h1>`)
})

// provide multiple query parameters (named first and last) with ? and &
app.get('/fancy', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`<h4>Hey ${first} ${last}!</h4>`)
})

let fort = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.',
'You may rely on it', 'As I see it, yes.', 'Most likely', 'Outlook good.', 'Yes.', 'Signs point to yes.',
'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 
'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
'Very doubtful.']

// Implements a Magic 8 Ball service
app.get('/fortune', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2 style="color:green">You wish to know the future?</h2>' +
             '<p style="color:green">Ask a question in the query string, e.g., http://localhost:3002/fortune?Will I become rich? <br/>' +
             '<p style="color:green">The Magic 8 Ball will answer!</p>')
  } else {
    res.send(`<h1>The answer is ... wait for it ... ${fort[randomInt(0, fort.length)]}</h1>`)
  }
})

// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`status 404 - ${req.originalUrl} was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /hey-ya`)
  console.log(`   Try /mega`)
  console.log(`   Try /respond`)
  console.log(`   Try /fortune`)
  console.log(`   Try /external-img`)
  console.log(`   Try /wish/yourname`)
  console.log(`   Try /hey-you/Dr.Rogers`)
  console.log(`   Try /fancy/?first=Nikitha&last=Kethireddy`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}