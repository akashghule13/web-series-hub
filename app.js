const express = require("express");
const bodyparser = require("body-parser");
//const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname +"/login.html");
});

 app.post("/",function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data ={
        members:[
            {
            email_address: email,
            status : "subscribed",
            merge_fields:{
                 FNAME : firstName,
                 LNAME : lastName
            }
        }
      ]
    };
    const jsonData = JSON.stringify(data);
    
 
 
   
   const url ="https://us14.api.mailchimp.com/3.0/lists/62aee2574f";

   const options = {
    method :"POST",
    auth : "akash:7e0a8ee2b8b56a91af100405ac4daa82-us14"
};
  const request = https.request(url,options , function(response){
      
    if(response.statusCode===200){
        res.sendFile(__dirname+"/frontend.html");
    }else{
        res.send("failed");
    }
    
    
    response.on("data",function(data){
       console.log(JSON.parse(data));
   })
  })
  request.write(jsonData);
  request.end();
  
});
 
app.listen(3000,function(){
    console.log("server running");
});
//7e0a8ee2b8b56a91af100405ac4daa82-us14

//62aee2574f