// Express Module
const express = require("express");
// const { link } = require("fs");
// Https Module
const https = require("https");

// Initializing express in app variable
const app = express();

// Use to get the value in form 
app.use(express.urlencoded({extended: true}));

// Use to connect the public files to server
app.use(express.static("public"));

// Connect to the index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// When submitted, will get the current weather api
app.post("/", (req, res) => {
    const queryCity = req.body.cityName;
    const queryState = req.body.stateName;
    const queryCountry = req.body.countryName;
    const units = "metric";
    const apiKey = "341c238d807e9a432c42e60f0c43db97";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ queryCity + "," + queryState + "," + queryCountry +"&units=" + units + "&appid=" + apiKey;

    console.log(queryCity, queryState, queryCountry);
    // Get the endpoint/ link of the api
    https.get(url, (response) => {

        // Get every data of the api by using the data parameter
        response.on("data", (data) => {

            // convert the hexadecimal data to json file
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const location = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            // Display all the data needed
            res.write("<h1 style=text-align:center;>The temperature in " +  `${location}` + " is " + `${temp}` + " degrees celcius</h1>");
            res.write("<img src="+imageURL+" style=display:block;margin-left:auto;margin-right:auto;>");
            res.write("<h2 style=text-align:center;>The weather is currently " + `${weatherDescription}</h2>`)
            
            res.send();
    })
})

})





// Listen to the port and make sure it is connected
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is connected to the port 3000.");
})