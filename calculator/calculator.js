const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser({extended: true}));
app.get('/', function(req, res){
    res.sendfile(__dirname + "/bmiCalculator.html");
});
app.post('/', function(req, res){
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    var bmi = (weight/height);
    res.send("The value of your bmi is "+ bmi);
});
app.listen(3000, function(){
    console.log('The server is running on server 3000');
});

