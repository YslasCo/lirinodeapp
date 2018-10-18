// npm request
var request = require("request");

// movie name through terminal input
var movieName = process.argv[2];

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("The movie rating is:  " + JSON.parse(body).imdbRating);
  }
});


var Spotify = require('node-spotify-api');

 var musicInput  = process.argv[2];


 
var spotify = new Spotify({
  id: "79521921f06848168a17a7e70b3f2545",
  secret: "ad8aebdf2db34c0cb9ab4d3ebde9d1b7"
});
 
spotify.search({ type: 'track', query: musicInput }, function(err, data) {
  // .then(function(response) {
  //   console.log("\n");
  //   console.log("* Artist: ", response.tracks.items[0].artists[0].name);
  //   console.log("* Song Name: ", response.tracks.items[0].name);
  //   console.log("* Link: ", response.tracks.items[0].external_urls.spotify);
  //   console.log("* Album: ", response.tracks.items[0].album.name);
  
  if (err) {
    return console.log('Error occurred: ' + err);
  }
//  !!!!!!!!!!!!!!!!!!!!!What am I doing wrong?
  // var jsonDataSpot = JSON.parse(data.tracks.items);

  // console.log(data.tracks.items[0]); 
  //console.log(data.artists.album[0]);
  // console.log(response);
  // console.log(jsonDataSpot);
  console.log("------------------------------");
  console.log(data.tracks);
  
  // console.log(response.tracks.items[0].artists[0].name)

  
});

searchTerm = process.argv[2];

bandsQuery = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"

request(bandsQuery, function(error, response, body) {
    // console.log('Try another band:', error); // Print the error if one occurred
   var jsonData = JSON.parse(body)
  //  console.log(jsonData);

   for(var i = 0; i < jsonData.length; i++){
    console.log('---------------------------------')
    console.log("Artist Name:" + process.argv[2])
    console.log("Venue Name: " + jsonData[i].venue.name)
    console.log("State: " + jsonData[i].venue.region)
    console.log("City: " + jsonData[i].venue.city)
   
   
  }

});

