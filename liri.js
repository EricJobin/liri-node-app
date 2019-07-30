require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var moment = require("moment");


// Commenting Out Menu selection for development purposes

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
            console.log("Spotify-This-Song");
        }
        else if (inquirerResponse.programFunction == "Movie-This - Find information about a movie") {
            console.log("Movie-This");
        }
        else if (inquirerResponse.programFunction == "Do-What-It-Says - This will do a search from the content of a text file") {
            console.log("Do-What-It-Says");
        }
        else if (inquirerResponse.programFunction == "Quit") {
            console.log("Goodbye");
        }
        else {
        console.log("Something has gone very wrong");
        }
    });

// ------------------------------------------------------------------------------------------------

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
        console.log(queryUrl);

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

//-------------------------------------------------------------------------------

//    * `spotify-this-song`

// 2. `node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
//    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


//---------------------------------------------------------------------------------

//    * `movie-this`

// 3. `node liri.js movie-this '<movie name here>'`
//    * This will output the following information to your terminal/bash window:
//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//      * It's on Netflix! --Not in Canada it isn't.

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.


//------------------------------------------------------------------------------------------------------

//    * `do-what-it-says`

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

//-----------------------------------------------------------------------------------------------

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file. 
// * Do not overwrite your file each time you run a command.






