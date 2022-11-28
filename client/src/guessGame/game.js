var currCountry;
var currScore = 0;
var maxScore = countryList.length;

//Get Random integer for the random country
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Get a random country to use as answer
function getRandCountry() {
  let countryNum = getRandomInteger(0, maxScore - 1);
  currCountry = countryList[countryNum];
  console.log(currCountry["country"] + " " + currCountry["alpha3"] + " Lat: " + currCountry["latitude"] + " Long: " + currCountry["longitude"]);
}

//Get distance from one country to another. Yay euclidean measurements
function distance(sourceLat, sourceLong) {
  return Math.sqrt( Math.pow((currCountry["longitude"]-sourceLong), 2) + Math.pow((currCountry["latitude"]-sourceLat), 2));
}

//Submit answer
function submitGuess() {
  // If answer is correct
  if($("#userInput").val() == currCountry["country"]) {
    // Update Score
    currScore++;
    $('#score').text(currScore + " / " + maxScore);
    $("#userInput").val("");
    let updatedData = {};
    updatedData[currCountry["alpha3"]] = 'green';

    map.updateChoropleth(updatedData);
  }

  //Otherwise continue
  else {
    let guessCode = countryList.filter(obj => {
      return obj.country.toLowerCase() === $("#userInput").val().toLowerCase();
    })[0];
    
    let dist = distance(guessCode["latitude"], guessCode["longitude"]);
    let color = "";

    /*
      farthest: '#540600',
      far: '#963f0c',
      close: '#dbb21f',
      closest: '#bad90d',
      correct: 'green'

    */

    //Current Distance setup  
    if(dist >= 75) {
      color = '#540600';
    } else if( dist >= 50) {
      color = '#963f0c';
    } else if(dist >= 25) {
      color = '#dbb21f';
    } else {
      color = '#bad90d';
    }

    // Console log information to look at if you want.
    let updatedData = {};
    updatedData[guessCode['alpha3']] = color;

    console.log(" Lat: " + guessCode["latitude"] + " Long: " + guessCode["longitude"]);
    console.log(distance(guessCode["latitude"], guessCode["longitude"]));

    map.updateChoropleth(updatedData);
  }
}