
var currentScore = 0;
var currentCountry;
var maxScore = 0;

//Random number generator to pick random country at random
function randomNum(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getCountry() {
    // Grab random country
    let randomCounty = randomNum(0, countries.length-1);
    //Remove country from list of available countries and stored in current value
    currentCountry = countries.splice(randomCounty, 1)[0];
    
    //Get image from countryshapes/
    let image = document.getElementById("preview");
    image.src = "./countryshapes/" + currentCountry['imageSrc'];

}
//Brute force a start game **NEED TO CHANGE BASED ON ADRIK**
function startGame(){
    //Get max score before country removed
    maxScore = countries.length;
    //get random Country
    getCountry();
    //Current Score
    currentScore = 0;
    //set Scoreboard
    scoreBoard();
    
}

function scoreBoard() {
    let scoreBox = document.getElementById("currentScore");
    
    scoreBox.textContent = currentScore + " / " + maxScore;
}

function giveHint(){
    let hint = document.getElementById("hintOutput");
    hint.innerHTML =
        '<div class="alert alert-primary" role="alert">'
        + currentCountry['hint'] +
        '</div>';
}

function giveError() {
    let err = document.getElementById("hintOutput");
    err.innerHTML =
        '<div class="alert alert-danger" role="alert">Incorrect</div>';
}

function submitAnswer(){
    console.log(currentCountry); //REMOVE

    let error = document.getElementById("hintOutput");
    error.innerHTML = ""; 
    
    let guess = document.getElementById("guess").value.toLowerCase();
    if(guess != "n/a" && guess === currentCountry["answer"] || guess === currentCountry["altAnswer"]){
        currentScore ++;
        getCountry();
        scoreBoard();
    } else {
        giveError();
    }
    document.getElementById("guess").value = "";
}

function endGame(){
    let answer = confirmClick();
    if(answer == true) {
        //Store Answer to profile
        //Return to main page
    } 
}

function resetGame(){
    let answer = confirmClick();
    if(answer == true) {
        window.location.reload();
    }
}

function confirmClick() {
    let text;
    if(confirm("Are you sure?") == true) {
        text = "Score reset"
        return true;
    } else {
        text = "Cancelled";
        return false;
    }

}