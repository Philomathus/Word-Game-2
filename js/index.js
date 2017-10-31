/*This script is for the main game-tab algorithms*/

var index = null, score = null;

var words = [['MUSIC'], ['HARMONY'], ['NOTE'], ['STAFF'], ['CLEF'], ['MELODY']];

var ingame_butFunc = [

	function() {
	
		initialize_wordChar();
		initialize_letters();
		
		toggle_progress_button(0);

	}, function() {
	
		words[index][1] = randomize(words[index][1]);
		initialize_letters();
	
	} /*, function() {
	
		***I've decided to remove the hint button***
		
		var word = content.words[index],
			randomInd = Math.floor(Math.random() * word.length),
			indices = getIndices(word.charAt(randomInd));
	
		indices.forEach(function(val) {

			document.querySelectorAll('.word p')[val].classList.add('font-visible');
		
		});
	}*/
];

function create_randomized_string() {

	words.forEach(function(val) {

		val[1] = randomize(insertChar(val[0], 14)).toUpperCase();

	});

}

function check_progress() {

	if(document.querySelectorAll('.word .font-visible').length === words[index][0].length) {
	
		index++;
		score += 1/words.length;
		
		if(index < words.length) {
		
			toggle_progress_button(250);
		
		} else {
		
			process_coda(true);
		
		}
		
	}
	
	if(document.querySelectorAll('.life .font-visible').length === 3) {
	
		process_coda(false);
	
	}

}

function process_coda(state) { /*true=winner false=loser*/

	loser_or_winner(Number(state));	
	ingame_tab_rotate();
	remove_cells_fontColor();

}

function loser_or_winner(x) {
	
	document.querySelector('#tally-card h1').textContent = ['LOSER', 'WINNER'][x];

}

function insertChar(string, length) {
	
	var alpha = 'qwertyuiopasdfghjklzxcvbnm',
		alpha_f = alpha.replace(RegExp('['+ string +']', 'ig'), ''), 
		string_f = alpha.replace(RegExp('[^'+ string +']', 'ig'), ''), 
		start = Math.floor(Math.random() * (alpha_f.length - length));
	
	return string_f + alpha_f.substr(start, length - string_f.length);
		
}

function randomize(string) {

	var array = string.split('');
	
	for(var i = 0, arrayLength = array.length; i < arrayLength; i++) {
	
		var ranInd = Math.floor(Math.random() * arrayLength),
			preVal = array[i];
		
		array[i] = array[ranInd];
		array[ranInd] = preVal; 
	
	}
	
	return array.join('');

}

function initialize_wordChar() {

	document.querySelectorAll('.word').forEach(function(val, ind) {
	
		val.firstChild.className = '';
		
		if(ind < words[index][0].length) {
			
			val.firstChild.textContent = words[index][0].charAt(ind);
		
			val.classList.add('show-word-cell');
		
		} else {
		
			val.classList.remove('show-word-cell');
			
		}
	
	});

}

function initialize_letters() {

	document.querySelectorAll('.letter p').forEach(function(val, ind) {

		val.textContent = words[index][1].charAt(ind);

	});

}

function getIndices(char) {

	var indices = [],
		word = words[index][0], 
		ind = word.indexOf(char);
		
	while(ind !== -1) {
	
		indices.push(ind);
		ind = word.indexOf(char, ind + 1);
	
	}
	
	return indices;

}

function process_letter_click(event) {
	
	var indices = getIndices(event.target.textContent);
	
	if(indices.length) {
	
		indices.forEach(function(val) {
	
			document.querySelectorAll('.word p')[val].classList.add('font-visible');
	
		});
		
	} else {
	
		document.querySelector('.life p:not(.font-visible)').classList.add('font-visible');
		score -= 0.5/words.length;
	
	}
	
	check_progress();
	
} 

function initialize_ingame_all() {
	
	index=0;
	score=0;
	create_randomized_string();
	initialize_letters();
	initialize_wordChar();

}

document.querySelector('#start-button').addEventListener('click', function() {

	initialize_ingame_all();
	
	game_in_out_animation(true);
	
});

document.querySelector('#left-sensor div').addEventListener('click', function() {
 
	if(!ingame) {
	
		document.querySelector('#left-sensor span').classList.toggle('rotate-settings-button');
		
		moveUp_reveal('#start-hood', '#option-tab');
		
	} else {
	
		game_in_out_animation(false);
	
	}

});

document.querySelectorAll('.cell-container')[1].addEventListener('click', process_letter_click);

game_tab_buttons.forEach(function(val, ind) {
	
	val.addEventListener('click', ingame_butFunc[ind]);

});

document.querySelector('#replay').addEventListener('click', function() {

	initialize_ingame_all();
	ingame_tab_rotate();
	animate_letters(2500);

});

