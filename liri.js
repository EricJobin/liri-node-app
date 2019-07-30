require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");

inquirer
    .prompt([
        {
        type: "list",
        message: "What would you like to do?",
        choices: ["Concert-This", "Spotify-This-Song", "Movie-This", "Do-What-It-Says", "Quit"],
        name: "programFunction"
        },
    ])
    .then(function(inquirerResponse) {
        
        if (inquirerResponse.programFunction == "Concert-This") {
        console.log("Concert-This");
        }
        else if (inquirerResponse.programFunction == "Spotify-This-Song") {
            console.log("Spotify-This-Song");
        }
        else if (inquirerResponse.programFunction == "Movie-This") {
            console.log("Movie-This");
        }
        else if (inquirerResponse.programFunction == "Do-What-It-Says") {
            console.log("Do-What-It-Says");
        }
        else if (inquirerResponse.programFunction == "Quit") {
            console.log("Goodbye");
        }
        else {
        console.log("Something has gone very wrong");
        }
    });



// 9. Make it so liri.js can take in one of the following commands:


//    * `concert-this`
// 1. `node liri.js concert-this <artist/band name here>`
//    * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
//      * Name of the venue
//      * Venue location
//      * Date of the Event (use moment to format this as "MM/DD/YYYY")
//url: (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 

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






