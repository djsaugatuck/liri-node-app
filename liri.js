var action = process.argv[2];
var value = process.argv[3];
var Twitter = require('twitter');
var keys = require('../liri-node-app/keys');
var client = new Twitter(keys.twitterKeys);
var params = {
    screen_name: 'derejohnbootcamp',
    count: 20
    }
var request = require('request');
var fs = require('fs');

switch (action) {
    case 'mytweets':
        myTweets();
        break;
    case 'spotify':
        spotifyThis(value);
        break;
    case 'omdb':
        omdbThis(value);
        break;
    case 'random':
        random();
        break;
}

function myTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {

            fs.appendFile('terminal.log', (Date() + process.argv +
             '\r\n \r\n----------------\r\n'), function(err) {
                if (err) throw err;
            });
            console.log(' ');
            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + 
                    ' \r\n'), function(err) {
                    if (err) throw err;
                });
            }
            fs.appendFile('terminal.log', ('---------------\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
} 

function spotifyThis(value) {
    if (value == null) {
// Ace of Base
        value = 'The Sign';
    }
    request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log('----------------------------');
            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
            console.log('Song: ' + jsonBody.tracks.items[0].name);
            console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);
            console.log('Album: ' + jsonBody.tracks.items[0].album.name);
            console.log('----------------------------');
            fs.appendFile('terminal.log', (Date() +'\r\n \r\n-----------------\r\n$: ' + 
                process.argv + 'Artist: ' + jsonBody.tracks.items[0].artists[0].name + '\r\nSong: ' 
                + jsonBody.tracks.items[0].name + '\r\nPreview Link: ' + jsonBody.tracks.items[0].preview_url + '\r\nAlbum: ' 
                + jsonBody.tracks.items[0].album.name), 
                function(err) {
                if (err) throw err;
            });
        }
    });
} 
function omdbThis(value) {
    if (value == null) {
        //MR Nobody Movie
        value = 'Mr. Nobody.';
    }
    request('http://www.omdbapi.com/?t=' + value + '&tomatoes=true&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log('---------------------------');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);
            console.log('------------------------------');
            fs.appendFile('log.txt', ('--------------\r\n' + Date() + '\r\nTERMINAL COMMANDS: ' + process.argv + 
                '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + 
                jsonBody.imdbRating + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nCountry: '
                 + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' 
                 + jsonBody.Actors + '\r\n ----------------- \r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
} 

function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                omdbThis(dataArr[1]);
            }
        }
    });
} 