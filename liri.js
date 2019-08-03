require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var moment = require("moment");


// Commenting Out Menu selection for development purposes
//----------------------------------------------Menu Selector----------------------------------------------
inquirer
    .prompt([
        {
        type: "list",
        message: "What would you like to do?",
        choices: ["Concert-This - Find upcoming concert events for an artist!", 
            "Spotify-This-Song - Find information about a song", 
            "Movie-This - Find information about a movie", 
            "Do-What-It-Says - This will do a search from the content of a text file", 
            "Quit"],
        name: "programFunction"
        },
    ])
    .then(function(inquirerResponse) {
        
        if (inquirerResponse.programFunction == "Concert-This - Find upcoming concert events for an artist!") {
        concertThis();
        }
        else if (inquirerResponse.programFunction == "Spotify-This-Song - Find information about a song") {
            spotThis();
        }
        else if (inquirerResponse.programFunction == "Movie-This - Find information about a movie") {
            movieThis();
        }
        else if (inquirerResponse.programFunction == "Do-What-It-Says - This will do a search from the content of a text file") {
            doWhat()
            
        }
        else if (inquirerResponse.programFunction == "Quit") {
            console.log("Goodbye");
        }
        else {
        console.log("Something has gone very wrong");
        }
    });

// -----------------------------------Concert-This-------------------------------------------------------------

concertThis = function(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What band or artist are you looking for?",
            name: "artist"
        },])
    .then(function(inquirerResponse) {
        var artist = inquirerResponse.artist;
        var artistURL = escape(artist);
        var queryUrl= (`https://rest.bandsintown.com/artists/${artistURL}/events?app_id=codingbootcamp`)

        axios.get(queryUrl).then(
            function(response) {
                var concerts = response.data;
                listConcert(concerts, artist);
        });
    })
}
listConcert =function(concerts, artist){
    for (var x=0;x<concerts.length;x++){
        var formatTime = moment(concerts[x].datetime).format('MMMM Do YYYY');
        console.log(`\n${artist} will be playing at ${concerts[x].venue.name}\nOn ${formatTime} in ${concerts[x].venue.city}\n`);
    }
}

//-------------------------------Spotify-This-Song------------------------------------------------

spotThis = function(){

    inquirer
    .prompt([
        {
            type: "input",
            message: "What song are you looking for?",
            name: "song"
        },])
    .then(function(inquirerResponse) {
        var song = inquirerResponse.song;
        if(song==""){song="Ace of Spades"}
 
        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        });
         
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(JSON.stringify(data)); 
            console.log(`
                Artist: ${data.tracks.items[0].album.artists[0].name}\n
                Song: ${data.tracks.items[0].name}\n
                Preview Link: ${data.tracks.items[0].preview_url}\n
                Album: ${data.tracks.items[0].album.name}\n
            `)
        });
    })
}

//------------------------------Movie-This---------------------------------------------------

movieThis = function(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What movie are you looking for?",
            name: "movie"
        },])
    .then(function(inquirerResponse) {
        var movie = inquirerResponse.movie;
        // console.log("movie "+movie);
        if(movie==""){movie="Mr Nobody"}
        var movieURL = escape(movie);
        var queryUrl= (`http://www.omdbapi.com/?t=${movieURL}&y=&plot=short&apikey=trilogy`)
        // console.log(queryUrl)
   
        axios.get(queryUrl).then(
            function(response) {
                console.log(`
                    Title: ${response.data.Title}\n
                    Year: ${response.data.Year}\n
                    IMDB Rating: ${response.data.imdbRating}\n
                    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}\n
                    Country: ${response.data.Country}\n
                    Language: ${response.data.Language}\n
                    Plot: ${response.data.Plot}\n
                    Actors: ${response.data.Actors}
                `)
        });
    })

}

//----------------------------------------do-what-it-says--------------------------------------------

doWhat = function(){
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");

        if (dataArr[0].toLowerCase() == "concert-this") {
            console.log("Concert-This "+ dataArr[1]);
            var artist = dataArr[1];
            var artistURL = escape(artist);
            var queryUrl= (`https://rest.bandsintown.com/artists/${artistURL}/events?app_id=codingbootcamp`)

            axios.get(queryUrl).then(
                function(response) {
                    var concerts = response.data;
                    listConcert(concerts, artist);
            });
        }
        else if (dataArr[0].toLowerCase() == "spotify-this-song") {
            var song = dataArr[1];
     
            var spotify = new Spotify({
                id: keys.spotify.id,
                secret: keys.spotify.secret
            });
            
            spotify.search({ type: 'track', query: song }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(`
                    Artist: ${data.tracks.items[0].album.artists[0].name}\n
                    Song: ${data.tracks.items[0].name}\n
                    Preview Link: ${data.tracks.items[0].preview_url}\n
                    Album: ${data.tracks.items[0].album.name}\n
                `)
            });
        }
        else if (dataArr[0].toLowerCase() == "movie-this") {
            var movie = dataArr[1];
            var movieURL = escape(movie);
            var queryUrl= (`http://www.omdbapi.com/?t=${movieURL}&y=&plot=short&apikey=trilogy`)
    
            axios.get(queryUrl).then(
                function(response) {
                    console.log(`
                        Title: ${response.data.Title}\n
                        Year: ${response.data.Year}\n
                        IMDB Rating: ${response.data.imdbRating}\n
                        Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}\n
                        Country: ${response.data.Country}\n
                        Language: ${response.data.Language}\n
                        Plot: ${response.data.Plot}\n
                        Actors: ${response.data.Actors}
                    `)
                }
            )

        }
        else{console.log("Error: Not a valid method");}
    });
}

//-----------------------------------------------------------------------------------------------

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file. 
// * Do not overwrite your file each time you run a command.



