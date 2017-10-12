var spotify = require("node-spotify-api");
var request = require("request");
var twitter = require("twitter");

var nodeArgs = process.argv;

if (process.argv[2] == "movie-this") {
// Create an empty variable for holding the movie name
    var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s


    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        }

        else {

            movieName += nodeArgs[i];

        }
    }

// Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var stringBody = JSON.stringify(body);
            console.log(stringBody);
            console.log(JSON.stringify(body))
            console.log("Release Year: " + JSON.parse(body).Year);
        }
    });
}
console.log(spotify);
console.log(twitter);