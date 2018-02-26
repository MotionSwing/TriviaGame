$(document).ready(function(){

	$(".container").on('click', '#start', function(event) {
		this.remove();
		game.initialize();
		$(".trivia, #done").css('display', 'block');
		$(".container").css('height', 'initial');
		gameClock.startCountdown();
	}).on('click', '#done', function(event) {
		game.stopGame();
	});

	const gameClock = {
		intervalId: 0,
		isRunning: false,
		remainingSeconds: 30,
		startCountdown: function() {
			$(".countdown").text(gameClock.remainingSeconds + " Seconds");
			if(!gameClock.isRunning) {
				gameClock.intervalId = setInterval(gameClock.decrement, 1000);
				isRunning = true;
			}
		},
		decrement: function() {
			gameClock.remainingSeconds--;
			$(".countdown").text(gameClock.remainingSeconds + " Seconds");
			if(gameClock.remainingSeconds === 0) {
				// $(".trivia").css('display', 'none');
				// $(".results").css('display', 'block');
				// game.updateStats();
				// gameClock.stopCountdown();
				game.stopGame();
			}
		},
		stopCountdown: function(){
			clearInterval(gameClock.intervalId);
			gameClock.intervalId = 0;
			isRunning = false;
		}
	};

	const game = {
		answeredCorrectly: 0,
		answeredIncorrectly: 0,
		unanswered: 0,
		questions: [
			{
				text: "What was the first full length CGI movie?",
				answers: [
					{option: "A Bug's Life", correct: false},
					{option: "Monster's Inc.", correct: false},
					{option: "Toy Story", correct: true},
					{option: "The Lion King", correct: false}
				]
			},
			{
				text: "Which of these is NOT a name of one of the Spice Girls?",
				answers: [
					{option: "Sporty Spice", correct: false},
					{option: "Fred Spice", correct: true},
					{option: "Scary Spice", correct: false},
					{option: "Posh Spice", correct: false}
				]
			},
			{
				text: "Which NBA team won the most titles in the 90s?",
				answers: [
					{option: "New York Knicks", correct: false},
					{option: "Portland Trailblazers", correct: false},
					{option: "Los Angeles Lakers", correct: false},
					{option: "Chicago Bulls", correct: true}
				]
			},
			{
				text: 'Which group released the hit song, "Smells Like Teen Spirit"?',
				answers: [
					{option: "Nirvana", correct: true},
					{option: "Backstreet Boys", correct: false},
					{option: "The Offspring", correct: false},
					{option: "No Doubt", correct: false}
				]
			},
			{
				text: 'Which popular Disney movie featured the song, "Circle of Life"?',
				answers: [
					{option: "Aladdin", correct: false},
					{option: "Hercules", correct: false},
					{option: "Mulan", correct: false},
					{option: "The Lion King", correct: true}
				]
			},
			{
				text: 'Finish this line from the Fresh Prince of Bel-Air theme song: "I '+ 
				  'whistled for a cab and when it came near, the license plate said..."',
				answers: [
					{option: "Dice", correct: false},
					{option: "Mirror", correct: false},
					{option: "Fresh", correct: true},
					{option: "Cab", correct: false}
				]
			},
			{
				text: "What was Doug's best friend's name?",
				answers: [
					{option: "Skeeter", correct: true},
					{option: "Mark", correct: false},
					{option: "Zach", correct: false},
					{option: "Cody", correct: false}
				]
			},
			{
				text: "What was the name of the principal at Bayside High in Saved By the Bell?",
				answers: [
					{option: "Mr. Zhou", correct: false},
					{option: "Mr. Driggers", correct: false},
					{option: "Mr. Belding", correct: true},
					{option: "Mr. Page", correct: false}
				]
			}
		],
		initialize: function() {
			$(".trivia>div").remove();
			for (var i = 0; i < game.questions.length; i++) {
				// $("#trivia" + (i+1)).empty();
				const question_text = $("<p>").text(game.questions[i].text);
				const question_form = $("<form>");
				for (var j = 0; j < game.questions[i].answers.length; j++) {
					const option = $("<input>");
					option.attr({
						type: 'radio',
						id: 'q' + (i+1) + '_option' + (j + 1),
						value: game.questions[i].answers[j].correct,
						name: 'question' + (i+1)
					});
					const label = $("<label>").attr('for', 'q' + (i+1) + '_option' + (j + 1));
					label.text(game.questions[i].answers[j].option); 
					question_form.append(option, label);
				}
				const question = $("<div>").addClass('question').attr('id', 'trivia' + i);

				question.append(question_text, question_form);
				$(".trivia").append(question);
			}
		},
		updateStats: function() {
			for (var i = 0; i < game.questions.length; i++) {
				if($("input[name=question"+ (i + 1) +"]:checked").val() === "true"){
					game.answeredCorrectly++;
				}else if($("input[name=question"+ (i + 1) +"]:checked").val() === "false") {
					game.answeredIncorrectly++;
				}else {
					game.unanswered++;
				}
			}
			
			$(".correct").text(game.answeredCorrectly);
			$(".incorrect").text(game.answeredIncorrectly);
			$(".unanswered").text(game.unanswered);
		},
		stopGame: function() {
			$(".trivia, #done").css('display', 'none');
			$(".results").css('display', 'block');
			game.updateStats();
			gameClock.stopCountdown();
		}
	}

});