var currCountry;
var currScore = 0;
var maxScore = countryList.length;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandCountry() {
  let countryNum = getRandomInteger(0, maxScore - 1);
  currCountry = countryList[countryNum];
  console.log(currCountry["country"] + " " + currCountry["alpha3"] + " Lat: " + currCountry["latitude"] + " Long: " + currCountry["longitude"]);
}

function distance(sourceLat, sourceLong) {
  return Math.sqrt( Math.pow((currCountry["longitude"]-sourceLong), 2) + Math.pow((currCountry["latitude"]-sourceLat), 2));
}

function submitGuess() {

  // if we get a correct guess, then run this code
  if($("#userInput").val() == currCountry["country"]) {
    currScore++;
    $('#score').text(currScore + " / " + maxScore);
    $("#userInput").val("");
    let updatedData = {};
    updatedData[currCountry["alpha3"]] = 'green';

    map.updateChoropleth(updatedData);
  }

  //otherwise we need to do some other work
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

    if(dist >= 75) {
      color = '#540600';
    } else if( dist >= 50) {
      color = '#963f0c';
    } else if(dist >= 25) {
      color = '#dbb21f';
    } else {
      color = '#bad90d';
    }

    console.log(color);
    
    let updatedData = {};
    updatedData[guessCode['alpha3']] = color;

    console.log(" Lat: " + guessCode["latitude"] + " Long: " + guessCode["longitude"]);
    console.log(distance(guessCode["latitude"], guessCode["longitude"]));

    map.updateChoropleth(updatedData);
  }
}