const express = require('express')
const app = express()
const cors = require("cors")
const bodyparser = require('body-parser')
app.use(bodyparser.json());
app.use(cors());
app.listen(3001)
var tweets =null;

const Twit = require('twit')


const apikey = ' '
const apiSecretKey = ' '
const accessToken = ' '
const accessTokenSecret = ' '

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});


app.post('/tweets', function (req, res) {
  console.log(req.body)
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    T.get("https://api.twitter.com/1.1/search/tweets.json", { q: req.body.q, count:"30" , result_type: "popular"}, function(err, data, response) {
          tweets = data;
          console.log(tweets)
          console.log(req.body)
  
  
      })
      res.send(tweets);
  
})



app.get("/",(req,res)=>{
  res.send("Home")
})




