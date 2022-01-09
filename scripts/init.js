// Finally, initialize.
document.onreadystatechange = function() {
	if (document.readyState === 'complete') {
		initializeInterface();
		document.getElementById("curtain").remove();
	}
}