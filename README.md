# Sentiment Analysis App

This is a React.js web app that allows a user to enter a twitter search term giving them an overview of the search term's sentimet score ( a numerical positive or negative score depending on the context of the retrievied tweets).  An overall score as well as the individual tweet scores are shown. A visualized line chart of the change in score over time is also displayed.
 

# Runnning The App

##Step 1
Clone the repository to your local machine 


```
git clone https://github.com/Omar-Ishtaiwi/Sentiment-Analysis-App.git
```



##Step 2
Navigate to the server.js file and edit in your Twitter API keys and Tokens.



##Step 3
Install dependencies 


```
npm install
```



##Step 4
Launching the app 


```
npm start 
```


# Technical Details

* The Twitter API is used to retrieve a set of tweets containing the search term .

* The Sentiment.js library is used to calculate the score for the tweet text being iterated over.

* The Chart.js library is used to render the line chart displayed .




