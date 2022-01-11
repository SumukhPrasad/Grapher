// Helper Functions
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

function go() {
	graphDo()
	let fns = []
	eqCan.fns.map(fn => {
		fns.push(fn.str)
	})
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
	pop.style.right = '10px';
	pop.style.bottom = '10px';
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
	document.getElementById('infobox').innerHTML = eqCan.parser.rootNode.walkFmt() + "=0"
}

function infoPopClose() {
	let pop = document.getElementById('infopop');
	pop.style.opacity = 0;
	pop.style.zIndex = 1;
	pop.style.right = '-500px';
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


function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


function makePts() {
	let i;
	// These positions are relative to the pixels in the canvas itself. 
	// TODO: Make these percetages.
	let pos = [
		[140, 80, "A"],
		[420, 240, "B"],
		[120, 200, "C"]
	];
	eqCan.pts = [];
	for (i = 0; i < pos.length; i++) {
		let tempX = pos[i][0];
		let tempY = pos[i][1];
		let tempColor = "rgb(" + 0 + "," + 0 + "," + 255 + ")";
		eqCan.pts.push(new Pt(tempX, tempY, 9, tempColor));
	}
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
		eqCan.fns.push(new Fn('', getRandomColor()))
		console.log("fnAdd eqCan.fns", eqCan.fns);
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

function getRandomColor() {
	var letters = '01234567';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 8)];
	}
	return color;
}

function onKeyPress(e) {
	let key = e.keyCode || e.which;
	if (key == 13) {
		go();
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

function dist(dx, dy) {
	return (Math.sqrt(dx * dx + dy * dy));
}

function absHtDiff(angle, xPos, yPos, delta) {
	let pt = new Pt(xPos, yPos);
	let ptA = pt.translatePolar(angle, delta * 0.20);
	let ptB = pt.translatePolar(angle, -delta * 0.20);
	return Math.abs(fOf(ptA.x, ptA.y) - fOf(ptB.x, ptB.y));
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

function save(typ) {
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

function nodeDraw(g, node, level) {
	let boxWd = 40;
	let boxHt = 25;
	let xDist = 50;
	let yDist = 40;
	let boxClr = '#ccc'
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
	g.font = 'bold 15px monospace';
	g.textAlign = 'center';
	g.fillStyle = '#000';
	if (node.typ == node.tOP)
		g.fillStyle = '#888';
	g.fillText(node.fmt(false), node.x + boxWd / 2 + xFudge, node.y + boxHt / 2 + 6);
	eqCan.tree.xmax = Math.max(eqCan.tree.xmax, node.x + boxWd + xFudge)
	eqCan.tree.ymax = Math.max(eqCan.tree.ymax, node.y + boxHt)
	return node
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

