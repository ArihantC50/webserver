const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
});

hbs.registerHelper('date',()=>{
  return new Date().getFullYear()
});
app.get('/',(req,res)=>{
//  res.send('<h1>Hello Express</h1>');
res.render('home.hbs',{
  pageTitle: 'Home Page',
  welcome: 'Welcome to my Site',

});
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',

  });
});

app.get('/error',(req,res)=>{
  res.send({
    error: 'Unable to find'
  });
});
app.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
