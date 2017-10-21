function handleInstructionsModal() {
	// when users click on the element with
	// `.js-what` class, we'll fade in
	// the instructions modal
	$('.js-what').click(function() {
		$('.overlay').fadeIn(1000);
	});

	// when users click on the element with the
	// `.js-close` class, we'll fade out
	// the instructions modal
	$('.js-close').click(function(){
  		$(".overlay").fadeOut(1000);
  	});
}


// `$(document).ready` lets you specify a
// function that should execute when all the
// resources required by your web page have loaded.
// This code says, when the document is ready, run the
// `handleInstructionsModal` function.
$(document).ready(function(){
	handleInstructionsModal();
	var secret = 0;
	var numberOfGuesses = 0;
	var guesses = [];
	var distance = null;
	var previousDistance = null;
	startNewGame();
	$('a.new.js-new-game').click(function(){
		startNewGame();
	});
	$('#js-guess-submit').click(function() { return false; });
	$('#js-guess-submit').click(function(){
		if (validateInput()) {
			checkInput();
			guessCount();
			showGuess();	
		}
		clearInput();
	});
//$('span.count.js-guess-count').show();

// make a function to run the 'new game' (newGame()) button that will
// start a new game. it also need to reset/clear everything.
	function startNewGame() {
		initSecret();
	


	}

	// write a function that randomly selects a number between 1-100 to be the 
	// secret number for the game. also ensure that it resets upon clicking the 'new game' button.
	function initSecret(){
		secret = Math.floor((Math.random() * 100) + 1);
		console.log('secret number is:' + secret);
		numberOfGuesses = 0;
		$('#guessList').empty();
		$('span.count.js-guess-count').html(numberOfGuesses);
		clearInput();
		showFeedback('Make your Guess!');
	}


	// make sure that the user gets an error message if the user does not supply a numerical number between
	// 1-100 or if the user types in anything other than a number.
	function validateInput(){
		var input = $('input#js-user-guess.text').val();
		var status = false;
		if (parseInt(input)==NaN){
			status = false;
		}else {
			if ((input <= 100) && (input >= 1)){
				status = true;
			}else {
				status = false;
				showFeedback('error must be a number between 1-100');
			}
		}
	//check to see if a number else do nothing


		return status;
	}


	function showFeedback(message) {
		$('#feedback').html(message);
	}




	// write a function that gives feedback about each guess made by the user. 
	// ie. hot, cold, very hot, ice cold.make sure that it runs and 
	// updates upon every user guess. feedback about the guess will need to appear in 'h2#feedback'


	function checkInput(){
		var input = $('input#js-user-guess.text').val();
		input = parseInt(input);
		var distance = Math.abs(secret - input);
		if (input === secret){
			showFeedback('Correct!!!!!!!!');
		}
		else if (distance <= 10) {
			showFeedback('You\'re burnin\' up!');
		}
		else if (distance <= 30) {
			showFeedback('You\'re Warming up');
		}
		else if (distance <= 50) {
			showFeedback('It\'s getting chilly');
		}
		else {
			showFeedback('Ice cold');
		}

	}



	// game should track how many guesses the user has made. 
	// feedback should appear in a 'span#count' defualt to 0 upon page reload
	// or game restart.
	function guessCount(){
		numberOfGuesses += 1;
			$('span.count.js-guess-count').html(numberOfGuesses);
			console.log(numberOfGuesses);
			
	}



	// provide a list of users guessed numbers to prevent guessing the same number.
	// provide this in a '<li> to the ul#guessList'

	function showGuess(){
	 	var guess = $('input#js-user-guess.text').val();
	 	$('#guessList').append('<li>'+ guess +'</li>');
	}

	function clearInput(){
		$('input#js-user-guess.text').val('');
	}

});


