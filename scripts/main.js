let coords;
let eqCan = {};

function initializeInterface() {
	let w = (window.innerWidth);
	let h = (window.innerHeight);
	eqCan.opts = {
		fns: 'x^2+y^2=9~'
	}
	eqCan.graphLt = 0;
	eqCan.graphTp = 0;
	eqCan.graphWd = w
	eqCan.graphHt = h;
	eqCan.graphClr = '#aaa'
	coords = new Coords(eqCan.graphLt, eqCan.graphTp, eqCan.graphWd, eqCan.graphHt, -5, -3, 5, 3, true);
	eqCan.svgQ = false
	eqCan.svgBtnQ = eqCan.svgQ;
	eqCan.svg = new SVG(coords);
	eqCan.canvasWd = eqCan.graphWd;
	eqCan.canvasHt = eqCan.graphHt;
	let fns = optGet('fns').split('~')
	eqCan.fns = [];
	for (let i = 0; i < eqCan.fnMax; i++) {
		let inStr = getQueryVariable('func' + (i + 1));
		if (inStr)
			fns[i] = decodeURIComponent(inStr)
		if (fns[i] != undefined)
			eqCan.fns.push(new Fn(fns[i], hslToHex(eqCan.clrs[eqCan.fns.length])))
	}
	console.log('eqCan.fns', fns, eqCan.fns)
	let inStr = ''
	if (inStr = getQueryVariable('xmin'))
		coords.xStt = parseFloat(inStr);
	if (inStr = getQueryVariable('xmax'))
		coords.xEnd = parseFloat(inStr);
	if (inStr = getQueryVariable('ymin'))
		coords.yStt = parseFloat(inStr);
	if (inStr = getQueryVariable('ymax'))
		coords.yEnd = parseFloat(inStr);
	coords.calcScale();
	var s = '<div style="height: ' + eqCan.canvasHt + 'px;" >';
	s += '<canvas id="canGraph" width="' + eqCan.graphWd + '" height="' + eqCan.graphHt + '" style="position:absolute; z-index:1; background-color: #ffffff; border: 0;"></canvas>';
	s += '<canvas id="can" width="' + eqCan.graphWd + '" height="' + eqCan.graphHt + '" style="position:absolute; z-index:1; border: 0;"></canvas>';
	s += '<canvas id="canPts" width="' + eqCan.graphWd + '" height="' + eqCan.graphHt + '" style="position:absolute; z-index:1;  border: 0;"></canvas>';
	s += '</div>';
	document.getElementById('canvasContainer').innerHTML = s;
	eqCan.cans = [];
	canvasInit('canGraph', eqCan.canvasWd, eqCan.canvasHt, 2);
	canvasInit('can', eqCan.canvasWd, eqCan.canvasHt, 1);
	canvasInit('canPts', eqCan.canvasWd, eqCan.canvasHt, 1);
	canvasInit('canInfo', 10, 10, 2);
	eqCan.currZoom = 1;
	eqCan.polarQ = false;
	eqCan.aVal = 1;
	eqCan.treeQ = false
	eqCan.parser = new Parser();
	eqCan.dragging = false;
	eqCan.downX = 0;
	eqCan.downY = 0;
	eqCan.prevX = 0;
	eqCan.prevY = 0;
	eqCan.prevAngle = 0;
	let el2 = eqCan.cans.canPts.el
	el2.addEventListener("mousedown", onMouseDown, false);
	window.addEventListener("mousemove", onMouseMove, false);
	window.addEventListener("mouseup", onMouseUp, false);
	el2.addEventListener('touchstart', ontouchstart, false);
	window.addEventListener('touchmove', ontouchmove, false);
	window.addEventListener('touchend', ontouchend, false);
	eqCan.nStep = 4
	let g = eqCan.cans.can.g
	eqCan.imageData = g.createImageData(eqCan.canvasWd, eqCan.canvasHt);
	eqCan.pts = [];
	eqCan.ptsQ = true;
	let shapeRad = 9;
	eqCan.minX = shapeRad;
	eqCan.maxX = eqCan.graphWd - shapeRad;
	eqCan.minY = shapeRad;
	eqCan.maxY = eqCan.graphHt - shapeRad;
	eqCan.fnLine = [];
	togglePts();
	eqCan.dragPtQ = false;
	eqCan.examples = ['cos(x)=sin(y)-y', 'sin(sin(x))=cos(sin(xy)+cos(x))', '(x-1)(x+1)=y', 'y=2x', 'sin(x)+cos(y)=0.5', 'sin(x^2)+cos(y)=1', 'sin(y)=x', '(x-y)^2 = 4', 'x^2+y^2=9'];
	eqCan.exampleNo = 0;
	makePts();
	fnAdd(true);
	go();
}









