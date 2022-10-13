const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require ("requests");
const https = require("https");
const { response } = require("express");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")

});

app.post("/", function(req,res){
    const firstName =req.body.first;
    const lastName = req.body.last;
    const Mail =req.body.mail;

    var data ={

        members:[
            { 
                email_address: Mail,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    var jsonData =JSON.stringify(data);

    const options = {
        method:"POST",
        auth:"tahir1:2669b7b29b04e581df261e88b4502511-us17"
    }

    const url ="https://us17.api.mailchimp.com/3.0/lists/90babe040b"

    const request=https.request(url, options, function(response){

        if(response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})








app.listen(3000, function(){
    console.log("server is running on port 3000.")
})
// API KEY: 2669b7b29b04e581df261e88b4502511-us17
// audience id: 90babe040b