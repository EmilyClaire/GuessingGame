(function(){
var playersGuess,
    winningNumber  = generateWinningNumber();

var guesses = {};
guesses.arr = [];


/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber() {
   return Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess

function playersGuessSubmission() {
	playersGuess = +$('input').val();
   $('input').val("");
   checkGuess();
}
// Determine if the next guess should be a lower or higher number

function lowerOrHigher() {
	if(playersGuess > winningNumber){
      return "higher";
   }

   return "lower";
}

// Check if the Player's Guess is the winning number

function checkGuess(){
	if(playersGuess === winningNumber){
      $('body').addClass('winner');
      output("You've won!");
   }
   else{
      if(duplicate(guesses.arr, playersGuess)){
         guessMessage("Duplicate guess. Try again!");
      }
      else if(guesses.arr.length < 2){
         guesses.arr.push(playersGuess);
         guessMessage("Try again!");
      }
      else{
         $('body').addClass('loser');
         output("You Lose");
      }
   }
}

//Checks if the guess is a duplicate
function duplicate(arr, input){
   for(var i = 0; i < arr.length; i++){
      if(arr[i] === input){
         return true;
      }
   }
   return false;
};

//Creates a message and outputs it to the DOM with hints

function guessMessage(msg){
   msg = "Your guess was " + lowerOrHigher() + " than the correct value. "
      + "It was also " + distance() + " distance away.  You have "
      + (3 - guesses.arr.length) +" guesses left. " + msg;
   output(msg);
}

//Calculates the distance between the guess and the correct number
function distance(){
   return Math.abs(playersGuess - winningNumber);
}
//Outputs messages to the DOM
function output(msg){
   $('#result').text(msg);
};
// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	if(winningNumber <= 50){
      alert("The winning number is less than or equal to 50");
   }
   else {
      alert("The winning number is greater than 50");
   }
}

// Allow the "Player" to Play Again

function playAgain(){
   winningNumber  = generateWinningNumber();
   guesses.arr = [];
   $('input').val("");
   output("Welcome!");
   $('body').removeClass('winner');
   $('body').removeClass('loser');
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
$('#hint-button').on('click', provideHint);
$('#submit-button').on('click', playersGuessSubmission);
$('#again-button').on('click', playAgain);
$(document).on("keypress",  function(event){
   if(event.keyCode == '13'){
      event.preventDefault();
      playersGuessSubmission();
   }
});

});
})();
