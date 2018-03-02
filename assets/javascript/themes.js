const themes = [
		{
			name: "The 90s",
			class: "the90s",
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
			]
		},
		{
			name: "Video Games",
			class: "video-games",
			questions: [
				{
					text: "What was the first console video game that allowed the game to be saved?",
					responses: [
						{option: "Castlevania", answer: false},
						{option: "The Legend of Zelda", answer: true},
						{option: "Dragon Quest", answer: false},
						{option: "Metroid", answer: false}
					],
					image: "assets/images/zelda.gif"
				},
				{
					text: "The first person shooter video game Doom was first released in what year?",
					responses: [
						{option: "1995", answer: false},
						{option: "1997", answer: false},
						{option: "1991", answer: false},
						{option: "1993", answer: true}
					],
					image: "assets/images/doom.gif"
				},
				{
					text: "In what year did Nintindo release its first game console in North America?",
					responses: [
						{option: "1982", answer: false},
						{option: "1985", answer: true},
						{option: "1979", answer: false},
						{option: "1989", answer: false}
					],
					image: "assets/images/nintendo.webp"
				},
				{
					text: 'What is the tenth game in the "Assassin\' Creed" series, which takes place in Ptolemaic Egypt?',
					responses: [
						{option: "Assassin's Creed Unity", answer: false},
						{option: "Assassin's Creed Syndicate", answer: false},
						{option: "Assassin's Creed Rogue", answer: false},
						{option: "Assassin's Creed Origins", answer: true}
					],
					image: "assets/images/ac-origins.gif"
				},
				{
					text: "I'm amphibious and I like to leap and hop between cars and trucks. What game am I?",
					responses: [
						{option: "Leaper", answer: false},
						{option: "Road Kill", answer: false},
						{option: "Frogger", answer: true},
						{option: "Jumper", answer: false}
					],
					image: "assets/images/frogger.gif"
				},
				{
					text: 'What is the name of the fictional English archaeologist in the game "Tomb Raider"',
					responses: [
						{option: "Lara Croft", answer: true},
						{option: "Sarah Kerrigan", answer: false},
						{option: "Sophitia", answer: false},
						{option: "Ivy Valentine", answer: false}
					],
					image: "assets/images/lara-croft.gif"
				},
				{
					text: "The Covenant are fictional military alien races in which game series?",
					responses: [
						{option: "Mario", answer: false},
						{option: "Gears of War", answer: false},
						{option: "Metal Gear Solid", answer: false},
						{option: "Halo", answer: true}
					],
					image: "assets/images/halo.gif"
				},
				{
					text: "'Black Ops' is the subtitle of which game?",
					responses: [
						{option: "Halo", answer: false},
						{option: "Call of Duty", answer: true},
						{option: "Metal Gear Solid", answer: false},
						{option: "Zelda", answer: false}
					],
					image: "assets/images/black-ops.gif"
				}
			]
		},
		{
			name: "Movies",
			class: "movies",
			questions: [
				{
					text: "Marlin, Dory and Gill are characters from which 2003 animated movie?",
					responses: [
						{option: "The Incredibles", answer: false},
						{option: "Lilo & Stitch", answer: false},
						{option: "Ice Age", answer: false},
						{option: "Finding Nemo", answer: true}
					],
					image: "assets/images/nemo.gif"
				},
				{
					text: "Who directed the 2017 version of Murder on the Orient Express?",
					responses: [
						{option: "Kenneth Branagh", answer: true},
						{option: "Christopher Nolan", answer: false},
						{option: "Martin Scorsese", answer: false},
						{option: "David Lynch", answer: false}
					],
					image: "assets/images/mo-express.gif"
				},
				{
					text: "Harrison Ford and Ryan Gosling star in which film, set in the year 2049?",
					responses: [
						{option: "Star Wars: The Last Jedi", answer: false},
						{option: "Blade Runner 2049", answer: true},
						{option: "Ex Machina", answer: false},
						{option: "La La Land", answer: false}
					],
					image: "https://media.giphy.com/media/xUPGcH3loGLLA39ikU/source.gif"
				},
				{
					text: 'Gal Gadot plays Wonder Woman in the 2017 film, but where was she born?',
					responses: [
						{option: "USA", answer: false},
						{option: "Brazil", answer: false},
						{option: "Israel", answer: true},
						{option: "Italy", answer: false}
					],
					image: "assets/images/ac-origins.gif"
				},
				{
					text: "Which actor appeared in American Graffiti before starring in Star Wars?",
					responses: [
						{option: "Mark Hamill", answer: false},
						{option: "Woody Harrison", answer: false},
						{option: "Harrison Ford", answer: true},
						{option: "Carrie Fisher", answer: false}
					],
					image: "assets/images/HanSoloCantina.gif"
				},
				{
					text: "Which US film director will return to direct Star Wars Episode IX after directing 2015's The Force Awakens?",
					responses: [
						{option: "JJ Abrams", answer: true},
						{option: "George Lucas", answer: false},
						{option: "Harrison Ford", answer: false},
						{option: "Ron Howard", answer: false}
					],
					image: "assets/images/lara-croft.gif"
				},
				{
					text: "Who played the role of Lucius Fox in the 2008 film The Dark Knight?",
					responses: [
						{option: "Denzel Washington", answer: false},
						{option: "Morgan Freeman", answer: true},
						{option: "Idris Elba", answer: false},
						{option: "Lawrence Fishburne", answer: false}
					],
					image: "assets/images/halo.gif"
				},
				{
					text: "For which comedy did Tom Hanks receive his first Oscar nomination?",
					responses: [
						{option: "A League of Their Own", answer: false},
						{option: "Sleepless in Seattle", answer: false},
						{option: "Splash", answer: false},
						{option: "Big", answer: true}
					],
					image: "assets/images/black-ops.gif"
				}
			]
		},
		{
			name: "Music",
			class: "music",
			questions: [
				{
					text: "How many keys are on most baby grand pianos?",
					responses: [
						{option: "100", answer: false},
						{option: "68", answer: false},
						{option: "88", answer: true},
						{option: "50", answer: false}
					],
					image: "assets/images/zelda.gif"
				},
				{
					text: "Which one of Prince's songs reached highest on the music charts?",
					responses: [
						{option: "When Dove's Cry", answer: true},
						{option: "Kiss", answer: false},
						{option: "Let's Go Crazy", answer: false},
						{option: "Cream", answer: false}
					],
					image: "assets/images/doom.gif"
				},
				{
					text: 'Who was the lead singer of the band "Queen"?',
					responses: [
						{option: "Robert Plant", answer: false},
						{option: "Axl Rose", answer: false},
						{option: "Ozzy Osborne", answer: false},
						{option: "Freddie Mercury", answer: true}
					],
					image: "assets/images/nintendo.webp"
				},
				{
					text: 'Which band released the song, "Hey There Delilah"?',
					responses: [
						{option: "Arcade Fire", answer: false},
						{option: "The Shins", answer: false},
						{option: "Plain White T's ", answer: true},
						{option: "The Yeah Yeah Yeahs", answer: false}
					],
					image: "assets/images/ac-origins.gif"
				},
				{
					text: "What musician won the Nobel Prize for Literature in 2016?",
					responses: [
						{option: "Prince", answer: false},
						{option: "Bob Dylan", answer: true},
						{option: "Keith Richards", answer: false},
						{option: "Mick Jagger", answer: false}
					],
					image: "assets/images/frogger.gif"
				},
				{
					text: 'Which famous American musician was fatally shot by his father on April 1, 1984?',
					responses: [
						{option: "Marvin Gaye", answer: true},
						{option: "Peter Tosh", answer: false},
						{option: "Bob Marley", answer: false},
						{option: "Jimmy Hendrix", answer: false}
					],
					image: "assets/images/lara-croft.gif"
				},
				{
					text: 'Rapper Vanilla Ice had a hit song titled "Ice Ice Baby", from which other song did "Ice Ice Baby" sample from?',
					responses: [
						{option: '"Ballad of a Thin Man" by Bob Dylan', answer: false},
						{option: '"White Winter Hymnal" by Fleet Foxes', answer: false},
						{option: '"Under Pressure" by Queen and David Bowie', answer: true},
						{option: '"Big Bang Baby" by Stone Temple Pilots', answer: false}
					],
					image: "assets/images/halo.gif"
				},
				{
					text: "What was the highest selling album of the 1980's?",
					responses: [
						{option: "Born in the U.S.A. - Bruce Springsteen", answer: false},
						{option: "Rain Dogs - Tom Waits", answer: false},
						{option: "Purple Rain - Prince", answer: false},
						{option: "Thriller - Michael Jackson", answer: true}
					],
					image: "assets/images/black-ops.gif"
				}
			]
		}
	];

	const shia = {
		"happy":[
			"assets/images/shia-1.gif",
			"assets/images/shia-6.gif"
		],
		"sad": [
			"assets/images/shia-2.gif",
			"assets/images/shia-3.gif",
			"assets/images/shia-4.gif",
			"assets/images/shia-5.gif",
			"assets/images/shia-7.gif",
			"assets/images/shia-8.gif",
			"assets/images/shia-watching-movies-blink-1.gif",
			"assets/images/shia-watching-movies-chewing-1.gif",
			"assets/images/shia-watching-movies-drinking-1.gif",
			"assets/images/shia-watching-movies-eye-rub-1.gif",
			"assets/images/shia-watching-movies-head-down-1.gif",
			"assets/images/shia-watching-movies-itch-1.gif",
			"assets/images/shia-watching-movies-sitting-1.gif",
			"assets/images/shia-watching-movies-sleepy-smiling-1.gif",
			"assets/images/shia-watching-movies-smiling-1.gif"
		]
	};