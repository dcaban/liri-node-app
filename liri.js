var keys = require("./keys.js")
var Spotify = require("node-spotify-api");
var request = require("request");
var twitter = require("twitter");
var fs = require("fs");
var nodeArgs = process.argv;

if (process.argv[2] == "movie-this") {
    var movieName = "";


if (process.argv[3] == null){
    movieName = "Mr. Nobody"
}
else {
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        }

        else {

            movieName += nodeArgs[i];

        }
    }
}

// Run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


    request(queryUrl, function (error, response, body) {


        if (!error && response.statusCode === 200) {

            console.log("------------------------------")
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country of Origin: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("------------------------------")
        }
    });
}






//Spotify area









else if (process.argv[2] == "spotify-this-song") {
    var songName = "";

    if (process.argv[3] == null){
        songName = "Song for no one"
    }
    else {
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 2 && i < nodeArgs.length) {

                songName = songName + "+" + nodeArgs[i];

            }

            else {

                songName += nodeArgs[i];

            }
        }
    }
    var spotkey = keys.spotifyKeys;
    var spotify = new Spotify(spotkey);

    spotify.search({type: 'track', query: songName}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("------------------------------")
        console.log("Track Name: " + data.tracks.items[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Arstist: " + data.tracks.items[0].artists[0].name);
        console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("------------------------------")

    });
}







// Twitter area







else if (process.argv[2] == "my-tweets") {

    var client = new twitter(keys.twitterKey);
    var params = {
      screen_name: "djcaban",
        count: 20
    };
    client.get('statuses/user_timeline', "params", function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("------------------------------"),
                console.log(' Tweet: ' + tweets[i].text);
                console.log('');
                console.log(" Tweet Number: " + (i + 1));
                console.log('');
                console.log(' Created: ' + tweets[i].created_at);
                console.log("------------------------------");
            }
        }
            });


}






else if (process.argv[2] == "do-what-it-says") {

fs.readFile("random.txt", "utf8", function(error, data) {
    
    var dataArr = data.split(",");

    if (error) {
    return console.log(error);
  }

  
  if (dataArr[0] == "spotify-this-song") {
    var songName = "";

    if (dataArr[1] == null){
        songName = "Song for no one"
    }
    else {
        for (var i = 1; i < dataArr.length; i++) {

            if (i > 2 && i < dataArr.length) {

                songName = songName + "+" + dataArr[i];

            }

            else {

                songName += dataArr[i];

            }
        }
    }
    var spotkey = keys.spotifyKeys;
    var spotify = new Spotify(spotkey);

    spotify.search({type: 'track', query: songName}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("------------------------------")
        console.log("Track Name: " + data.tracks.items[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Arstist: " + data.tracks.items[0].artists[0].name);
        console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("------------------------------")

    });
}


});
}

