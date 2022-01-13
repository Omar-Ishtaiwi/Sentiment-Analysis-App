import logo from './logo.svg';
import './App.css';
import{useRef,useState,useEffect} from 'react'
import { LineChart , CartesianGrid, XAxis, YAxis ,Tooltip ,Legend ,Line, BarChart, Bar} from 'recharts';
import Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/Button';
function App() {
  
  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();

  const [render,setRender]=useState(false);
  
  const ref0 = useRef();
  const [img,setImg] = useState(" ");
  const [query,setQuery] = useState(" ");
  const [profile,setProfile]=useState(true)
  const [tweets,setTweets]=useState([]);
  const [term,setTerm]=useState("");
  const [num,setNum]=useState(" ");
  const [iscore,setIscore]=useState(0);
  const [arscore,setARscore]=useState([]);
  const [tw,setTW]=useState([]);
  const [linec,setLinec]=useState([{}]);

  const [tdate,setTdate]=useState("");

  

  var count =0;
  var tscores=[];

  var idate=0;
  var dates=[];
   
  var total =0;
  var isc =0;


  var chartData = [{}];
  var charObj={score:"",date:""};

  var twt=[{}];
  const params ={
    q:query,
  }



  function handleclick(e){
    e.preventDefault();
    console.log("Clicked...")
    setTerm(query);
    console.log(query);
    fetch("http://localhost:3001/tweets",{   
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify( params )}
      )
    .then(res => res.json())
    .then(res =>setTweets(res.statuses))


    for(var i =0 ;i<tweets.length;i++){
      if(!isNaN((sentiment.analyze(tweets[i].text).score))){
        console.log(i+" loop" )
        console.log((sentiment.analyze(tweets[i].text)))
        isc=(sentiment.analyze(tweets[i].text).score);
        tscores.push(isc);
        setIscore((isc))
        setNum(total+=(sentiment.analyze(tweets[i].text).score));
        console.log("current score "+(total)+" iscore: "+(sentiment.analyze(tweets[i].text).score))
        console.log(isc)

        idate=tweets[i].created_at.substring(4,10);
        dates.push(idate);
        console.log(dates);

        
      }
      
  
  }


    
    console.log("final :"+num)

    setARscore(tscores)
    setTdate(dates)


    for( var i=0;i<arscore.length;i++){

      charObj={score:arscore[i],date:tdate[i]}
      chartData.push(charObj);

    }

    setLinec(chartData);

    console.log("tscore Array:"+arscore)
    setRender(true);
   
    
  }

  

  return (
    <div className="App">
       <h1>  Sentiment Analysis App</h1>
       <h3>Enter a search term to Analyze:</h3>
      
    <div className="InputBar">

   
    <br></br>
       <input type="text" ref={ref0} onChange={e=>setQuery(e.target.value)}/>
       <Button variant="primary" onClick={handleclick} >Analyze</Button>
    </div>
    
  
    
    <div>
    {render&&
      <h1> Sentiment Score for "{term}" is {num}</h1>
    }
    </div>
    <br></br>
  <div>
    <div className='scroll'>
    <h3>Tweets Dashboard</h3>
    {tweets.map((e)=><li>{e.text} <h5>Tweet sentiment score :  {arscore[count++]}</h5></li>)}
    </div>

    
  </div>

  
    
    
    {profile &&
    <div>
    <div className="proHold"></div>
    <img className="proImg" src={img}></img>
    </div>
    }
    
    
    
<div className='charts'>

<h2>Sentiment Score Over Time Chart</h2>
        <LineChart
          width={900}
          height={400}
          data={linec}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        </LineChart>



</div>

    </div>


  );
}

export default App;

