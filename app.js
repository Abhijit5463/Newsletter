const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname +"/signup.html");
});
app.post("/", function(req, res){
const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.email; 
const contact=req.body.contact;

const data={
    members: [
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{

                FNAME: firstName,
                LNAME: lastName,
                PHONE: contact
            }      
    }
    ]
};

const jsonData=JSON.stringify(data);

const url="https://us8.api.mailchimp.com/3.0/lists/fe5587597e";
const options={
    method:"POST",
    auth:"Abhiit123:635a479a23a9ef584e3ce426b6c71895-us8"
}

const request= https.request(url, options, function(response){

    if(response.statusCode===200){
     res.sendFile(__dirname + "/success.html");}

    else {
    res.sendFile(__dirname + "/failure.html");
    }
   response.on("data",function(data){
 console.log(JSON.parse(data));
    })

})
request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function(){
    console.log("OK");
});



//api key
//635a479a23a9ef584e3ce426b6c71895-us8

//LIST ID
//fe5587597e
//e2ffba511102ab897385ec3be19d349a-us8