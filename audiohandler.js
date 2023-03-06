var container = document.getElementById("touchbar");

container.addEventListener("touchstart", startTouch, false);
container.addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

//audio sources
var opts = [document.getElementById("main_audio"), document.getElementById("opt1"), document.getElementById("opt2"), document.getElementById("opt3"), document.getElementById("opt4")];
var current = 0;
var nextstr = 'null';
var numopts = 4;


//arrow keys start
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
		$(nextstr).trigger("click");
    }
    else if (e.keyCode == '40') {
        // down arrow
		document.getElementById("history-backward").click();
    }
    else if (e.keyCode == '37') {
       // left arrow
		handleAudio(-1);
    }
    else if (e.keyCode == '39') {
       // right arrow
		handleAudio(1);
	}
}
//arrow keys end

function startTouch(e) {
	initialX = e.touches[0].clientX;
	initialY = e.touches[0].clientY;
};

function moveTouch(e) {
	if (initialX === null) {
		return;
	}

	if (initialY === null) {
		return;
	}

	var currentX = e.touches[0].clientX;
	var currentY = e.touches[0].clientY;

	var diffX = initialX - currentX;
	var diffY = initialY - currentY;

	if (Math.abs(diffX) > Math.abs(diffY)) {
		// sliding horizontally
		if (diffX > 0) {
			// swiped left
			//alert("swiped left");
			//$('#1 a').trigger("click");
			handleAudio(-1);
		} else {
			// swiped right
			//alert("swiped right");
			//$('#2 a').trigger("click");
			handleAudio(1);
		}  
	} else {
		// sliding vertically
		if (diffY > 0) {
			// swiped up
			//alert("swiped up");
			$(nextstr).trigger("click");
		} else {
			// swiped down
			//alert("swiped down");
			document.getElementById("history-backward").click();
		}  
	}

	initialX = null;
	initialY = null;

	e.preventDefault();
};

function handleAudio(dir)
{
	opts[current].pause();
	opts[current].currentTime = 0;
	current += dir;
	if (current < 0) {
		current = numopts;
	}
	else if (current > numopts) {
		current = 0;
	}
	
	if (current == 0) {
		nextstr = "null";
	}
	else {
		nextstr = `#${current} a`;
	}
	opts[current].play();
}

opts[current].play();