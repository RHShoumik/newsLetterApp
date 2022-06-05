const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/' ,(req, res) =>{
    res.sendFile(__dirname + "/signup.html");
});

app.post('/' , (req, res) => {
    const fastName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(fastName + lastName + email);

    const data ={
        members: [
            {
                email_address:email,
                status : "subscribed",
                merge_fields:{
                    FNAME : fastName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/765419e1b7";

    const options ={
        method:"POST",
        auth:"RHSHoumik:8b702a90c3aa8a63037c173df35fb9ff-us8"
    }
    const request = https.request(url, options, (response) =>{
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data) =>{
            console.log(JSON.parse(data));
        } )
    })

    request.write(jsonData);
    request.end();

    
});

app.post('/failure', (req, res) =>{
    console.log("I am here");
    res.redirect("/");
});

app.listen(PORT , (req , res) => {
    console.log("Server is running on port " + PORT);
});

//8b702a90c3aa8a63037c173df35fb9ff-us8

//765419e1b7