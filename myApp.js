var express = require('express');
var app = express();
var bodyParser=require('body-parser');


//Implement a root level request logger middleware
app.use((req,resp,next)=>{
  console.log(req.method+' '+ req.path+ '- ' + req.ip);
  next();
})

//Use of body parser to parse post request
app.use(bodyParser.urlencoded({extended: false}))

//Log out Hello World
console.log("Hello World");

//Working express server

/*
app.get("/",(req,resp)=>{
  console.log("Hello Express")
})
*/

//Serve HTML file
app.get("/",(req,resp)=>{
  resp.sendFile(__dirname+"/views/index.html");
});

//Serve static assets
app.use(express.static(__dirname+'/public'))

//Serve Json
/*
app.get("/json",(req,resp)=>{
  resp.json({
    "message":"Hello World"
  })
});
*/

//Use the .env file. Since using replit cant store in .env file so was save inside secrets

app.get("/json",(req,resp)=>{
  const message="hello world";
  if(process.env.MESSAGE_STYLE==='uppercase'){
    resp.json({
      "message":message.toUpperCase()
    })
  }
  else if (process.env.MESSAGE_STYLE==='lowercase'){
    resp.json({
      "message":message
    })
  }
});

//Chain middleware to create a time server
app.get("/now",(req,resp,next)=>{
  req.time=new Date().toString();
  next();
}),
  function(req,resp){
    resp.json({
      "time":req.time
    });
  }

//Get route param input from the client

app.get("/:word/echo",(req,resp)=>{
  resp.json({
    "echo":req.params.word
  })
})

//Get query param input from user
   /*
app.get('/name',(req,resp)=>{
  let name=req.query.first+' '+req.query.last;
  resp.json({
    "name": name
  });
})
*/

//Get data from post request
app.post('/name',bodyParser.urlencoded({extended: false}),(req,resp)=>{
let name=req.body.first+' '+req.body.last;
  resp.json({
    "name": name
  });
})


















 module.exports = app;