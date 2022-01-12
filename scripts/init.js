// Finally, initialize.
document.onreadystatechange = function() {
	if (document.readyState === 'complete') {
		initializeInterface();
		document.getElementById("curtain").remove();
	}
}

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById("graph-controls-mover")) {
		// if present, the header is where you move the DIV from:
		document.getElementById("graph-controls-mover").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV: 
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
		// Snap inside window
		if (window.innerWidth - parseInt(elmnt.style.left) < elmnt.offsetWidth) {
			elmnt.style.left = window.innerWidth - elmnt.offsetWidth - 10 + "px";
		}
		if (window.innerHeight - parseInt(elmnt.style.top) < elmnt.offsetHeight) {
			elmnt.style.top = window.innerHeight - elmnt.offsetHeight - 10 + "px";
		}
		if (parseInt(elmnt.style.top) < 40-elmnt.offsetHeight) {
			elmnt.style.top = 25-elmnt.offsetHeight + "px";
		}
		if (parseInt(elmnt.style.left) < 40-elmnt.offsetWidth) {
			elmnt.style.left = 25-elmnt.offsetWidth + "px";
		}
	}
}

dragElement(document.getElementById("graph-controls"));
document.getElementById("graph-controls-minimizer").addEventListener("click", function() {
	document.getElementById("graph-controls").classList.add("transition-movable");
	document.getElementById("graph-controls").style.top = "10px";
	document.getElementById("graph-controls").style.left = "-425px";
	setTimeout(() => {
		document.getElementById("graph-controls").classList.remove("transition-movable");
	}, 200);
});

document.getElementById("graph-controls-a11y-big-text").addEventListener("click", function() {
	document.body.classList.toggle("a11y-big-text")
});