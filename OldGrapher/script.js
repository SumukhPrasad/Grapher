let coords,
	eqCan = {};

function hslToHex(hsl) {
	hsl = hsl.match(/^hsl?\(\s?(\d+)(?:deg)?,?\s(\d+)%,?\s(\d+)%,?\s?(?:\/\s?\d+%|\s+[\d+]?\.?\d+)?\)$/i);
	if (!hsl) {
		return null;
	}
	let h = hsl[1];
	let s = hsl[2];
	let l = hsl[3];
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;
	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = function(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	const toHex = function(x) {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return '#' + toHex(r) + toHex(g) + toHex(b);
}

function makeGrapherInterface() {
	let w = (window.innerWidth - 470);
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
	eqCan.fnMax = 100;
	eqCan.clrs = ["hsl(0, 100%, 25%)", "hsl(3, 100%, 25%)", "hsl(6, 100%, 25%)", "hsl(9, 100%, 25%)", "hsl(12, 100%, 25%)", "hsl(15, 100%, 25%)", "hsl(18, 100%, 25%)", "hsl(21, 100%, 25%)", "hsl(24, 100%, 25%)", "hsl(27, 100%, 25%)", "hsl(30, 100%, 25%)", "hsl(33, 100%, 25%)", "hsl(36, 100%, 25%)", "hsl(39, 100%, 25%)", "hsl(42, 100%, 25%)", "hsl(45, 100%, 25%)", "hsl(48, 100%, 25%)", "hsl(51, 100%, 25%)", "hsl(54, 100%, 25%)", "hsl(57, 100%, 25%)", "hsl(60, 100%, 25%)", "hsl(63, 100%, 25%)", "hsl(66, 100%, 25%)", "hsl(69, 100%, 25%)", "hsl(72, 100%, 25%)", "hsl(75, 100%, 25%)", "hsl(78, 100%, 25%)", "hsl(81, 100%, 25%)", "hsl(84, 100%, 25%)", "hsl(87, 100%, 25%)", "hsl(90, 100%, 25%)", "hsl(93, 100%, 25%)", "hsl(96, 100%, 25%)", "hsl(99, 100%, 25%)", "hsl(102, 100%, 25%)", "hsl(105, 100%, 25%)", "hsl(108, 100%, 25%)", "hsl(111, 100%, 25%)", "hsl(114, 100%, 25%)", "hsl(117, 100%, 25%)", "hsl(120, 100%, 25%)", "hsl(123, 100%, 25%)", "hsl(126, 100%, 25%)", "hsl(129, 100%, 25%)", "hsl(132, 100%, 25%)", "hsl(135, 100%, 25%)", "hsl(138, 100%, 25%)", "hsl(141, 100%, 25%)", "hsl(144, 100%, 25%)", "hsl(147, 100%, 25%)", "hsl(150, 100%, 25%)", "hsl(153, 100%, 25%)", "hsl(156, 100%, 25%)", "hsl(159, 100%, 25%)", "hsl(162, 100%, 25%)", "hsl(165, 100%, 25%)", "hsl(168, 100%, 25%)", "hsl(171, 100%, 25%)", "hsl(174, 100%, 25%)", "hsl(177, 100%, 25%)", "hsl(180, 100%, 25%)", "hsl(183, 100%, 25%)", "hsl(186, 100%, 25%)", "hsl(189, 100%, 25%)", "hsl(192, 100%, 25%)", "hsl(195, 100%, 25%)", "hsl(198, 100%, 25%)", "hsl(201, 100%, 25%)", "hsl(204, 100%, 25%)", "hsl(207, 100%, 25%)", "hsl(210, 100%, 25%)", "hsl(213, 100%, 25%)", "hsl(216, 100%, 25%)", "hsl(219, 100%, 25%)", "hsl(222, 100%, 25%)", "hsl(225, 100%, 25%)", "hsl(228, 100%, 25%)", "hsl(231, 100%, 25%)", "hsl(234, 100%, 25%)", "hsl(237, 100%, 25%)", "hsl(240, 100%, 25%)", "hsl(243, 100%, 25%)", "hsl(246, 100%, 25%)", "hsl(249, 100%, 25%)", "hsl(252, 100%, 25%)", "hsl(255, 100%, 25%)", "hsl(258, 100%, 25%)", "hsl(261, 100%, 25%)", "hsl(264, 100%, 25%)", "hsl(267, 100%, 25%)", "hsl(270, 100%, 25%)", "hsl(273, 100%, 25%)", "hsl(276, 100%, 25%)", "hsl(279, 100%, 25%)", "hsl(282, 100%, 25%)", "hsl(285, 100%, 25%)", "hsl(288, 100%, 25%)", "hsl(291, 100%, 25%)"];


	let fns = optGet('fns').split('~')
	eqCan.fns = []
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
	let s = '';
	s += '<div style="position:relative; width:100%; height:100%; border-radius: 10px; display:block;  ">';
	s += '<div style="height: calc(100% - 150px);width: 445px;overflow: scroll;">';
	s += '<div id="fns" style="position:relative; padding-top:4px;width: 435px; margin-left: 5px;">';
	s += fnsHTML();
	s += '</div>';
	s += '<div style="position:relative; margin-top:4px; width: 435px; margin-left: 5px;">';
	s += '<button id="fnSubBtn" class="grapher-button" style="width:30px; vertical-align: top;" onclick="fnAdd(false)" >&minus;</button>';
	s += '<button id="fnAddBtn" class="grapher-button" style="width:30px; vertical-align: top;" onclick="fnAdd(true)" >+</button>';
	s += ' &nbsp; <br>';
	s += '</div>';
	s += '</div>';
	s += '<div style="position:absolute; top:0px; right:0px; height: ' + eqCan.canvasHt + 'px;" >';
	s += '<canvas id="canGraph" width="' + eqCan.graphWd + '" height="' + eqCan.graphHt + '" style="position:absolute; right:0px; top:0px; z-index:1; background-color: #ffffff; border: 1px solid black;"></canvas>';
	s += '<canvas id="can" width="' + eqCan.graphWd + '" height="' + eqCan.graphHt + '" style="position:absolute; right:0px; top:0px; z-index:1; border: 1px solid black;"></canvas>';
	s += '<canvas id="canPts" width="' + eqCan.graphWd + '" height="' + eqCan.graphHt + '" style="position:absolute; right:0px; top:0px; z-index:1;  border: 1px solid black;"></canvas>';
	s += '</div>';
	s += '<div style="position: absolute;width: 460px;height: 140px; margin-left: 10px; bottom:10px">';
	/**/

	s += '<div style="display:inline-block; font: 13px/22px system-ui; vertical-align: top; ">Zoom:</div>';
	s += '<input type="range" id="r1" class="slider" value="0.5" min="0" max="1" step=".01"  style="z-index:2; width:200px; height:20px;" oninput="onZoomChg(0,this.value)" onchange="onZoomChg(1,this.value)" />';
	s += '<button style="font: 15px system-ui; vertical-align: top;" class="grapher-button"  onclick="zoomReset()" >Reset</button><br>';

	s += '<div id="speed" style="display:inline-block; width: 49%; font: 13px system-ui; text-align: left; "></div>';
	s += '<div style="display:inline-block; width:  445px; text-align: right; ">';
	s += '<button id="ptsBtn" style="font: 14px system-ui; " class="grapher-button"  onclick="togglePts()" >Points</button>';
	s += '<button id="fitBtn" style="font: 14px system-ui; " class="grapher-button"  onclick="zoomFit()" >Fit</button>';


	/**/
	s += '<div style="position:relative; text-align:center; margin-top:4px; ">';
	s += '</div>';
	s += '<div style=" text-align: center; width: 445px; margin-left: 5px;" >';
	s += '<button style="font: 16px system-ui;" class="grapher-button"  onclick="save()" >Save</button>';
	s += ' &nbsp; '
	s += '<button style="font: 16px system-ui;" class="grapher-button"  onclick="doExample()" >Example</button><br>';
	s += '</div>';
	s += '</div>';
	s += '<div>';
	s += '<button class="grapher-button" style="font: 16px/23px system-ui; position: absolute;bottom: 5px;left: 0px;width: 445px;"  onclick="go()" >Go</button>';
	s += '</div>';
	s += '</div>';
	if (eqCan.svgBtnQ) {
		s += '<button id="svgBtn" style="font: 16px system-ui; " class="grapher-button"  onclick="SVGShow()" >SVG</button>';
	}
	s += '<div id="infopop" class="grapher-popup" style="position:absolute; left:-999px; top:100px;  z-index:1;  opacity:0; ">';
	s += '<div class="label" style="font: 16px system-ui; text-align:center;">';
	s += 'Interpreted formula:';
	s += '</div>';
	s += '<div id="infobox" class="output" style="font: 20px system-ui; text-align:center;">';
	s += '</div>';
	s += '<canvas id="canInfo"  style=""></canvas>';
	s += '<div style="float:right; margin: 0 0 5px 10px;">';
	s += '<button onclick="infoPopClose()" style="z-index:2; font: 22px system-ui;" class="grapher-button" >&#x2714;</button>';
	s += '</div>';
	s += '</div>';
	s += '</div>';
	document.write(s);
	eqCan.cans = []
	canvasInit('canGraph', eqCan.canvasWd, eqCan.canvasHt, 2)
	canvasInit('can', eqCan.canvasWd, eqCan.canvasHt, 1)
	canvasInit('canPts', eqCan.canvasWd, eqCan.canvasHt, 1)
	canvasInit('canInfo', 10, 10, 2)
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
	eqCan.dragPtQ = false;
	togglePts();
	eqCan.examples = ['cos(x)=sin(y)-y', '(x-1)(x+1)=y', 'y=2x', 'sin(x)+cos(y)=0.5', 'sin(x^2)+cos(y)=1', 'sin(y)=x', '(x-y)^2 = 4', 'x^2+y^2=9'];
	eqCan.exampleNo = 0;
	makePts();
	go();
}

function canvasInit(id, wd, ht, ratio) {
	let el = document.getElementById(id);
	el.width = wd * ratio;
	el.style.width = wd + "px";
	el.height = ht * ratio;
	el.style.height = ht + "px";
	let g = el.getContext("2d");
	g.setTransform(ratio, 0, 0, ratio, 0, 0);
	eqCan.cans[id] = {
		el: el,
		g: g,
		ratio: ratio
	}
}

function nodesDraw() {
	eqCan.tree = {
		xmax: 0,
		ymax: 0,
		lvls: []
	}
	let levels = eqCan.parser.rootNode.getLevelsHigh();
	this.levelXs = [];
	for (let i = 0; i < levels; i++) {
		this.levelXs.push(0);
	}
	let g = eqCan.cans.canInfo.g
	nodeDraw(g, eqCan.parser.rootNode, 0);
	console.log('eqCan.tree', eqCan.tree, eqCan.tree.lvls)
	let el = eqCan.cans.canInfo.el
	let ratio = eqCan.cans.canInfo.ratio
	el.width = eqCan.tree.xmax * ratio;
	el.height = eqCan.tree.ymax * ratio;
	el.style.width = eqCan.tree.xmax + "px";
	el.style.height = eqCan.tree.ymax + "px";
	g.setTransform(ratio, 0, 0, ratio, 0, 0);
	g.clearRect(0, 0, el.width, el.height);
	this.levelXs = [];
	for (let i = 0; i < levels; i++) {
		this.levelXs.push(0);
	}
	nodeDraw(g, eqCan.parser.rootNode, 0);
}

function nodeDraw(g, node, level) {
	let boxWd = 40;
	let boxHt = 25;
	let xDist = 50;
	let yDist = 40;
	let boxClr = '#aaa'
	let xFudge = -30
	let xPos = 0
	if (node.childCount > 0) {
		let xSum = 0
		for (let i = 0; i < node.childCount; i++) {
			xSum += nodeDraw(g, node.child[i], level + 1).x
		}
		xPos = xSum / node.childCount
	}
	xPos = Math.max(xPos, this.levelXs[level] + xDist)
	node.x = xPos
	let rootTopQ = false;
	if (rootTopQ) {
		node.y = 10 + level * yDist;
	} else {
		node.y = 10 + (this.levelXs.length - level - 1) * yDist;
	}
	g.strokeStyle = boxClr
	g.lineWidth = 2
	for (let i = 0; i < node.childCount; i++) {
		g.beginPath();
		if (rootTopQ) {
			g.moveTo(node.x + boxWd / 2 + xFudge, node.y + boxHt);
			g.lineTo(node.child[i].x + boxWd / 2 + xFudge, node.child[i].y);
		} else {
			g.moveTo(node.x + boxWd / 2 + xFudge, node.y);
			g.lineTo(node.child[i].x + boxWd / 2 + xFudge, node.child[i].y + boxHt);
		}
		g.stroke();
	}
	g.lineWidth = 1
	this.levelXs[level] = node.x
	let lowerx = node.x;
	for (let i = level + 1; i < this.levelXs.length; i++) {
		lowerx -= boxWd / 2;
		this.levelXs[i] = Math.max(this.levelXs[i], lowerx);
	}
	g.beginPath();
	g.fillStyle = boxClr
	g.rect(node.x + xFudge, node.y, boxWd, boxHt);
	g.fill();
	g.font = 'bold 15px system-ui';
	g.textAlign = 'center';
	g.fillStyle = 'blue';
	if (node.typ == node.tOP)
		g.fillStyle = 'orange';
	g.fillText(node.fmt(false), node.x + boxWd / 2 + xFudge, node.y + boxHt / 2 + 6);
	eqCan.tree.xmax = Math.max(eqCan.tree.xmax, node.x + boxWd + xFudge)
	eqCan.tree.ymax = Math.max(eqCan.tree.ymax, node.y + boxHt)
	return node
}

function fnsHTML() {
	let s = '';
	for (let i = 0; i < eqCan.fns.length; i++) {
		let fn = eqCan.fns[i];
		s += '<div style="text-align:center;">';
		s += '<input type="text" class="grapher-input" id="fn' + i + '" style="color:' + fn.clr + ';  text-align:center; font: bold 20px system-ui; width:360px; z-index: 2;" value="' + fn.str + '" onkeypress="onKeyPress(event)"/>';
		s += '<button class="grapher-button" style="font: 16px/23px system-ui; border-radius: 50px; width:25px; height:25px; margin-left:10px"  onclick="infoPop(' + i + ')" >i</button>';
		s += '</div>';
	}
	return s;
}

function fnAdd(addQ) {
	for (let i = 0; i < eqCan.fns.length; i++) {
		let div = document.getElementById('fn' + i);
		eqCan.fns[i].str = div.value;
	}
	if (addQ) {
		if (eqCan.fns.length < eqCan.fnMax) {
			eqCan.fns.push(new Fn('', hslToHex(eqCan.clrs[eqCan.fns.length])))
			console.log("fnAdd eqCan.fns", eqCan.fns);
		}
	} else {
		eqCan.fns.pop()
	}
	let div = document.getElementById('fns');
	div.innerHTML = fnsHTML();
	for (let i = 0; i < eqCan.fns.length; i++) {
		let div = document.getElementById('fn' + i);
		div.value = eqCan.fns[i].str;
	}
	go();
}
class Fn {
	constructor(str, clr) {
		this.str = (str == undefined) ? '' : str
		this.clr = clr
		this.svg = ''
	}
}

function test() {
	let tests = ['xy', '2xy', '2xy^2', 'x^2+y^2=9', '(x-1)(x+1)=y', 'y=2x', 'sin(x)+cos(y)=0.5'];
	for (let i = 0; i < tests.length; i++) {
		let t = tests[i];
		eqCan.parser.newParse(t);
		let result = eqCan.parser.rootNode.walkFmt();
		console.log("test", t, '=>', result);
	}
}

function makePts() {
	let i;
	let pos = [
		[140, 80, "A"],
		[420, 240, "B"]
	];
	eqCan.pts = [];
	for (i = 0; i < pos.length; i++) {
		let tempX = pos[i][0];
		let tempY = pos[i][1];
		let tempColor = "rgb(" + 0 + "," + 0 + "," + 255 + ")";
		eqCan.pts.push(new Pt(tempX, tempY, 9, tempColor));
	}
}

function Pt(x, y, rad, clr) {
	this.setPx(x, y);
	this.rad = rad;
	this.clr = clr;
}
Pt.prototype.setPx = function(x, y) {
	this.x = x;
	this.y = y;
	this.xVal = coords.toXVal(this.x);
	this.yVal = coords.toYVal(this.y);
}
Pt.prototype.getPxX = function() {
	return coords.toXPix(this.xVal);
}
Pt.prototype.getPxY = function() {
	return coords.toYPix(this.yVal);
}
Pt.prototype.snap = function(line) {
	let minD = 9999;
	let minPt = [];
	for (let i = 0; i < line.length; i++) {
		let pt = line[i];
		if (pt != 0) {
			let d = dist(pt[0] - this.x, pt[1] - this.y);
			if (d < minD) {
				minD = d;
				minPt = pt;
			}
		}
	}
	if (minD < 20) {
		this.setPx(minPt[0], minPt[1]);
	}
}

function onKeyPress(e) {
	let key = e.keyCode || e.which;
	if (key == 13) {
		go();
	}
}

function ptsDraw() {
	let i;
	let g = eqCan.cans.canPts.g
	g.clearRect(0, 0, g.canvas.width, g.canvas.height)
	for (i = 0; i < eqCan.pts.length; i++) {
		let pt = eqCan.pts[i];
		let x = pt.getPxX();
		let y = pt.getPxY();
		g.fillStyle = "rgba(0, 0, 255, 0.3)";
		g.beginPath();
		g.arc(x, y, pt.rad, 0, 2 * Math.PI, false);
		g.fill();
		g.fillStyle = "rgba(0, 0, 0, 0.8)";
		g.beginPath();
		g.arc(x, y, 2, 0, 2 * Math.PI, false);
		g.fill();
		g.font = "14px system-ui";
		let s = '';
		s += '(' + fmt(pt.xVal, 3);
		s += ', ' + fmt(pt.yVal, 3) + ')';
		g.fillText(s, x + 5, y - 5);
	}
}

function hitTest(pt, mx, eqCan) {
	let dx;
	let dy;
	dx = mx - pt.getPxX();
	dy = eqCan - pt.getPxY();
	return (dx * dx + dy * dy < pt.rad * pt.rad);
}

function setPix(nx, ny, clrs, val) {
	if (nx < 0)
		return;
	if (nx >= eqCan.canvasWd)
		return;
	if (ny < 0)
		return;
	if (ny >= eqCan.canvasHt)
		return;
	let index = ((ny >> 0) * eqCan.canvasWd + (nx >> 0)) * 4;
	val = 55 + Math.min(200, val >> 0);
	eqCan.imageData.data[index] = clrs[0];
	eqCan.imageData.data[++index] = clrs[1];
	eqCan.imageData.data[++index] = clrs[2];
	eqCan.imageData.data[++index] = val;
}

function hex2dec(hex) {
	var dec = parseInt(hex, 16);
	if (isNaN(dec))
		dec = 0;
	return dec;
}

function rgbToArray(rgb) {
	var rr = hex2dec(rgb.substr(0, 2));
	var gg = hex2dec(rgb.substr(2, 2));
	var bb = hex2dec(rgb.substr(4, 2));
	return [rr, gg, bb]
}

function infoPop(n) {
	console.log("infoPop", n);
	let pop = document.getElementById('infopop');
	pop.style.opacity = 1;
	pop.style.zIndex = 12;
	pop.style.left = '10px';
	eqCan.parser.radiansQ = this.radQ;
	eqCan.parser.setVarVal('a', eqCan.aVal);
	let s = document.getElementById('fn' + n).value;
	s = s.substr(0, 1000);
	let parts = s.split("=");
	let s1 = "(" + parts[0] + ")";
	if (parts.length > 1) {
		s1 += "-(" + parts[1] + ")";
	}
	eqCan.parser.newParse(s1);
	nodesDraw();
	document.getElementById('infobox').innerHTML = eqCan.parser.rootNode.walkFmt()
}

function infoPopClose() {
	let pop = document.getElementById('infopop');
	pop.style.opacity = 0;
	pop.style.zIndex = 1;
	pop.style.left = '-500px';
}

function togglePts() {
	eqCan.ptsQ = !eqCan.ptsQ;
	toggleBtn('ptsBtn', eqCan.ptsQ);
	toggleBtn('fitBtn', eqCan.ptsQ);
	go();
}

function togglePolar() {
	eqCan.polarQ = !eqCan.polarQ;
	toggleBtn('polarBtn', eqCan.polarQ);
	go();
}

function toggleBtn(btn, onq) {
	if (onq) {
		document.getElementById(btn).classList.add("hi");
		document.getElementById(btn).classList.remove("lo");
	} else {
		document.getElementById(btn).classList.add("lo");
		document.getElementById(btn).classList.remove("hi");
	}
}

function zoomReset() {
	coords = new Coords(eqCan.graphLt, eqCan.graphTp, eqCan.graphWd, eqCan.graphHt, -5, -3, 5, 3, true);
	go();
}

function zoomFit() {
	let valPts = [];
	for (let i = 0; i < eqCan.pts.length; i++) {
		let pt = eqCan.pts[i];
		valPts.push(new Pt(pt.xVal, pt.yVal, 1, ''));
	}
	coords.fitToPts(valPts, 1.1);
	go();
}

function doExample() {
	eqCan.exampleNo = (++eqCan.exampleNo) % eqCan.examples.length;
	document.getElementById('fn0').value = eqCan.examples[eqCan.exampleNo];
	go();
}

function ontouchstart(evt) {
	let touch = evt.targetTouches[0];
	evt.clientX = touch.clientX;
	evt.clientY = touch.clientY;
	evt.touchQ = true;
	onMouseDown(evt)
}

function ontouchmove(evt) {
	let touch = evt.targetTouches[0];
	evt.clientX = touch.clientX;
	evt.clientY = touch.clientY;
	evt.touchQ = true;
	onMouseMove(evt);
	evt.preventDefault();
}

function ontouchend(evt) {
	eqCan.dragging = false;
}

function onMouseDown(evt) {
	let el = eqCan.cans.can.el
	let ratio = eqCan.cans.can.ratio
	let bRect = el.getBoundingClientRect();
	let mouseX = (evt.clientX - bRect.left) * (el.width / ratio / bRect.width);
	let mouseY = (evt.clientY - bRect.top) * (el.height / ratio / bRect.height);
	eqCan.downX = mouseX;
	eqCan.downY = mouseY;
	eqCan.prevX = mouseX;
	eqCan.prevY = mouseY;
	eqCan.dragging = true;
	eqCan.dragPtQ = false;
	if (eqCan.ptsQ) {
		for (let i = 0; i < eqCan.pts.length; i++) {
			let pt = eqCan.pts[i];
			if (hitTest(pt, mouseX, mouseY)) {
				eqCan.dragPtQ = true;
				eqCan.dragHoldX = mouseX - pt.getPxX();
				eqCan.dragHoldY = mouseY - pt.getPxY();
				eqCan.dragIndex = i;
			}
		}
	}
	if (evt.preventDefault) {
		evt.preventDefault();
	} else if (evt.returnValue) {
		evt.returnValue = false;
	}
	return false;
}

function onMouseUp(evt) {
	let el = eqCan.cans.can.el
	let ratio = eqCan.cans.can.ratio
	let bRect = el.getBoundingClientRect();
	let mouseX = (evt.clientX - bRect.left) * (el.width / ratio / bRect.width);
	let mouseY = (evt.clientY - bRect.top) * (el.height / ratio / bRect.height);
	if (eqCan.dragPtQ) {
		let posX = mouseX - eqCan.dragHoldX;
		posX = (posX < eqCan.minX) ? eqCan.minX : ((posX > eqCan.maxX) ? eqCan.maxX : posX);
		let posY = mouseY - eqCan.dragHoldY;
		posY = (posY < eqCan.minY) ? eqCan.minY : ((posY > eqCan.maxY) ? eqCan.maxY : posY);
		let pt = eqCan.pts[eqCan.dragIndex];
		pt.setPx(posX, posY);
		pt.snap(eqCan.fnLine);
		ptsDraw();
	} else {
		if (Math.abs(mouseX - eqCan.downX) < 2 && Math.abs(mouseY - eqCan.downY) < 2) {
			coords.newCenter(mouseX, mouseY);
			go();
		}
	}
	eqCan.dragPtQ = false;
	eqCan.dragging = false;
}

function onMouseMove(evt) {
	let el = eqCan.cans.can.el
	let ratio = eqCan.cans.can.ratio
	let bRect = el.getBoundingClientRect();
	let mouseX = (evt.clientX - bRect.left) * (el.width / ratio / bRect.width);
	let mouseY = (evt.clientY - bRect.top) * (el.height / ratio / bRect.height);
	if (eqCan.dragging) {
		if (eqCan.dragPtQ) {
			let posX = mouseX - eqCan.dragHoldX;
			posX = (posX < eqCan.minX) ? eqCan.minX : ((posX > eqCan.maxX) ? eqCan.maxX : posX);
			let posY = mouseY - eqCan.dragHoldY;
			posY = (posY < eqCan.minY) ? eqCan.minY : ((posY > eqCan.maxY) ? eqCan.maxY : posY);
			let pt = eqCan.pts[eqCan.dragIndex];
			pt.setPx(posX, posY);
			pt.snap(eqCan.fnLine);
			ptsDraw();
		} else {
			let moveX = eqCan.prevX - mouseX;
			let moveY = mouseY - eqCan.prevY;
			if (Math.abs(moveX) > 1 || Math.abs(moveY) > 1) {
				coords.drag(moveX, moveY);
				go();
				eqCan.prevX = mouseX;
				eqCan.prevY = mouseY;
			}
		}
	}
}

function onZoomChg(n, v) {
	let scaleBy = (v * 2 + 0.01) / eqCan.currZoom;
	coords.scale(scaleBy);
	eqCan.currZoom *= scaleBy;
	if (n == 1) {
		eqCan.currZoom = 1;
		document.getElementById('r1').value = 0.5;
	}
	go();
}

function drawPlot(plotType, clr, gaps) {
	gaps = null;
	switch (plotType) {
		case "implicit":
			drawNewton(1, clr);
			break;
		case "newton2":
			drawNewton(2, clr);
			break;
		case "signchange":
			break;
		case "shaded":
			break;
		default:
	}
	let breakQ = true;
	let prevxPix = -1;
	let prevyPix = -1;
	let yState = 9;
	let ptNumMin;
	let ptNumMax;
	let stepSize = 1
	switch (plotType) {
		case "xy":
		case "dydx":
			ptNumMin = 0;
			ptNumMax = coords.width;
			break;
		case "polar":
			let revFrom = 0;
			let revTo = 4;
			let angle0 = revFrom * 6.2832;
			let angle1 = revTo * 6.2832;
			let pointN = Math.min(Math.max(600, (revTo - revFrom) * 250), 3000);
			stepSize = (angle1 - angle0) / pointN;
			if (stepSize == 0)
				stepSize = 1;
			ptNumMin = Math.floor(angle0 / stepSize);
			ptNumMax = Math.ceil(angle1 / stepSize);
			break;
		case "para":
			let tFrom = 0;
			let tTo = 3;
			pointN = Math.min(Math.max(600, (tTo - tFrom) * 250), 3000);
			stepSize = (tTo - tFrom) / pointN;
			if (stepSize == 0)
				stepSize = 1;
			ptNumMin = Math.floor(tFrom / stepSize);
			ptNumMax = Math.ceil(tTo / stepSize);
			break;
		default:
	}
	let line = [];
	let prevxVal = Number.NEGATIVE_INFINITY;
	let prevyVal = Number.NEGATIVE_INFINITY;
	let recipdx = 1 / coords.xScale;
	for (let ptNum = 0; ptNum <= ptNumMax; ptNum++) {
		let xVal;
		let yVal;
		let xPix;
		let yPix;
		switch (plotType) {
			case "xy":
				xPix = ptNum;
				xVal = coords.xStt + xPix * coords.xScale;
				eqCan.parser.setVarVal("x", xVal);
				yVal = eqCan.parser.getVal();
				yPix = coords.toYPix(yVal, false);
				break;
			case "dydx":
				xPix = ptNum;
				xVal = coords.xStt + xPix * coords.xScale;
				eqCan.parser.setVarVal("x", xVal);
				let thisyVal = eqCan.parser.getVal();
				yVal = (thisyVal - prevyVal) * recipdx;
				prevyVal = thisyVal;
				break;
			case "polar":
				let angle = ptNum * stepSize;
				eqCan.parser.setVarVal("x", angle);
				let radius = eqCan.parser.getVal();
				xVal = radius * Math.cos(angle);
				yVal = radius * Math.sin(angle);
				break;
			case "para":
				xPix = ptNum;
				let t = coords.xStt + xPix * coords.xScale;
				let xy = conicVals(t);
				xVal = xy[0];
				yVal = xy[1];
				let pt1 = []
				if (this.vals["b"] > 1.1) {
					if (yVal < -0.95 && yVal > -1.05) {
						pt1[0] = xy[0];
						pt1[1] = xy[1];
					}
				} else {
					if (yVal < -this.vals["b"] * 0.7 && yVal > -this.vals["b"] * 0.8) {
						pt1[0] = xy[0];
						pt1[1] = xy[1];
					}
				}
				break;
			default:
		}
		let prevbreakQ = breakQ;
		breakQ = false;
		let prevyState = yState;
		yState = 0;
		if (yVal < coords.yStt)
			yState = -1;
		if (yVal > coords.yEnd)
			yState = 1;
		if (yVal == Number.NEGATIVE_INFINITY) {
			yState = -1;
			yVal = coords.yStt - coords.yScale * 10;
		}
		if (yVal == Number.POSITIVE_INFINITY) {
			yState = 1;
			yVal = coords.yEnd + coords.yScale * 10;
		}
		breakQ = prevyState * yState != 0;
		if (isNaN(yVal)) {
			yState = 9;
			breakQ = true;
		}
		if (plotType == "polar" || plotType == "para") {
			xVal = Math.min(Math.max(coords.xStt - coords.xScale * 10, xVal), coords.xEnd + coords.xScale * 10);
			xPix = (xVal - coords.xStt) / coords.xScale;
		}
		yVal = Math.min(Math.max(coords.yStt - coords.yScale * 10, yVal), coords.yEnd + coords.yScale * 10);
		yPix = (coords.yEnd - yVal) / coords.yScale;
		if (breakQ) {
			if (prevbreakQ) {} else {
				if (yState < 9) {
					line.push([xPix, yPix]);
				}
			}
		} else {
			if (prevbreakQ) {
				if (prevyState < 9) {
					line.push(0);
					line.push([prevxPix, prevyPix]);
					line.push([xPix, yPix]);
				} else {
					line.push(0);
					line.push([xPix, yPix]);
				}
			} else {
				line.push([xPix, yPix]);
			}
		}
		prevxVal = xVal;
		prevxPix = xPix;
		prevyPix = yPix;
	}
	let sttQ = true;
	let g = eqCan.cans.can.g
	g.beginPath();
	for (let i = 0, len = line.length; i < len; i++) {
		let pt = line[i];
		if (pt == 0) {
			g.stroke();
			sttQ = true;
		} else {
			if (sttQ) {
				g.beginPath();
				g.moveTo(pt[0], pt[1]);
				sttQ = false;
			} else {
				g.lineTo(pt[0], pt[1]);
			}
		}
	}
	g.stroke();
	eqCan.fnLine = eqCan.fnLine.concat(line);
	if (eqCan.svgQ) {
		sttQ = true;
		for (let i = 0, len = line.length; i < len; i++) {
			let pt = line[i];
			if (pt == 0) {
				sttQ = true;
			} else {
				if (sttQ) {
					eqCan.svg.moveTo(pt[0], pt[1]);
					sttQ = false;
				} else {
					eqCan.svg.lineTo(pt[0], pt[1]);
				}
			}
		}
	}
}

function drawNewton(typeNo, clr) {
	clr = clr.replace(/[^0-9A-F]/gi, "");
	let clrs = rgbToArray(clr)
	let width = coords.width;
	let height = coords.height;
	let xmin = coords.xStt;
	let xmax = coords.xEnd;
	let ymin = coords.yStt;
	let ymax = coords.yEnd;
	let xpixstep = (xmax - xmin) / (width);
	let ypixstep = -(ymax - ymin) / (height);
	let pix = new Array(width * height);
	for (let i = 0; i < pix.length; i++) {
		pix[i] = 0;
	}
	let toler = xpixstep * xpixstep * 0.1;
	let xGridStep = xpixstep * eqCan.nStep;
	let yGridStep = ypixstep * eqCan.nStep;
	for (let x1 = xmin; x1 < xmax; x1 += xGridStep) {
		for (let y1 = ymin; y1 < ymax; y1 -= yGridStep) {
			let score;
			if (eqCan.nStep > 1) {
				let widefact = 1;
				score = getNewtonScore(x1 - xpixstep * widefact, y1 + ypixstep * widefact, x1 + xGridStep + xpixstep * widefact, y1 - yGridStep - ypixstep * widefact, x1 + xGridStep / 2, y1 - yGridStep / 2, 10, toler * 10, typeNo);
			} else {
				score = 1;
			}
			if (score > 0) {
				for (let i = 0; i < eqCan.nStep; i++) {
					for (let j = 0; j < eqCan.nStep; j++) {
						let x2 = x1 + i * xpixstep;
						let y2 = y1 - j * ypixstep;
						score = getNewtonScore(x2, y2, x2 + xpixstep, y2 - ypixstep, x2 + xpixstep / 2, y2 - ypixstep / 2, 5, toler, typeNo);
						if (score > 0) {
							let xn = coords.toXPix(x2 + xpixstep / 2);
							let yn = coords.toYPix(y2 - ypixstep / 2);
							let clrDensity = 255 * score;
							let pts = [
								[0, 0, 1]
							];
							for (let k = 0, len = pts.length; k < len; k++) {
								let pt = pts[k];
								setPix(xn + pt[0], yn + pt[1], clrs, clrDensity * pt[2]);
							}
							clrDensity *= 0.1;
						}
					}
				}
			}
		}
	}
}

function getNewtonScore(a, b, c, d, x0, y0, count, toler, typeNo) {
	let z,
		f1,
		f2,
		norm,
		delta = 0;
	for (let j = 0; j < count; j++) {
		z = fOf(x0, y0);
		if (isNaN(z)) {
			return (0);
		}
		if (Math.abs(z) < toler) {
			let fromCtr = dist((a + c) / 2 - x0, (b + d) / 2 - y0);
			let diag = dist(c - a, b - d);
			let fromEdge = diag / 2 - fromCtr;
			let ctrWt = fromEdge / (diag / 2);
			return (ctrWt);
		}
		let dFact = 0.00001;
		if (typeNo == 1) {
			delta = Math.abs(c - a) * dFact;
			f1 = f1Of(x0, y0, delta);
			if (isNaN(f1)) {
				return (0);
			}
			delta = Math.abs(d - b) * dFact;
			f2 = f2Of(x0, y0, delta);
			if (isNaN(f2)) {
				return (0);
			}
			norm = f1 * f1 + f2 * f2;
			if (norm < toler) {
				return (0);
			}
			x0 -= f1 * z / norm;
			y0 -= f2 * z / norm;
		} else {
			let angle = getSteepestAngle(x0, y0, delta);
			eqCan.prevAngle = angle;
			f1 = slopeAtAngle(angle, x0, y0, delta);
			norm = f1 * f1;
			if (norm < toler) {
				return (0);
			}
			let pt = new Pt(x0, y0);
			let ptA = pt.translatePolar(angle, -z / f1);
			x0 = ptA.x;
			y0 = ptA.y;
		}
		if (x0 < a || x0 > c || y0 < b || y0 > d) {
			return (0);
		}
	}
	return (0);
}

function fOf(xval, yval) {
	eqCan.parser.setVarVal("x", xval);
	eqCan.parser.setVarVal("y", yval);
	return eqCan.parser.getVal();
}

function f1Of(xPos, yPos, delta) {
	return (fOf(xPos + delta, yPos) - fOf(xPos - delta, yPos)) / (2 * delta);
}

function f2Of(xPos, yPos, delta) {
	return (fOf(xPos, yPos + delta) - fOf(xPos, yPos - delta)) / (2 * delta);
}

function go() {
	graphDo()
	let fns = []
	eqCan.fns.map(fn => {
		fns.push(fn.str)
	})
	console.log('fns', fns.join('~'))
	optSet('fns', fns.join('~'))
	if (eqCan.ptsQ) {
		ptsDraw();
	} else {
		let g = eqCan.cans.canPts.g
		g.clearRect(0, 0, g.canvas.width, g.canvas.height)
	}
}

function graphDo() {
	let g = eqCan.cans.can.g
	g.clearRect(0, 0, g.canvas.width, g.canvas.height)
	let graph = new Graph(eqCan.cans.canGraph.g, coords);
	graph.drawGraph();
	eqCan.imageData = g.getImageData(0, 0, eqCan.canvasWd, eqCan.canvasHt);
	let start = new Date().getTime();
	eqCan.fnLine = [];
	for (let i = 0; i < eqCan.fns.length; i++) {
		let fn = eqCan.fns[i]
		fn.str = document.getElementById('fn' + i).value
		let s = fn.str
		if (s.length > 0) {
			s = s.substr(0, 1000);
			let parts = s.split("=");
			let s1 = "(" + parts[0] + ")";
			if (parts.length > 1) {
				s1 += "-(" + parts[1] + ")";
			}
			eqCan.parser.radiansQ = this.radQ;
			eqCan.parser.setVarVal('a', parseFloat(eqCan.aVal));
			eqCan.parser.newParse(s1);
			g.strokeStyle = fn.clr
			g.lineWidth = 1.5;
			if (eqCan.polarQ) {
				drawPlot('polar', fn.clr);
			} else {
				drawPlot('implicit', fn.clr);
			}
		}
	}
	g.putImageData(eqCan.imageData, 0, 0);
	let end = new Date().getTime();
	let time = end - start;
	document.getElementById('speed').innerHTML = '<i>Completed in ' + time / 1000 + 's</i>';
	g.fillStyle = "#000000";
	g.strokeStyle = "#000000";
	g.font = "bold 14px sans-serif";
	g.textAlign = "center";
	let anss = [];
	for (let i = 0; i < anss.length; i++) {
		let ans = anss[i];
		if (ans >= coords.xStt && ans < coords.xEnd) {
			g.fillText(ans.toPrecision(5), coords.toXPix(ans), coords.toYPix(0) - 10);
			g.beginPath();
			g.arc(coords.toXPix(ans), coords.toYPix(0), 5, 0, Math.PI * 2);
			g.stroke();
		}
	}
}

function getSteepestAngle(vx, vy, delta) {
	let bestAngle = eqCan.prevAngle;
	let bestZ = absHtDiff(bestAngle, vx, vy, delta);
	let sttAngle = bestAngle;
	let goQ = true;
	do {
		let thisZ = absHtDiff(bestAngle + 0.1, vx, vy, delta);
		if (thisZ > bestZ) {
			bestAngle += 0.1;
			bestZ = thisZ;
		} else {
			goQ = false;
		}
	} while (goQ);
	if (bestAngle == sttAngle) {
		goQ = true;
		do {
			let thisZ = absHtDiff(bestAngle - 0.1, vx, vy, delta);
			if (thisZ > bestZ) {
				bestAngle -= 0.1;
				bestZ = thisZ;
			} else {
				goQ = false;
			}
		} while (goQ);
	}
	return bestAngle;
}

function absHtDiff(angle, xPos, yPos, delta) {
	let pt = new Pt(xPos, yPos);
	let ptA = pt.translatePolar(angle, delta * 0.20);
	let ptB = pt.translatePolar(angle, -delta * 0.20);
	return Math.abs(fOf(ptA.x, ptA.y) - fOf(ptB.x, ptB.y));
}

function fmt(num, digits) {
	if (num == Number.POSITIVE_INFINITY)
		return "undefined";
	if (num == Number.NEGATIVE_INFINITY)
		return "undefined";
	num = num.toPrecision(digits);
	num = num.replace(/0+$/, "");
	if (num.charAt(num.length - 1) == ".")
		num = num.substr(0, num.length - 1);
	if (Math.abs(num) < 1e-15)
		num = 0;
	return num;
}

function fixParentheses(s) {
	let sttParCount = 0;
	let endParCount = 0;
	for (let i = 0; i < s.length; i++) {
		if (s.charAt(i) == "(")
			sttParCount++;
		if (s.charAt(i) == ")")
			endParCount++;
	}
	while (sttParCount < endParCount) {
		s = "(" + s;
		sttParCount++;
	}
	while (endParCount < sttParCount) {
		s += ")";
		endParCount++;
	}
	return (s);
}

function optGet(name) {
	let val = localStorage.getItem(`equnGraph.${name}`)
	if (val == null)
		val = eqCan.opts[name]
	return val
}

function optSet(name, val) {
	localStorage.setItem(`equnGraph.${name}`, val)
	eqCan.opts[name] = val
}

function Coords(left, top, width, height, xStt, yStt, xEnd, yEnd, uniScaleQ) {
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
	this.xStt = xStt;
	this.yStt = yStt;
	this.xEnd = xEnd;
	this.yEnd = yEnd;
	this.uniScaleQ = uniScaleQ;
	this.xLogQ = false;
	this.yLogQ = false;
	this.calcScale();
}
Coords.prototype.calcScale = function() {
	if (this.xLogQ) {
		if (this.xStt <= 0)
			this.xStt = 1;
		if (this.xEnd <= 0)
			this.xEnd = 1;
	}
	if (this.yLogQ) {
		if (this.yStt <= 0)
			this.yStt = 1;
		if (this.yEnd <= 0)
			this.yEnd = 1;
	}
	let temp;
	if (this.xStt > this.xEnd) {
		temp = this.xStt;
		this.xStt = this.xEnd;
		this.xEnd = temp;
	}
	if (this.yStt > this.yEnd) {
		temp = this.yStt;
		this.yStt = this.yEnd;
		this.yEnd = temp;
	}
	let xSpan = this.xEnd - this.xStt;
	if (xSpan <= 0)
		xSpan = 1e-9;
	this.xScale = xSpan / this.width;
	this.xLogScale = (Math.log(this.xEnd) - Math.log(this.xStt)) / this.width;
	let ySpan = this.yEnd - this.yStt;
	if (ySpan <= 0)
		ySpan = 1e-9;
	this.yScale = ySpan / this.height;
	this.yLogScale = (Math.log(this.yEnd) - Math.log(this.yStt)) / this.height;
	if (this.uniScaleQ && !this.xLogQ && !this.yLogQ) {
		let newScale = Math.max(this.xScale, this.yScale);
		this.xScale = newScale;
		xSpan = this.xScale * this.width;
		let xMid = (this.xStt + this.xEnd) / 2;
		this.xStt = xMid - xSpan / 2;
		this.xEnd = xMid + xSpan / 2;
		this.yScale = newScale;
		ySpan = this.yScale * this.height;
		let yMid = (this.yStt + this.yEnd) / 2;
		this.yStt = yMid - ySpan / 2;
		this.yEnd = yMid + ySpan / 2;
	}
};
Coords.prototype.scale = function(factor, xMid, yMid) {
	if (typeof xMid == 'undefined')
		xMid = (this.xStt + this.xEnd) / 2;
	this.xStt = xMid - (xMid - this.xStt) * factor;
	this.xEnd = xMid + (this.xEnd - xMid) * factor;
	if (typeof yMid == 'undefined')
		yMid = (this.yStt + this.yEnd) / 2;
	this.yStt = yMid - (yMid - this.yStt) * factor;
	this.yEnd = yMid + (this.yEnd - yMid) * factor;
	this.calcScale();
};
Coords.prototype.drag = function(xPix, yPix) {
	this.xStt += xPix * this.xScale;
	this.xEnd += xPix * this.xScale;
	this.yStt += yPix * this.yScale;
	this.yEnd += yPix * this.yScale;
	this.calcScale();
};
Coords.prototype.newCenter = function(x, y) {
	let xMid = this.xStt + x * this.xScale;
	let xhalfspan = (this.xEnd - this.xStt) / 2;
	this.xStt = xMid - xhalfspan;
	this.xEnd = xMid + xhalfspan;
	let yMid = this.yEnd - y * this.yScale;
	let yhalfspan = (this.yEnd - this.yStt) / 2;
	this.yStt = yMid - yhalfspan;
	this.yEnd = yMid + yhalfspan;
	this.calcScale();
};
Coords.prototype.fitToPts = function(pts, borderFactor) {
	for (let i = 0; i < pts.length; i++) {
		let pt = pts[i];
		if (i == 0) {
			this.xStt = pt.x;
			this.xEnd = pt.x;
			this.yStt = pt.y;
			this.yEnd = pt.y;
		} else {
			this.xStt = Math.min(this.xStt, pt.x);
			this.xEnd = Math.max(this.xEnd, pt.x);
			this.yStt = Math.min(this.yStt, pt.y);
			this.yEnd = Math.max(this.yEnd, pt.y);
		}
	}
	let xMid = (this.xStt + this.xEnd) / 2;
	let xhalfspan = borderFactor * (this.xEnd - this.xStt) / 2;
	this.xStt = xMid - xhalfspan;
	this.xEnd = xMid + xhalfspan;
	let yMid = (this.yStt + this.yEnd) / 2;
	let yhalfspan = borderFactor * (this.yEnd - this.yStt) / 2;
	this.yStt = yMid - yhalfspan;
	this.yEnd = yMid + yhalfspan;
	this.calcScale();
};
Coords.prototype.toXPix = function(val, useCornerQ) {
	if (this.xLogQ) {
		return this.left + (Math.log(val) - Math.log(this.xStt)) / this.xLogScale;
	} else {
		return this.left + ((val - this.xStt) / this.xScale);
	}
};
Coords.prototype.toYPix = function(val) {
	if (this.yLogQ) {
		return this.top + (Math.log(this.yEnd) - Math.log(val)) / this.yLogScale;
	} else {
		return this.top + ((this.yEnd - val) / this.yScale);
	}
};
Coords.prototype.toPtVal = function(pt, useCornerQ) {
	return new Pt(this.toXVal(pt.x, useCornerQ), this.toYVal(pt.y, useCornerQ));
};
Coords.prototype.toXVal = function(pix, useCornerQ) {
	if (useCornerQ) {
		return this.xStt + (pix - this.left) * this.xScale;
	} else {
		return this.xStt + pix * this.xScale;
	}
};
Coords.prototype.toYVal = function(pix, useCornerQ) {
	if (useCornerQ) {
		return this.yEnd - (pix - top) * this.yScale;
	} else {
		return this.yEnd - pix * this.yScale;
	}
};
Coords.prototype.getTicks = function(stt, span, ratio) {
	let ticks = [];
	let inter = this.tickInterval(span / ratio, false);
	let tickStt = Math.ceil(stt / inter) * inter;
	let i = 0;
	let tick = 1
	do {
		tick = tickStt + i * inter;
		tick = Number(tick.toPrecision(8));
		ticks.push([tick, 1]);
		i++;
	} while (tick < stt + span);
	inter = this.tickInterval(span / ratio, true);
	for (i = 0; i < ticks.length; i++) {
		let t = ticks[i][0];
		if (Math.abs(Math.round(t / inter) - (t / inter)) < 0.001) {
			ticks[i][1] = 0;
		}
	}
	return ticks;
};
Coords.prototype.tickInterval = function(span, majorQ) {
	let pow10 = Math.pow(10, Math.floor(Math.log(span) * Math.LOG10E));
	let mantissa = span / pow10;
	if (mantissa >= 5) {
		if (majorQ) {
			return (5 * pow10);
		} else {
			return (1 * pow10);
		}
	}
	if (mantissa >= 3) {
		if (majorQ) {
			return (2 * pow10);
		} else {
			return (0.2 * pow10);
		}
	}
	if (mantissa >= 1.4) {
		if (majorQ) {
			return (0.5 * pow10);
		} else {
			return (0.2 * pow10);
		}
	}
	if (mantissa >= 0.8) {
		if (majorQ) {
			return (0.5 * pow10);
		} else {
			return (0.1 * pow10);
		}
	}
	if (majorQ) {
		return (0.2 * pow10);
	} else {
		return (0.1 * pow10);
	}
};
class Graph {
	constructor(g, coords) {
		this.g = g;
		this.coords = coords;
		this.xLinesQ = true;
		this.yLinesQ = true;
		this.xValsQ = true;
		this.yValsQ = true;
		this.skewQ = false;
		g.clearRect(0, 0, g.canvas.width, g.canvas.height)
	}
	SVGGrid() {
		this.hzAxisY = coords.toYPix(0);
		if (this.hzAxisY < 0)
			this.hzAxisY = 0;
		if (this.hzAxisY > coords.height)
			this.hzAxisY = coords.height;
		this.hzNumsY = this.hzAxisY + 14;
		if (this.hzAxisY > coords.height - 10)
			this.hzNumsY = coords.height - 3;
		this.vtAxisX = coords.toXPix(0);
		if (this.vtAxisX < 0)
			this.vtAxisX = 0;
		if (this.vtAxisX > coords.width)
			this.vtAxisX = coords.width;
		this.vtNumsX = this.vtAxisX - 5;
		this.vtNumsAlign = 'right';
		if (this.vtAxisX < 30) {
			this.vtNumsX = this.vtAxisX + 4;
			this.vtNumsAlign = 'left';
			if (this.vtAxisX < 0) {
				this.vtNumsX = 6;
			}
		}
		eqCan.svg.strokeStyle = 'none';
		eqCan.svg.fillStyle = 'white';
		eqCan.svg.rect(0, 0, eqCan.graphWd, eqCan.graphHt);
		eqCan.svg.fillStyle = 'none';
		let ticks = coords.getTicks(coords.xStt, coords.xEnd - coords.xStt, eqCan.graphWd / 100);
		for (let i = 0; i < ticks.length; i++) {
			let tick = ticks[i];
			let xVal = tick[0];
			let tickLevel = tick[1];
			if (tickLevel == 0) {
				eqCan.svg.lineWidth = '0.3';
				eqCan.svg.strokeStyle = eqCan.graphClr
			} else {
				eqCan.svg.lineWidth = '0.1';
				eqCan.svg.strokeStyle = eqCan.graphClr
			}
			let xPix = coords.toXPix(xVal, false);
			eqCan.svg.moveTo(xPix, coords.toYPix(coords.yStt, false));
			eqCan.svg.lineTo(xPix, coords.toYPix(coords.yEnd, false));
			if (tickLevel == 0 && this.xValsQ) {
				eqCan.svg.strokeStyle = '#f00';
				eqCan.svg.font = "bold 12px sans-serif";
				eqCan.svg.textAlign = "center";
				eqCan.svg.fillText(xVal.toString(), xPix, this.hzNumsY, 0);
			}
		}
		ticks = coords.getTicks(coords.yStt, coords.yEnd - coords.yStt, eqCan.graphHt / 100);
		for (let i = 0; i < ticks.length; i++) {
			let tick = ticks[i];
			let yVal = tick[0];
			let tickLevel = tick[1];
			if (tickLevel == 0) {
				eqCan.svg.lineWidth = '0.3';
				eqCan.svg.strokeStyle = eqCan.graphClr
			} else {
				eqCan.svg.lineWidth = '0.1';
				eqCan.svg.strokeStyle = eqCan.graphClr
			}
			let yPix = coords.toYPix(yVal, false);
			eqCan.svg.moveTo(coords.toXPix(coords.xStt, false), yPix);
			eqCan.svg.lineTo(coords.toXPix(coords.xEnd, false), yPix);
			if (tickLevel == 0 && this.yValsQ) {
				eqCan.svg.strokeStyle = '#00f';
				eqCan.svg.font = "bold 12px sans-serif";
				eqCan.svg.textAlign = this.vtNumsAlign;
				eqCan.svg.fillText(yVal.toString(), this.vtNumsX, yPix + 5, 0);
			}
		}
		eqCan.svg.lineWidth = 2;
		eqCan.svg.strokeStyle = "#0000ff";
		console.log('SVGGrid', this.hzAxisY, 'b');
		eqCan.svg.lineWidth = 1.5;
		eqCan.svg.strokeStyle = "#ff0000";
		eqCan.svg.strokeStyle = '#f00';
		eqCan.svg.moveTo(this.vtAxisX, coords.toYPix(coords.yStt, false));
		eqCan.svg.lineTo(this.vtAxisX, coords.toYPix(coords.yEnd, false));
		eqCan.svg.font = "bold 20px sans-serif";
		eqCan.svg.textAlign = "left";
		eqCan.svg.fillText('y', this.vtAxisX + 5, coords.toYPix(coords.yEnd, false) + 16, 0);
		eqCan.svg.strokeStyle = '#00f';
		eqCan.svg.font = "bold 20px sans-serif";
		eqCan.svg.textAlign = "left";
		eqCan.svg.fillText('x', coords.toXPix(coords.xEnd, false) - 17, this.hzAxisY - 5, 0);
		eqCan.svg.moveTo(coords.toXPix(coords.xStt, false), this.hzAxisY);
		eqCan.svg.lineTo(coords.toXPix(coords.xEnd, false), this.hzAxisY);
	}
	drawGraph() {
		this.hzAxisY = coords.toYPix(0);
		if (this.hzAxisY < 0)
			this.hzAxisY = 0;
		if (this.hzAxisY > coords.height)
			this.hzAxisY = coords.height;
		this.hzNumsY = this.hzAxisY + 14;
		if (this.hzAxisY > coords.height - 10)
			this.hzNumsY = coords.height - 3;
		this.vtAxisX = coords.toXPix(0);
		if (this.vtAxisX < 0)
			this.vtAxisX = 0;
		if (this.vtAxisX > coords.width)
			this.vtAxisX = coords.width;
		this.vtNumsX = this.vtAxisX - 5;
		this.vtNumsAlign = 'right';
		if (this.vtAxisX < 30) {
			this.vtNumsX = this.vtAxisX + 4;
			this.vtNumsAlign = 'left';
			if (this.vtAxisX < 0) {
				this.vtNumsX = 6;
			}
		}
		if (coords.xLogQ) {
			this.drawLinesLogX();
		} else {
			if (this.xLinesQ) {
				this.drawHzLines();
			}
		}
		if (coords.yLogQ) {
			this.drawLinesLogY();
		} else {
			if (this.yLinesQ) {
				this.drawVtLines();
			}
		}
	}
	drawVtLines() {
		let g = this.g;
		g.lineWidth = 1;
		let ticks = coords.getTicks(coords.xStt, coords.xEnd - coords.xStt, eqCan.graphWd / 100);
		for (let i = 0; i < ticks.length; i++) {
			let tick = ticks[i];
			let xVal = tick[0];
			let tickLevel = tick[1];
			if (tickLevel == 0) {
				g.lineWidth = 0.3
				g.strokeStyle = eqCan.graphClr
			} else {
				g.lineWidth = 0.1
				g.strokeStyle = eqCan.graphClr
			}
			let xPix = coords.toXPix(xVal, false);
			g.beginPath();
			g.moveTo(xPix, coords.toYPix(coords.yStt, false));
			g.lineTo(xPix, coords.toYPix(coords.yEnd, false));
			g.stroke();
			if (tickLevel == 0 && this.xValsQ) {
				g.fillStyle = "#000";
				g.font = "bold 12px sans-serif";
				g.textAlign = "center";
				g.fillText(xVal.toString(), xPix, this.hzNumsY);
			}
		}
		if (this.skewQ)
			return;
		g.lineWidth = 1.5;
		g.strokeStyle = "#000";
		g.beginPath();
		g.moveTo(this.vtAxisX, coords.toYPix(coords.yStt, false));
		g.lineTo(this.vtAxisX, coords.toYPix(coords.yEnd, false));
		g.stroke();
		g.beginPath();
		g.fillStyle = g.strokeStyle;
		g.drawArrow(this.vtAxisX, coords.toYPix(coords.yEnd), 15, 2, 20, 10, Math.PI / 2, 10, false);
		g.stroke();
		g.fill();
		g.font = "bold 18px sans-serif";
		g.textAlign = "left";
		g.fillText('y', this.vtAxisX + 10, coords.toYPix(coords.yEnd) + 15);
	}
	drawHzLines() {
		let g = this.g;
		g.lineWidth = 1;
		let ticks = coords.getTicks(coords.yStt, coords.yEnd - coords.yStt, eqCan.graphHt / 100);
		for (let i = 0; i < ticks.length; i++) {
			let tick = ticks[i];
			let yVal = tick[0];
			let tickLevel = tick[1];
			if (tickLevel == 0) {
				g.lineWidth = 0.3
				g.strokeStyle = eqCan.graphClr
			} else {
				g.lineWidth = 0.1
				g.strokeStyle = eqCan.graphClr
			}
			let yPix = coords.toYPix(yVal, false);
			g.beginPath();
			g.moveTo(coords.toXPix(coords.xStt, false), yPix);
			g.lineTo(coords.toXPix(coords.xEnd, false), yPix);
			g.stroke();
			if (tickLevel == 0 && this.yValsQ) {
				g.fillStyle = "#000";
				g.font = "bold 12px sans-serif";
				g.textAlign = this.vtNumsAlign;
				g.fillText(yVal.toString(), this.vtNumsX, yPix + 5);
			}
		}
		if (this.skewQ)
			return;
		g.lineWidth = 2;
		g.strokeStyle = "#000";
		g.beginPath();
		g.moveTo(coords.toXPix(coords.xStt, false), this.hzAxisY);
		g.lineTo(coords.toXPix(coords.xEnd, false), this.hzAxisY);
		g.stroke();
		g.beginPath();
		g.fillStyle = g.strokeStyle;
		g.drawArrow(coords.toXPix(coords.xEnd, false), this.hzAxisY, 15, 2, 20, 10, 0, 10, false);
		g.stroke();
		g.fill();
		g.font = "bold 18px sans-serif";
		g.textAlign = "left";
		g.fillText('x', coords.toXPix(coords.xEnd, false) - 18, this.hzAxisY - 10);
	}
}
class Parser {
	constructor() {
		this.operators = "+-*(/),^.";
		this.rootNode;
		this.tempNode = [];
		this.Variable = "x";
		this.errMsg = "";
		this.radiansQ = true;
		this.vals = [];
		for (let i = 0; i < 26; i++) {
			this.vals[i] = 0;
		}
		this.reset();
	}
	setVarVal(varName, newVal) {
		switch (varName) {
			case "x":
				this.vals[23] = newVal;
				break;
			case "y":
				this.vals[24] = newVal;
				break;
			case "z":
				this.vals[25] = newVal;
				break;
			default:
				if (varName.length == 1) {
					this.vals[varName.charCodeAt(0) - 'a'.charCodeAt(0)] = newVal;
				}
		}
	}
	getVal() {
		return (this.rootNode.walk(this.vals));
	}
	newParse(s) {
		this.reset();
		let s0 = s;
		s = s.split(" ").join("");
		s = s.split("[").join("(");
		s = s.split("]").join(")");
		s = s.replace(/\u2212/g, '-');
		s = s.replace(/\u00F7/g, '/');
		s = s.replace(/\u00D7/g, '*');
		s = s.replace(/\u00B2/g, '^2');
		s = s.replace(/\u00B3/g, '^3');
		s = s.replace(/\u221a/g, 'sqrt');
		s = this.fixxy(s);
		s = this.fixParentheses(s);
		s = this.fixUnaryMinus(s);
		s = this.fixImplicitMultply(s);
		console.log("newParse: " + s0 + ' => ' + s);
		this.rootNode = this.parse(s);
	}
	fixxy(s) {
		s = s.replace(/x[y]/g, 'x*y');
		s = s.replace(/y[x]/g, 'y*x');
		s = s.replace(/([0-9a])x/g, '$1*x');
		s = s.replace(/([0-9a])y/g, '$1*y');
		return s;
	}
	fixParentheses(s) {
		let sttParCount = 0;
		let endParCount = 0;
		for (let i = 0; i < s.length; i++) {
			if (s.charAt(i) == "(")
				sttParCount++;
			if (s.charAt(i) == ")")
				endParCount++;
		}
		while (sttParCount < endParCount) {
			s = "(" + s;
			sttParCount++;
		}
		while (endParCount < sttParCount) {
			s += ")";
			endParCount++;
		}
		return (s);
	}
	fixUnaryMinus(s) {
		let x = s + "\n";
		let y = "";
		let OpenQ = false;
		let prevType = "(";
		let thisType = "";
		for (let i = 0; i < s.length; i++) {
			let c = s.charAt(i);
			if (c >= "0" && c <= "9") {
				thisType = "N";
			} else {
				if (this.operators.indexOf(c) >= 0) {
					if (c == "-") {
						thisType = "-";
					} else {
						thisType = "O";
					}
				} else {
					if (c == "." || c == this.Variable) {
						thisType = "N";
					} else {
						thisType = "C";
					}
				}
				if (c == "(") {
					thisType = "(";
				}
				if (c == ")") {
					thisType = ")";
				}
			}
			x += thisType;
			if (prevType == "(" && thisType == "-") {
				y += "0";
			}
			if (OpenQ) {
				switch (thisType) {
					case "N":
						break;
					default:
						y += ")";
						OpenQ = false;
				}
			}
			if (prevType == "O" && thisType == "-") {
				y += "(0";
				OpenQ = true;
			}
			y += c;
			prevType = thisType;
		}
		if (OpenQ) {
			y += ")";
			OpenQ = false;
		}
		return (y);
	}
	fixImplicitMultply(s) {
		let x = s + "\n";
		let y = "";
		let prevType = "?";
		let prevName = "";
		let thisType = "?";
		let thisName = "";
		for (let i = 0; i < s.length; i++) {
			let c = s.charAt(i);
			if (c >= "0" && c <= "9") {
				thisType = "N";
			} else {
				if (this.operators.indexOf(c) >= 0 || c == '=') {
					thisType = "O";
					thisName = "";
				} else {
					thisType = "C";
					thisName += c;
				}
				if (c == "(") {
					thisType = "(";
				}
				if (c == ")") {
					thisType = ")";
				}
			}
			x += thisType;
			if (prevType == "N" && thisType == "C") {
				y += "*";
				thisName = "";
			}
			if (prevType == "N" && thisType == "(") {
				y += "*";
			}
			if (prevType == ")" && thisType == "(") {
				y += "*";
			}
			if (thisType == "(") {
				switch (prevName) {
					case "i":
					case "pi":
					case "e":
					case "a":
					case this.Variable:
						y += "*";
						break;
				}
			}
			y += c;
			prevType = thisType;
			prevName = thisName;
		}
		return (y);
	}
	reset() {
		this.tempNode = [];
		this.errMsg = "";
	}
	parse(s) {
		if (s == "") {
			return new MathNode("real", "0", this.radiansQ);
		}
		if (isNumeric(s)) {
			return new MathNode("real", s, this.radiansQ);
		}
		if (s.charAt(0) == "$") {
			if (isNumeric(s.substr(1))) {
				return this.tempNode[Number(s.substr(1))];
			}
		}
		let sLo = s.toLowerCase();
		if (sLo.length == 1) {
			if (sLo >= "a" && sLo <= "z") {
				return new MathNode("var", sLo, this.radiansQ);
			}
		}
		switch (sLo) {
			case "pi":
				return new MathNode("var", sLo, this.radiansQ);
		}
		let bracStt = s.lastIndexOf("(");
		if (bracStt > -1) {
			let bracEnd = s.indexOf(")", bracStt);
			if (bracEnd < 0) {
				this.errMsg += "Missing ')'\n";
				return new MathNode("real", "0", this.radiansQ);
			}
			let isParam = false;
			if (bracStt == 0) {
				isParam = false;
			} else {
				let prefix = s.substr(bracStt - 1, 1);
				isParam = this.operators.indexOf(prefix) <= -1;
			}
			if (!isParam) {
				this.tempNode.push(this.parse(s.substr(bracStt + 1, bracEnd - bracStt - 1)));
				return this.parse(s.substr(0, bracStt) + "$" + (this.tempNode.length - 1).toString() + s.substr(bracEnd + 1, s.length - bracEnd - 1));
			} else {
				let startM = -1;
				for (let u = bracStt - 1; u > -1; u--) {
					let found = this.operators.indexOf(s.substr(u, 1));
					if (found > -1) {
						startM = u;
						break;
					}
				}
				let nnew = new MathNode("func", s.substr(startM + 1, bracStt - 1 - startM), this.radiansQ);
				nnew.addchild(this.parse(s.substr(bracStt + 1, bracEnd - bracStt - 1)));
				this.tempNode.push(nnew);
				return this.parse(s.substr(0, startM + 1) + "$" + (this.tempNode.length - 1).toString() + s.substr(bracEnd + 1, s.length - bracEnd - 1));
			}
		}
		let k;
		let k1 = s.lastIndexOf("+");
		let k2 = s.lastIndexOf("-");
		if (k1 > -1 || k2 > -1) {
			if (k1 > k2) {
				k = k1;
				let nnew = new MathNode("op", "add", this.radiansQ);
				nnew.addchild(this.parse(s.substr(0, k)));
				nnew.addchild(this.parse(s.substr(k + 1, s.length - k - 1)));
				return nnew;
			} else {
				k = k2;
				let nnew = new MathNode("op", "sub", this.radiansQ);
				nnew.addchild(this.parse(s.substr(0, k)));
				nnew.addchild(this.parse(s.substr(k + 1, s.length - k - 1)));
				return nnew;
			}
		}
		k1 = s.lastIndexOf("*");
		k2 = s.lastIndexOf("/");
		if (k1 > -1 || k2 > -1) {
			if (k1 > k2) {
				k = k1;
				let nnew = new MathNode("op", "mult", this.radiansQ);
				nnew.addchild(this.parse(s.substr(0, k)));
				nnew.addchild(this.parse(s.substr(k + 1, s.length - k - 1)));
				return nnew;
			} else {
				k = k2;
				let nnew = new MathNode("op", "div", this.radiansQ);
				nnew.addchild(this.parse(s.substr(0, k)));
				nnew.addchild(this.parse(s.substr(k + 1, s.length - k - 1)));
				return nnew;
			}
		}
		k = s.indexOf("^");
		if (k > -1) {
			let nnew = new MathNode("op", "pow", this.radiansQ);
			nnew.addchild(this.parse(s.substr(0, k)));
			nnew.addchild(this.parse(s.substr(k + 1, s.length - k - 1)));
			return nnew;
		}
		if (isNumeric(s)) {
			return new MathNode("real", s, this.radiansQ);
		} else {
			if (s.length == 0) {
				return new MathNode("real", "0", this.radiansQ);
			} else {
				this.errMsg += "'" + s + "' is not a number.\n";
				return new MathNode("real", "0", this.radiansQ);
			}
		}
	}
}
class MathNode {
	constructor(typ, val, radQ) {
		this.tREAL = 0;
		this.tlet = 1;
		this.tOP = 2;
		this.tFUNC = 3;
		this.radiansQ = true;
		this.setNew(typ, val, radQ);
	}
	setNew(typ, val, radQ) {
		this.radiansQ = typeof radQ !== 'undefined' ? radQ : true;
		this.clear();
		switch (typ) {
			case "real":
				this.typ = this.tREAL;
				this.r = Number(val);
				break;
			case "var":
				this.typ = this.tVAR;
				this.v = val;
				break;
			case "op":
				this.typ = this.tOP;
				this.op = val;
				break;
			case "func":
				this.typ = this.tFUNC;
				this.op = val;
				break;
		}
		return (this);
	}
	clear() {
		this.r = 1;
		this.v = "";
		this.op = "";
		this.child = [];
		this.childCount = 0;
	}
	addchild(n) {
		this.child.push(n);
		this.childCount++;
		return (this.child[this.child.length - 1]);
	}
	getLevelsHigh() {
		let lvl = 0;
		for (let i = 0; i < this.childCount; i++) {
			lvl = Math.max(lvl, this.child[i].getLevelsHigh());
		}
		return (lvl + 1);
	}
	isLeaf() {
		return (this.childCount == 0);
	}
	getLastBranch() {
		if (this.isLeaf()) {
			return (null);
		}
		for (let i = 0; i < this.childCount; i++) {
			if (!this.child[i].isLeaf()) {
				return (this.child[i].getLastBranch());
			}
		}
		return (this);
	}
	fmt(htmlQ) {
		htmlQ = typeof htmlQ !== 'undefined' ? htmlQ : true;
		let s = "";
		if (this.typ == this.tOP) {
			switch (this.op.toLowerCase()) {
				case "add":
					s = "+";
					break;
				case "sub":
					s = htmlQ ? "&minus;" : "-";
					break;
				case "mult":
					s = htmlQ ? "&times;" : "x";
					break;
				case "div":
					s = htmlQ ? "&divide;" : "/";
					break;
				case "pow":
					s = "^";
					break;
				default:
					s = this.op;
			}
		}
		if (this.typ == this.tREAL) {
			s = this.r.toString();
		}
		if (this.typ == this.tVAR) {
			if (this.r == 1) {
				s = this.v;
			} else {
				if (this.r != 0) {
					s = this.r + this.v;
				}
			}
		}
		if (this.typ == this.tFUNC) {
			s = this.op;
		}
		return s;
	}
	walkFmt() {
		let s = this.walkFmta(true, "");
		s = s.replace("Infinity", "Undefined");
		return s;
	}
	walkFmta(noparq, prevop) {
		let s = "";
		if (this.childCount > 0) {
			let parq = false;
			if (this.op == "add")
				parq = true;
			if (this.op == "sub")
				parq = true;
			if (prevop == "div")
				parq = true;
			if (noparq)
				parq = false;
			if (this.typ == this.tFUNC)
				parq = true;
			if (this.typ == this.tOP) {} else {
				s += this.fmt(true);
			}
			if (parq)
				s += "(";
			for (let i = 0; i < this.childCount; i++) {
				if (this.typ == this.tOP && i > 0)
					s += this.fmt();
				s += this.child[i].walkFmta(false, this.op);
				if (this.typ == this.tFUNC || (parq && i > 0)) {
					s += ")";
				}
			}
		} else {
			s += this.fmt();
			if (prevop == "sin" || prevop == "cos" || prevop == "tan") {}
		}
		return s;
	}
	walkNodesFmt(level) {
		let s = "";
		for (let i = 0; i < level; i++) {
			s += "|   ";
		}
		s += this.fmt();
		s += "\n";
		for (let i = 0; i < this.childCount; i++) {
			s += this.child[i].walkNodesFmt(level + 1);
		}
		return s;
	}
	walk(vals) {
		let val = 0
		if (this.typ == this.tREAL)
			return (this.r);
		if (this.typ == this.tVAR) {
			switch (this.v) {
				case "x":
					return (vals[23]);
				case "y":
					return (vals[24]);
				case "z":
					return (vals[25]);
				case "pi":
					return (Math.PI);
				case "e":
					return (Math.exp(1));
				case "a":
					return (vals[0]);
				case "n":
					return (vals[13]);
				default:
					return (0);
			}
		}
		if (this.typ == this.tOP) {
			let val = 0;
			for (let i = 0; i < this.childCount; i++) {
				let val2 = 0;
				if (this.child[i] != null)
					val2 = this.child[i].walk(vals);
				if (i == 0) {
					val = val2;
				} else {
					switch (this.op) {
						case "add":
							val += val2;
							break;
						case "sub":
							val -= val2;
							break;
						case "mult":
							val *= val2;
							break;
						case "div":
							val /= val2;
							break;
						case "pow":
							if (val2 == 2) {
								val = val * val;
							} else {
								val = Math.pow(val, val2);
							}
							break;
						default:
					}
				}
			}
			return val;
		}
		if (this.typ == this.tFUNC) {
			let lhs = this.child[0].walk(vals);
			let angleFact = 1;
			if (!this.radiansQ)
				angleFact = 180 / Math.PI;
			val = '';
			switch (this.op) {
				case "sin":
					val = Math.sin(lhs / angleFact);
					break;
				case "cos":
					val = Math.cos(lhs / angleFact);
					break;
				case "tan":
					val = Math.tan(lhs / angleFact);
					break;
				case "asin":
					val = Math.asin(lhs) * angleFact;
					break;
				case "acos":
					val = Math.acos(lhs) * angleFact;
					break;
				case "atan":
					val = Math.atan(lhs) * angleFact;
					break;
				case "sinh":
					val = (Math.exp(lhs) - Math.exp(-lhs)) / 2;
					break;
				case "cosh":
					val = (Math.exp(lhs) + Math.exp(-lhs)) / 2;
					break;
				case "tanh":
					val = (Math.exp(lhs) - Math.exp(-lhs)) / (Math.exp(lhs) + Math.exp(-lhs));
					break;
				case "exp":
					val = Math.exp(lhs);
					break;
				case "log":
					val = Math.log(lhs) * Math.LOG10E;
					break;
				case "ln":
					val = Math.log(lhs);
					break;
				case "abs":
					val = Math.abs(lhs);
					break;
				case "deg":
					val = lhs * 180.0 / Math.PI;
					break;
				case "rad":
					val = lhs * Math.PI / 180.0;
					break;
				case "sign":
					if (lhs < 0) {
						val = -1;
					} else {
						val = 1;
					}
					break;
				case "sqrt":
					val = Math.sqrt(lhs);
					break;
				case "round":
					val = Math.round(lhs);
					break;
				case "int":
					val = Math.floor(lhs);
					break;
				case "floor":
					val = Math.floor(lhs);
					break;
				case "ceil":
					val = Math.ceil(lhs);
					break;
				case "fact":
					val = factorial(lhs);
					break;
				default:
					val = NaN;
			}
			return val;
		}
		return val;
	}
}

function factorial(n) {
	if (n < 0)
		return NaN;
	if (n < 2)
		return 1;
	n = n << 0;
	let i;
	i = n;
	let f = n;
	while (i-- > 2) {
		f *= i;
	}
	return f;
}
class SVG {
	constructor(coords) {
		this.lineWidth = 2
		this.strokeStyle = '#000';
		this.strokeStyle = '#ffcc66';
		this.ht = coords.height
		this.wd = coords.width
		this.lineAlpha = '1';
		this.fillStyle = '#def';
		this.fillAlpha = '0.5';
		this.inLineQ = false;
		this.inGroupQ = false;
		this.line = [];
		this.ftrStr = "</svg>";
		this.onQ = true
		this.txt = ''
		this.txtAdd(this.getHeader())
	}
	txtAdd(s) {
		if (this.onQ)
			this.txt += s + '\n'
	}
	getHeader() {
		let s = ''
		s += '<?xml version=\"1.0\" standalone=\"no\"?>\n';
		s += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n';
		s += '<svg width="' + this.wd + 'px" height="' + this.ht + 'px" xmlns="http://www.w3.org/2000/svg">\n';
		s += "<desc>SVG Output</desc>\n";
		return s;
	}
	getFooter() {
		let s = ''
		s += "</svg>";
		return s;
	}
	lineStyle(thick, clr) {
		if (thick == 0)
			thick = 0.2;
		this.lineWidth = thick;
		this.strokeStyle = clr;
	}
	beginFill(clr) {
		this.fillStyle = clr;
	}
	endFill() {}
	circle(x, y, rad) {
		this.tidyUp()
		this.txtAdd(`<circle cx="${x}" cy="${y}" r="${rad}" ${this.attrGet()} />`)
	}
	arc(x, y, rad, startAngle, endAngle) {
		this.tidyUp()
		let start = this.polarToCartesian(x, y, rad, endAngle);
		let end = this.polarToCartesian(x, y, rad, startAngle);
		let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
		let sweepFlag = 1
		let d = ["M", fmt(start.x, 1), fmt(start.y, 1), "A", rad, rad, 0, largeArcFlag, sweepFlag, fmt(end.x, 1), fmt(end.y, 1)].join(" ");
		this.txtAdd(`<path d="${d}" fill="none" stroke="${this.strokeStyle}" />`)
	}
	polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		let angleInRadians = angleInDegrees * Math.PI / 180.0;
		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians))
		};
	}
	moveTo(x, y) {
		this.tidyUp()
		this.line.push([x, y]);
		this.currStyle = this.attrGet();
	}
	lineTo(x, y) {
		this.line.push([x, y]);
	}
	tidyUp() {
		if (this.line.length > 1)
			this.polyline();
	}
	polyline() {
		let s = "";
		s += "<polyline points='";
		for (let i = 0; i < this.line.length; i++) {
			let pt = this.line[i];
			s += pt[0].toPrecision(5);
			s += " ";
			s += pt[1].toPrecision(5);
			s += ", ";
		}
		s += "' ";
		s += this.currStyle
		s += " />";
		this.txtAdd(s)
		s += "\n";
		this.line = [];
	}
	polygon(line) {
		this.tidyUp()
		let s = "";
		s += "<polygon points='";
		for (let i = 0; i < line.length; i++) {
			if (i > 0)
				s += ", ";
			let pt = line[i];
			s += pt.x.toPrecision(5);
			s += " ";
			s += pt.y.toPrecision(5);
		}
		s += "' ";
		s += this.attrGet();
		s += " />";
		s += "\n";
		this.txtAdd(s)
	}
	rect(x, y, width, height) {
		this.tidyUp()
		this.txtAdd('<rect x="' + x + 'px" y="' + y + 'px" width="' + width + 'px" height="' + height + 'px" ' + this.attrGet() + ' />')
	}
	fillText(text, x, y, rotate) {
		this.tidyUp()
		let s = '<text x="' + x + 'px" y="' + y + 'px" style="' + this.getFontStyle() + '" transform="rotate(' + rotate + ' ' + x + ' ' + y + ')" ' + '>';
		s += text;
		s += "</text>";
		this.txtAdd(s)
	}
	getStylez() {
		let s = "";
		s += "opacity:1;fill:#" + this.fillStyle.toString(16) + ";fill-opacity:1;fill-rule:nonzero;";
		s += "stroke:#" + this.strokeStyle.toString(16) + "; stroke-width:" + this.lineWidth.toString() + "; stroke-linecap:butt; stroke-linejoin:miter; stroke-opacity:1; visibility:visible;";
		return s;
	}
	attrGet() {
		let s = '';
		s += "stroke-width='" + this.lineWidth + "' ";
		s += "stroke='" + this.strokeStyle + "' ";
		if (this.fillStyle.length > 0) {
			s += "fill='" + this.fillStyle + "' ";
			s += "fill-opacity='" + this.fillAlpha + "' ";
		} else {
			s += "fill='none' ";
		}
		return s;
	}
	styleGet() {
		let s = '';
		if (this.fillStyle.length > 0) {
			s += "fill:" + this.fillStyle
		} else {}
		return s;
	}
	getFontStyle() {
		let s = "";
		let align = 'start'
		switch (this.textAlign) {
			case 'left':
				align = 'start'
				break
			case 'center':
				align = 'middle'
				break
			case 'right':
				align = 'end'
				break
			default:
		}
		s += 'font:' + this.font + ';  fill:' + this.strokeStyle + '; stroke:none;'
		s += ' text-anchor:' + align + ';'
		return (s);
	}
	group(id) {
		this.tidyUp()
		if (this.inGroupQ)
			this.txtAdd('</g>\n')
		this.txtAdd('<g id="' + id + '">')
		this.inGroupQ = true
	}
	getText() {
		this.tidyUp()
		if (this.inGroupQ)
			this.txtAdd('</g>')
		this.txtAdd(this.getFooter())
		return (this.txt);
	}
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
CanvasRenderingContext2D.prototype.drawArrow = function(x0, y0, totLen, shaftHt, headLen, headHt, angle, sweep, invertQ) {
	let g = this;
	let pts = [
		[0, 0],
		[-headLen, -headHt / 2],
		[-headLen + sweep, -shaftHt / 2],
		[-totLen, -shaftHt / 2],
		[-totLen, shaftHt / 2],
		[-headLen + sweep, shaftHt / 2],
		[-headLen, headHt / 2],
		[0, 0]
	];
	if (invertQ) {
		pts.push([0, -headHt / 2], [-totLen, -headHt / 2], [-totLen, headHt / 2], [0, headHt / 2]);
	}
	for (let i = 0; i < pts.length; i++) {
		let cosa = Math.cos(-angle);
		let sina = Math.sin(-angle);
		let xPos = pts[i][0] * cosa + pts[i][1] * sina;
		let yPos = pts[i][0] * sina - pts[i][1] * cosa;
		if (i == 0) {
			g.moveTo(x0 + xPos, y0 + yPos);
		} else {
			g.lineTo(x0 + xPos, y0 + yPos);
		}
	}
};

function getQueryVariable(variable) {
	let query = window.location.search.substring(1);
	let vars = query.split("&");
	for (let i = 0; i < vars.length; i++) {
		let pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
}

function canvasAdd(can1, can2) {
	var can3 = document.createElement('canvas');
	can3.width = can1.width
	can3.height = can2.height
	var ctx3 = can3.getContext('2d');
	ctx3.drawImage(can1, 0, 0);
	ctx3.drawImage(can2, 0, 0, can2.width / 2, can2.height / 2);
	return can3;
}

function canvasSave(typ) {
	typ = (typ == undefined) ? 'png' : typ;
	if (typ == 'jpg')
		typ = 'jpeg';
	let can = canvasAdd(eqCan.cans.can.el, eqCan.cans.canGraph.el);
	let dataUrl = can.toDataURL('image/' + typ);
	let win = window.open();
	let s = '<img src="' + dataUrl + '">'
	win.document.write(s);
	win.document.location = "#";
}

function canvasPrint() {
	let can = canvasAdd(eqCan.cans.can.el, eqCan.cans.canGraph.el);
	let dataUrl = can.toDataURL('image/png');
	let win = window.open();
	win.document.write("<img src='" + dataUrl + "'/>");
	win.document.location = "#";
	let isChrome = (window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1);
	if (isChrome) {
		win.focus();
		setTimeout(function() {
			win.focus();
			win.print();
		}, 500);
	} else {
		win.focus();
		win.print();
		win.close();
	}
}

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function save() {
	let can = canvasAdd(eqCan.cans.can.el, eqCan.cans.canGraph.el);
	var dataURL = can.toDataURL();
	var filename = prompt('Please enter a filename:\n(Your image will be saved with a default name if you do not specify a filename.) ', '');
	if (filename == "") {
		filename = "MathKit-Grapher-Saved-File" + makeid(20);
	}

	var imageElement = document.createElement("a");
	imageElement.href = dataURL;
	imageElement.setAttribute('download', filename);
	var id = 'grapherLink' + makeid(20)
	imageElement.setAttribute('id', id);
	document.body.appendChild(imageElement);
	document.getElementById(id).click(); /**/
	/*window.open(dataURL);/**/
}

function dist(dx, dy) {
	return (Math.sqrt(dx * dx + dy * dy));
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}