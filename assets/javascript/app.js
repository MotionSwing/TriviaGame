$(document).ready(function(){

	$(".results, .trivia, #restart").addClass('hide');

	$("body").on('click', '#start', function(event) {
		game.hasStarted = true;
		$(this).remove();
	}).on('click', '#start, #restart', function(event) {
		game.start_game();
	}).on('click', '.theme', function(event) {
		$('.theme').removeClass('active');
		$(this).addClass('active');
		for (var i = 0; i < themes.length; i++) {
			if(themes[i].name === $(this).data('theme')){
				game.selectedTheme = i;
				$("body").removeClass().addClass(themes[i].class);
				if(game.hasStarted){
					clearTimeout(game.timeout_Celebration);
					clearTimeout(game.timeout_EndRound);
					$('.flourish').remove();
					gameClock.stop();
					game.start_game();
				}
				return;
			}
		}
	});

	// Game Clock Object
	const gameClock = {
		allowedTime: 30,
		intervalId: 0,
		isRunning: false,
		remainingSeconds: null,
		start: function() {
			gameClock.remainingSeconds = gameClock.allowedTime;
			$(".countdown").text(gameClock.remainingSeconds + " Seconds");
			if(!gameClock.isRunning) {
				gameClock.intervalId = setInterval(gameClock.countdown, 1000);
				isRunning = true;
			}
		},
		stop: function(){
			clearInterval(gameClock.intervalId);
			gameClock.intervalId = 0;
			isRunning = false;
		},
		countdown: function() {
			// Decrement the remaining seconds
			gameClock.remainingSeconds--;

			// Display the updated remaining seconds
			$(".countdown").text(gameClock.remainingSeconds + " Seconds");

			// If still no guess after time's up, finish the round
			if(gameClock.remainingSeconds === 0){
				game.unanswered++;
				game.finishRound("Out of Time!");
			}
		}
	};

	// Game Object
	const game = {
		hasStarted: false,
		selectedTheme: 0,
		correctGuesses: 0,
		incorrectGuesses: 0,
		unanswered: 0,
		isLastQuestion: false,
		usedQuestions: [],
		availQuestions: [],
		questionIndex: 0,
		timeout_Celebration: 0,
		timeout_EndRound: 0,
		coins: 0,
		start_game: function() {
			// initialize variables
			game.correctGuesses = 0;
			game.incorrectGuesses = 0;
			game.unanswered = 0;
			game.isLastQuestion = false;
			game.usedQuestions = [];
			game.availQuestions = [0,1,2,3,4,5,6,7];
			game.questionIndex = game.getNextQuestionIndex();
			game.coins = 0;
			$(".results, .trivia, #restart, #done").addClass('hide');
			$('.purse').text('Coins Collected: ' + game.coins);

			// Display a question
			game.displayQuestion(game.questionIndex);

			//Start the countdown
			gameClock.start();
		},
		// Displays a question and its set of choices
		displayQuestion: function(index){
			// Build and display questions
			$(".trivia").empty();
			$(".trivia").html('<p>Time Remaining: <span class="countdown">30 Seconds</span></p>');
			$(".trivia").append($("<p>").text(themes[game.selectedTheme].questions[index].text));
			for (var i = 0; i < themes[game.selectedTheme].questions[index].responses.length; i++) {
				const btn_option = $("<button>").addClass('btn-option')
					.text(themes[game.selectedTheme].questions[index].responses[i].option);
				btn_option.data('value', themes[game.selectedTheme].questions[index].responses[i].answer);
				$(".trivia").append(btn_option);
			}
			$(".trivia").removeClass('hide');

			// Setup Event Listeners on newly created buttons
			$(".btn-option").on('click', function(event) {
				if($(this).data('value') === true){// Player selects the correct answer
					// Increment the correct guesses
					game.correctGuesses++;

					// Display celebration
					game.celebration(themes[game.selectedTheme].name,10);
					game.finishRound("Correct!");
				}else {// Player selects the wrong answer
					// increment the incorrect guesses
					game.incorrectGuesses++;
					game.finishRound("Nope!");
				}
			});
		},
		finishRound: function(message) {
			// Stop game clock
			gameClock.stop();

			// Display correct answer & image
			game.displayAnswer(game.questionIndex,message);

			// Check if there are no more available questions
			if (game.availQuestions.length === 0){
				game.isLastQuestion = true;
			}

			// Display next question after timeout (4 seconds)
			game.timeout_EndRound = setTimeout(function(){
				if(!game.isLastQuestion) {
					// Get index of next question
					game.questionIndex = game.getNextQuestionIndex();

					// Display the next question
					game.displayQuestion(game.questionIndex);
					
					// restart the game clock
					gameClock.start();
				}else {
					game.displayStats();
				}
			},4000);
		},
		// Gets the index of the next available question
		getNextQuestionIndex: function(){
			const chosenQ = game.availQuestions[Math.floor(Math.random() * game.availQuestions.length)];
			game.usedQuestions.push(chosenQ);
			game.availQuestions.splice(game.availQuestions.indexOf(chosenQ),1);
			return chosenQ;
		},
		// index = selected question to display the answer to
		// message = success/failure message to display to the player
		displayAnswer: function(index, message){
			$(".trivia :gt(1)").remove();
			const status_text = $("<h2>").text(message);
			let answerImg;
			if (message === "Correct!") {
				$(".trivia").append(status_text);
				answerImg = $("<img>").attr('src', themes[game.selectedTheme].questions[index].image);
			}else {
				const answer = $("<p>").html("<p>The Correct Answer was: <span class='correct-answer'>"+ 
					game.getAnswerText(index) + "</span></p>");
				$(".trivia").append(status_text, answer);
				if($('body').hasClass('movies')) {
					answerImg = $("<img>").attr('src', shia.sad[Math.floor(Math.random() * shia.sad.length)]);
				}else {
					answerImg = $("<img>").attr('src', themes[game.selectedTheme].questions[index].image);
				}
			}
			$('.trivia').append($("<div>").addClass('answer-img'));
			$(".answer-img").append(answerImg);
		},
		// Returns the text of the correct answer
		getAnswerText: function(index){
			for (var i = 0; i < themes[game.selectedTheme].questions[index].responses.length; i++) {
				if(themes[game.selectedTheme].questions[index].responses[i].answer === true){
					return themes[game.selectedTheme].questions[index].responses[i].option;
				}
			}
			return "No Answer";
		},
		// theme = name of the selected theme
		// count = number of flourishes to display
		celebration: function(theme,count) {
			for (var i = 0; i < count; i++) {
				const size = ["sm","md","lg"];
				let flourish;
				switch (theme) {
					case "The90s":
						flourish = $("<div>").addClass('flourish star ' + 
							size[Math.floor(Math.random() * size.length)]);
						flourish.css('background-color',
							'rgb('+ Math.floor(Math.random() * 255) +','+ 
							Math.floor(Math.random() * 255) +','+ 
							Math.floor(Math.random() * 255) +')'
							);
						break;
					case "Video Games":
						const coinSound = new Audio('assets/audio/Mario-coin-sound.mp3');
						coinSound.volume = 0.05;
						flourish = $("<div>");
						flourish.addClass('flourish coin ' + 
							' spin-dir-' + Math.floor(Math.random() * 2) + 
							' spin-speed-' + Math.floor(Math.random() * 7));
						flourish.css('left', (Math.floor(Math.random() * 100) + 1) + '%');
						flourish.on('click', function(event) {
							coinSound.play();
							game.coins++;
							$('.purse').text('Coins Collected: ' + game.coins);
							$(this).remove();
						});
						flourish.animate({top: "150%"}, Math.floor(Math.random() * (5000 - 2000)) + 2000, function(){
							$(this).remove();
						});
						break;
					case "Movies":
						flourish = $("<div>").addClass('flourish popcorn popcorn-1 ' + 
							size[Math.floor(Math.random() * size.length)]);
						break;
					case "Music":
						const musicalNotes = ["&#9833;","&#9834;","&#9835;","&#9836;","&#9837;","&#9839;"];
						flourish = $("<div>")
							.addClass('flourish musical-note ' + size[Math.floor(Math.random() * size.length)])
							.html(musicalNotes[Math.floor(Math.random() * musicalNotes.length)]);
						flourish.css('color', 
							'rgb('+ Math.floor(Math.random() * 255) +','+ 
							Math.floor(Math.random() * 255) +','+ 
							Math.floor(Math.random() * 255) +')'
							);
						break;
					default:
						flourish = $("<div>").addClass('flourish star ' + 
							size[Math.floor(Math.random() * size.length)]);
						flourish.css('background-color',
							'rgb('+ Math.floor(Math.random() * 255) +','+ 
							Math.floor(Math.random() * 255) +','+ 
							Math.floor(Math.random() * 255) +')'
							);
						break;
				}
				flourish.css({
					'top': Math.floor(Math.random() * 100) + '%',
					'left': Math.floor(Math.random() * 100) + '%',
					'animation-delay': Math.floor(Math.random() * 30) * 100 + 'ms',
				});
				$(".container").append(flourish);
			}
			game.timeout_Celebration = setTimeout(function(){
				$('.flourish').remove();
			}, 4000);
		},
		// Displays correct/incorrect/unanswered questions
		displayStats: function() {
			$(".trivia :gt(1)").remove();
			$(".results, #restart").removeClass('hide');
			$(".results h2").text("All done, here's how you did!");
			$(".correct").text(game.correctGuesses);
			$(".incorrect").text(game.incorrectGuesses);
			$(".unanswered").text(game.unanswered);
		}
	}
});