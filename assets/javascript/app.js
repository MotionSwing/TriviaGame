$(document).ready(function(){

	// 
	$(".results, .trivia, #restart, #done").addClass('hide');

	$(".container").on('click', '#start', function(event) {
		this.remove();
		game.start_game();
		// $(".container").css('height', 'initial');
	}).on('click', '#done', function(event) {
		game.stopGame(); // TODO: use it or lose it
	}).on('click', '#restart', function(event) {
		// game.resetGame();
		game.start_game();
	}).on('click', '.theme', function(event) {
		console.log($(this).data('theme'));
		game.loadTheme($(this).data('theme'));
	});

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
		reset: function(){
			setTimeout(function(){
				if(!game.isLastQuestion) {
					gameClock.remainingSeconds = gameClock.allowedTime;
					game.displayQuestion(game.nextQuestion);
				}else {
					game.displayStats();
				}
			},4000);	
		},
		countdown: function() {
			gameClock.remainingSeconds--;
			$(".countdown").text(gameClock.remainingSeconds + " Seconds");
			if(gameClock.remainingSeconds === 0 && game.gameType === "Basic") {
				game.stopGame(); // TODO: use it or lose it
			}else if(gameClock.remainingSeconds === 0 && game.gameType === "Advanced"){
				gameClock.stop();
				game.unanswered++;
				game.displayAnswer(game.nextQuestion - 1, "Out of Time!");
				if(!game.isLastQuestion){
					gameClock.reset();	
				}else {
					game.displayStats();
				}
			}
		}
	};

	const game = {
		gameType: "Advanced",
		answeredCorrectly: 0,
		answeredIncorrectly: 0,
		unanswered: 0,
		nextQuestion: 0,
		isLastQuestion: false,
		selectedTheme: 0,
		start_game: function() {
			game.answeredCorrectly = 0;
			game.answeredIncorrectly = 0;
			game.unanswered = 0;
			game.nextQuestion = 0;
			game.isLastQuestion = false;
			$(".results, .trivia, #restart, #done").addClass('hide');

			// Load the selected game type
			if(game.gameType === "Basic"){
				game.initialize_basic();
			}else{
				game.initialize_advanced();
			}
		},
		choose_theme: function(themeNum) {
			if(themeNum != null){
				game.selectedTheme = themeNum;
			}else {
				game.selectedTheme = Math.floor(Math.random() * themes.length); 
			}
			$("body").removeClass().addClass(themes[game.selectedTheme].class);
		},
		initialize_basic: function() {
			$(".question").remove();
			for (var i = 0; i < themes[game.selectedTheme].questions.length; i++) {
				const question_text = $("<p>").text(themes[game.selectedTheme].questions[i].text);
				const question_form = $("<form>");
				for (var j = 0; j < themes[game.selectedTheme].questions[i].responses.length; j++) {
					const option = $("<input>");
					option.attr({
						type: 'radio',
						id: 'q' + (i+1) + '_option' + (j + 1),
						value: themes[game.selectedTheme].questions[i].responses[j].answer,
						name: 'question' + (i+1)
					});
					const label = $("<label>").attr('for', 'q' + (i+1) + '_option' + (j + 1));
					label.text(themes[game.selectedTheme].questions[i].responses[j].option); 
					question_form.append(option, label);
				}
				const question = $("<div>").attr('id', 'trivia' + (i + 1)).addClass('question');

				question.append(question_text, question_form);
				$(".trivia").append(question);
				$(".trivia, #done").removeClass('hide');
			}
			gameClock.start();
		},
		initialize_advanced: function() {
			// Reset the 'next' question
			game.nextQuestion = 0;
			$(".results, #restart").addClass('hide');

			// Display the next question
			game.displayQuestion(game.nextQuestion);
		},
		displayQuestion: function(index){
			// Clear and rebuild the trivia section with the current question
			$(".trivia").empty();
			$(".trivia").html('<p>Time Remaining: <span class="countdown">30 Seconds</span></p>');
			$(".trivia").append($("<p>").text(themes[game.selectedTheme].questions[index].text));
			for (var i = 0; i < themes[game.selectedTheme].questions[index].responses.length; i++) {
				const btn_option = $("<button>").addClass('btn-option').text(themes[game.selectedTheme].questions[index].responses[i].option);
				btn_option.data('value', themes[game.selectedTheme].questions[index].responses[i].answer);
				$(".trivia").append(btn_option);
			}
			$(".trivia").removeClass('hide');

			// Setup Event Listeners on newly created option buttons
			$(".btn-option").on('click', function(event) {
				if($(this).data('value') === true){
					// Player selects the correct answer
					game.answeredCorrectly++;
					game.celebration(10);
					gameClock.stop();
					game.displayAnswer(index,"Correct!");
					gameClock.reset();
				}else {
					// Player selects the wrong answer
					game.answeredIncorrectly++;
					gameClock.stop();
					game.displayAnswer(index,"Nope!");
					gameClock.reset();
				}
			});

			// set the index of the next question
			game.nextQuestion++;

			// Check if the next question is the last question
			if (game.nextQuestion === themes[game.selectedTheme].questions.length){
				game.isLastQuestion = true;
			}

			// Start the countdown
			gameClock.start();
		},
		displayAnswer: function(index, message){
			$(".trivia :gt(1)").remove();
			const status_text = $("<h2>").text(message);
			let answerImg;
			if (message === "Correct!") {
				$(".trivia").append(status_text);
				answerImg = $("<img>").attr('src', themes[game.selectedTheme].questions[index].image);
			}else {
				const answer = $("<p>").html("<p>The Correct Answer was: <span class='correct-answer'>"+ game.getAnswer(index) +"</span></p>");
				$(".trivia").append(status_text, answer);	
				answerImg = $("<img>").attr('src', themes[game.selectedTheme].questions[index].image);
			}
			$('.trivia').append($("<div>").addClass('answer-img'));
			// answerImg = $("<img>").attr('src', themes[game.selectedTheme].questions[index].image);
			$(".answer-img").append(answerImg);
		},
		getAnswer: function(index){
			for (var i = 0; i < themes[game.selectedTheme].questions[index].responses.length; i++) {
				if(themes[game.selectedTheme].questions[index].responses[i].answer === true){
					return themes[game.selectedTheme].questions[index].responses[i].option;
				}
			}
			return "No Answer";
		},
		celebration: function(count) {
			for (var i = 0; i < count; i++) {
				const size = ["sm","md","lg"];
				const star = $("<div>").addClass('star ' + size[Math.floor(Math.random() * size.length)]);
				star.css({
					'top': Math.floor(Math.random() * 100) + '%',
					'left': Math.floor(Math.random() * 100) + '%',
					'animation-delay': Math.floor(Math.random() * 30) * 100 + 'ms',
					'background-color': 
						'rgb('+ Math.floor(Math.random() * 255) +','+ 
						Math.floor(Math.random() * 255) +','+ 
						Math.floor(Math.random() * 255) +')'
				});
				$(".container").append(star);
			}
			setTimeout(function(){
				$('.star').remove();
			}, 4000);
		},
		displayStats: function() {
			$(".trivia :gt(1)").remove();
			$(".results, #restart").removeClass('hide');
			$(".results h2").text("All done, here's how you did!");
			$(".correct").text(game.answeredCorrectly);
			$(".incorrect").text(game.answeredIncorrectly);
			$(".unanswered").text(game.unanswered);
		},
		updateStats: function(game_type) {
			// TODO: This code block only runs when game type is basic
			// Make this code obsolete & delete...use it or lose it
			if(game.game_type === "Basic"){
				for (var i = 0; i < themes[game.selectedTheme].questions.length; i++) {
					if($("input[name=question"+ (i + 1) +"]:checked").val() === "true"){
						game.answeredCorrectly++;
					}else if($("input[name=question"+ (i + 1) +"]:checked").val() === "false") {
						game.answeredIncorrectly++;
					}else {
						game.unanswered++;
					}
				}				
			}
			$(".correct").text(game.answeredCorrectly);
			$(".incorrect").text(game.answeredIncorrectly);
			$(".unanswered").text(game.unanswered);
		},
		stopGame: function() {
			// TODO: use it or lose it
			$(".trivia, #done").addClass('hide');
			$(".results").removeClass('hide');
			// TODO: build a way to switch between updating basic or advanced stats
			game.updateStats("Basic");
			gameClock.stop();
		},
		resetGame: function() {
			game.answeredCorrectly = 0;
			game.answeredIncorrectly = 0;
			game.unanswered = 0;
			game.nextQuestion = 0;
			game.isLastQuestion = false;
			$(".results, .trivia, #restart, #done").addClass('hide');
		},
		loadTheme: function(themeName){
			for (var i = 0; i < themes.length; i++) {
				if(themes[i].name === themeName){
					game.choose_theme(i);
					return;
				}
			}
		}
	}
});