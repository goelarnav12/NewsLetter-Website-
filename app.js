const express=require('express')
const bodyparser=require('body-parser')
const requst=require('request')
const https=require('https');
const { request } = require('http');
const app=express();

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',(req,res)=>{
    let fn=req.body.firstName
    let ln=req.body.lastName
    let email=req.body.Email;

    let data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fn,
                    LNAME:ln
                }
            }
        ]
    }

    let jsondata=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/bd8a870b46"
    const options={
        method:"POST",
        auth:"arnav:58fea81f80bc180584dfd5f6dcf38201-us14"
    }
    const request=https.request(url,options,(response)=>{

        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data",(data)=>{
        })
    })
    request.write(jsondata)
    request.end();
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 80;
}
app.listen(port);


// api key 58fea81f80bc180584dfd5f6dcf38201-us14
// list id bd8a870b46