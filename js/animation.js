
var game_tab_buttons = document.querySelectorAll('.game-tab-buttons'),
	ingame = null;

function moveUp_reveal(a, b) {
	
	[[a, 'moveUp'], [b,'set-visible-anim']].forEach(function(val) {
	
		document.querySelector(val[0]).classList.toggle(val[1]);
	
	});

}

function animate_letters(delay, interval) {
	
	var t; 
	ingame ? t = 100 : t = 1700;
	window.setTimeout(function() {
	
		var i = 0,
		
		letter_cells = document.querySelectorAll('.letter p'), 
		recur = setInterval(function() {

			letter_cells[i++].className = 'font-visible';
			
			if(i === letter_cells.length) 
			clearInterval(recur);

		}, (interval || 200));

	}, (delay || t));
	
}

function toggle_interaction_blocker(delay) {
	
	var t;
	ingame ? t = 100 : t = 4655;
	  
	window.setTimeout(function() {
	
		document.querySelector('#blocker-card').classList.toggle('moveDown');
	
	}, (delay || t));

}

function toggle_sensors(delay) {
	
	var t;
	ingame ? t = 50 : t = 4655;
	window.setTimeout(function() {
	
		document.querySelectorAll('.settings-sensors').forEach(function(value) {
	
			value.classList.toggle('sensor-active');
	
		});
	
	}, (delay || t));

}

function remove_cells_fontColor(delay) {

	window.setTimeout(function() {
	
		document.querySelectorAll('.font-visible').forEach(function(val) {
	
			val.className = '';
	
		});
	
	}, (delay || 2600));
	
}

function toggle_progress_button(delay) {

	window.setTimeout(function() {
	
		var progButton = game_tab_buttons[0];
		
		progButton.classList.toggle('moveRight');
		progButton.firstChild.classList.toggle('font-visible');
	
	}, delay);

}

var deg = 180; 
function ingame_tab_rotate(delay) {

	window.setTimeout(function() {
	
		[['#game-tab', deg], ['#tally-card', (deg+=180)]].forEach(function(val) {
	
			document.querySelector(val[0]).style.transform = 'rotate('+ val[1] + 'deg)'; 
	
		});

	}, (delay || 500));
	
}

function game_in_out_animation(state) { /*true=enter, false=leave*/

	moveUp_reveal('#start-tab', '#game-tab');
	
	[remove_cells_fontColor, animate_letters][Number(state)]();
	
	toggle_interaction_blocker();
	
	toggle_sensors();
	
	if(deg > 180) {	
		ingame_tab_rotate(1250);
		deg=0;
	}
	
	ingame = state;

}

