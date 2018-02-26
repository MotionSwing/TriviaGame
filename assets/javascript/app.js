$(document).ready(function(){

	$(".results, .trivia, #restart, #done").addClass('hide');

	$(".container").on('click', '#start', function(event) {
		this.remove();
		// game.initialize_basic();
		game.initialize_advanced();
		$(".container").css('height', 'initial');
	}).on('click', '#done', function(event) {
		game.stopGame();
	}).on('click', '#restart', function(event) {
		game.resetGame();
		game.initialize_advanced();
	});

	const gameClock = {
		allowedTime: 30,
		intervalId: 0,
		isRunning: false,
		remainingSeconds: null,
		startCountdown: function() {
			gameClock.remainingSeconds = gameClock.allowedTime;
			$(".countdown").text(gameClock.remainingSeconds + " Seconds");
			if(!gameClock.isRunning) {
				gameClock.intervalId = setInterval(gameClock.decrement, 1000);
				isRunning = true;
			}
		},
		decrement: function() {
			gameClock.remainingSeconds--;
			$(".countdown").text(gameClock.remainingSeconds + " Seconds");
			if(gameClock.remainingSeconds === 0 && game.gameType === "Basic") {
				game.stopGame();
			}else if(gameClock.remainingSeconds === 0 && game.gameType === "Advanced"){
				gameClock.stopCountdown();
				game.unanswered++;
				game.displayAnswer(game.nextQuestion - 1, "Out of Time!");
				if(!game.isLastQuestion){
					gameClock.resetCountdown();	
				}else {
					game.displayStats();
				}
				
			}
		},
		stopCountdown: function(){
			clearInterval(gameClock.intervalId);
			gameClock.intervalId = 0;
			isRunning = false;
		},
		resetCountdown: function(){
			setTimeout(function(){
				if(!game.isLastQuestion) {
					gameClock.remainingSeconds = gameClock.allowedTime;
					game.displayQuestion(game.nextQuestion);
				}else {
					game.displayStats();
				}
			},3000);	
		}
	};

	const game = {
		gameType: "Basic",
		answeredCorrectly: 0,
		answeredIncorrectly: 0,
		unanswered: 0,
		nextQuestion: 0,
		isLastQuestion: false,
		questions: [
			{
				text: "What was the first full length CGI movie?",
				responses: [
					{option: "A Bug's Life", answer: false},
					{option: "Monster's Inc.", answer: false},
					{option: "Toy Story", answer: true},
					{option: "The Lion King", answer: false}
				],
				image: "assets/images/toy-story.gif"
			},
			{
				text: "Which of these is NOT a name of one of the Spice Girls?",
				responses: [
					{option: "Sporty Spice", answer: false},
					{option: "Fred Spice", answer: true},
					{option: "Scary Spice", answer: false},
					{option: "Posh Spice", answer: false}
				],
				image: "assets/images/spice-girls.gif"
			},
			{
				text: "Which NBA team won the most titles in the 90s?",
				responses: [
					{option: "New York Knicks", answer: false},
					{option: "Portland Trailblazers", answer: false},
					{option: "Los Angeles Lakers", answer: false},
					{option: "Chicago Bulls", answer: true}
				],
				image: "assets/images/bulls.gif"
			},
			{
				text: 'Which group released the hit song, "Smells Like Teen Spirit"?',
				responses: [
					{option: "Nirvana", answer: true},
					{option: "Backstreet Boys", answer: false},
					{option: "The Offspring", answer: false},
					{option: "No Doubt", answer: false}
				],
				image: "assets/images/nirvana.gif"
			},
			{
				text: 'Which popular Disney movie featured the song, "Circle of Life"?',
				responses: [
					{option: "Aladdin", answer: false},
					{option: "Hercules", answer: false},
					{option: "Mulan", answer: false},
					{option: "The Lion King", answer: true}
				],
				image: "assets/images/lion-king.gif"
			},
			{
				text: 'Finish this line from the Fresh Prince of Bel-Air theme song: "I '+ 
				  'whistled for a cab and when it came near, the license plate said..."',
				responses: [
					{option: "Dice", answer: false},
					{option: "Mirror", answer: false},
					{option: "Fresh", answer: true},
					{option: "Cab", answer: false}
				],
				image: "assets/images/fresh.gif"
			},
			{
				text: "What was Doug's best friend's name?",
				responses: [
					{option: "Skeeter", answer: true},
					{option: "Mark", answer: false},
					{option: "Zach", answer: false},
					{option: "Cody", answer: false}
				],
				image: "assets/images/skeeter.gif"
			},
			{
				text: "What was the name of the principal at Bayside High in Saved By the Bell?",
				responses: [
					{option: "Mr. Zhou", answer: false},
					{option: "Mr. Driggers", answer: false},
					{option: "Mr. Belding", answer: true},
					{option: "Mr. Page", answer: false}
				],
				image: "assets/images/mrbelding.gif"
			}
		],
		initialize_basic: function() {
			game.gameType = "Basic";
			$(".question").remove();
			for (var i = 0; i < game.questions.length; i++) {
				const question_text = $("<p>").text(game.questions[i].text);
				const question_form = $("<form>");
				for (var j = 0; j < game.questions[i].responses.length; j++) {
					const option = $("<input>");
					option.attr({
						type: 'radio',
						id: 'q' + (i+1) + '_option' + (j + 1),
						value: game.questions[i].responses[j].answer,
						name: 'question' + (i+1)
					});
					const label = $("<label>").attr('for', 'q' + (i+1) + '_option' + (j + 1));
					label.text(game.questions[i].responses[j].option); 
					question_form.append(option, label);
				}
				const question = $("<div>").attr('id', 'trivia' + (i + 1)).addClass('question');

				question.append(question_text, question_form);
				$(".trivia").append(question);
				$(".trivia, #done").removeClass('hide');
				gameClock.startCountdown();
			}
		},
		initialize_advanced: function() {
			game.gameType = "Advanced";
			game.nextQuestion = 0;
			$(".results, #restart").addClass('hide');
			game.displayQuestion(game.nextQuestion);
			$(".trivia").removeClass('hide');
		},
		displayQuestion: function(index){
			$(".trivia").empty();
			$(".trivia").html('<p>Time Remaining: <span class="countdown">30 Seconds</span></p>');
			$(".trivia").append($("<p>").text(game.questions[index].text));
			for (var i = 0; i < game.questions[index].responses.length; i++) {
				var btn_option = $("<button>").addClass('btn-option').text(game.questions[index].responses[i].option);
				btn_option.data('value', game.questions[index].responses[i].answer);
				$(".trivia").append(btn_option);
			}

			$(".btn-option").on('click', function(event) {
				if($(this).data('value') === true){
					// Correct
					game.answeredCorrectly++;
					gameClock.stopCountdown();
					game.displayAnswer(index,"Correct!");
					gameClock.resetCountdown();
				}else {
					// Nope
					game.answeredIncorrectly++;
					gameClock.stopCountdown();
					game.displayAnswer(index,"Nope!");
					gameClock.resetCountdown();
				}
			});

			game.nextQuestion++;
			if (game.nextQuestion === game.questions.length){
				game.isLastQuestion = true;
			}
			gameClock.startCountdown();
		},
		displayAnswer: function(index, message){
			$(".trivia :gt(1)").remove();
			const status_text = $("<h2>").text(message);
			if (message === "Correct!") {
				$(".trivia").append(status_text);
			}else {
				const answer = $("<p>").html("<p>The Correct Answer was: "+ game.getAnswer(index) +"</p>");
				$(".trivia").append(status_text, answer);	
			}
			const answerImg = $("<img>").attr('src', game.questions[index].image);
			$(".trivia").append(answerImg);
		},
		getAnswer: function(index){
			for (var i = 0; i < game.questions[index].responses.length; i++) {
				if(game.questions[index].responses[i].answer === true){
					return game.questions[index].responses[i].option;
				}
			}
			return "No Answer";
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
			if(game_type === "Basic"){
				for (var i = 0; i < game.questions.length; i++) {
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
			$(".trivia, #done").addClass('hide');
			$(".results").removeClass('hide');
			// TODO: build a way to switch between updating basic or advanced stats
			game.updateStats("Basic");
			gameClock.stopCountdown();
		},
		resetGame: function() {
			game.answeredCorrectly = 0;
			game.answeredIncorrectly = 0;
			game.unanswered = 0;
			game.nextQuestion = 0;
			game.isLastQuestion = false;
			$(".results, .trivia, #restart, #done").addClass('hide');
		}
	}

});