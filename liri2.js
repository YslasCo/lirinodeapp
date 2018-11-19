require("dotenv").config();

// npm request
var request = require("request");

// Import
var moment = require("moment");

// spotify npm connection
var Spotify = require('node-spotify-api');

// read and write FS package
var fs = require("fs");

var keys = require("./keys");




// functions to get this thing app rolling
var getMovie = function(movieInfo) {
  console.log('SEARCH FOR: ', typeof movieInfo)
  if(!movieInfo){
    movieInfo = "Taxi&Driver";
  }



// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieInfo + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    console.log(JSON.parse(body));


    console.log("Movie Title: " + JSON.parse(body).Title)
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("The imdb rating is:  " + JSON.parse(body).imdbRating);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Rotten Tomatoes rating " + JSON.parse(body).Ratings[0].Value)
  }
});

}

var spotify = new Spotify(keys.spotify);

// var spotify = new Spotify({
//   id: "79521921f06848168a17a7e70b3f2545",
//   secret: "ad8aebdf2db34c0cb9ab4d3ebde9d1b7"
// });

var getSpotifyBruh = function(songName){
  if(songName === undefined){
    songName = "Imagine";
  }

 
spotify.search(
  { type: 'track', 
    query: songName, 
    limit: 3 }, 
    
    function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);

  }else if(data) {
    var results = data.tracks.items
    var artistName = results[0].artists[0].name;
    var songName = results[0].name; // stores Song Name
    var albumName = results[0].album.name; // stores Album Name

    console.log("------------------------------")
    console.log("Artist Name: " + artistName);
    console.log("Song Name: " + songName);
    console.log("Album Name: " + albumName);
    console.log("----------------------------");
  }

});

}

// searchTerm = process.argv[2];

var getBands = function(artist){
var bandsQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

request(bandsQuery, function(error, response, body) {
if (!error && response.statusCode === 200){
  var jsonData = JSON.parse(body);
}

  //  console.log(jsonData);

if(!jsonData.length){
  console.log("No results found for " + artist);
  return;
}

console.log("Upcoming concerts for " + artist + ":");

   for(var i = 0; i < jsonData.length; i++){
    console.log('---------------------------------')
    // console.log("Artist Name:" + process.argv[2])
    console.log("Venue Name: " + jsonData[i].venue.name)
    console.log("State: " + jsonData[i].venue.region)
    console.log("City: " + jsonData[i].venue.city)
    // console.log(moment(show.datetime).format("MM/DD/YYYY"))
  }

});

};

// Function for running a command based on text file
var readTheFile = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      choice(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      choice(dataArr[0]);
    }
  });
};

// Function for determining which command is executed
var choice = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    getBands(functionData);
    break;
  case "spotify-this-song":
    getSpotifyBruh(functionData);
    break;
  case "movie-this":
    getMovie(functionData);
    break;
  case "do-what-it-says":
    readTheFile();
    break;
  default:
    console.log("LIRI doesn't know that");
  }
};

// Function which takes in command line arguments and executes correct function accordingly
var userInput = function(argOne, argTwo) {
  choice(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
userInput(process.argv[2], process.argv.slice(3).join(" "));