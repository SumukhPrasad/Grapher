// Classes and constructors
class Coords {
	constructor(left, top, width, height, xStt, yStt, xEnd, yEnd, uniScaleQ) {
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
	calcScale = function() {
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
	scale = function(factor, xMid, yMid) {
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
	drag = function(xPix, yPix) {
		this.xStt += xPix * this.xScale;
		this.xEnd += xPix * this.xScale;
		this.yStt += yPix * this.yScale;
		this.yEnd += yPix * this.yScale;
		this.calcScale();
	};
	newCenter = function(x, y) {
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
	fitToPts = function(pts, borderFactor) {
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
	toXPix = function(val, useCornerQ) {
		if (this.xLogQ) {
			return this.left + (Math.log(val) - Math.log(this.xStt)) / this.xLogScale;
		} else {
			return this.left + ((val - this.xStt) / this.xScale);
		}
	};
	toYPix = function(val) {
		if (this.yLogQ) {
			return this.top + (Math.log(this.yEnd) - Math.log(val)) / this.yLogScale;
		} else {
			return this.top + ((this.yEnd - val) / this.yScale);
		}
	};
	toPtVal = function(pt, useCornerQ) {
		return new Pt(this.toXVal(pt.x, useCornerQ), this.toYVal(pt.y, useCornerQ));
	};
	toXVal = function(pix, useCornerQ) {
		if (useCornerQ) {
			return this.xStt + (pix - this.left) * this.xScale;
		} else {
			return this.xStt + pix * this.xScale;
		}
	};
	toYVal = function(pix, useCornerQ) {
		if (useCornerQ) {
			return this.yEnd - (pix - top) * this.yScale;
		} else {
			return this.yEnd - pix * this.yScale;
		}
	};
	getTicks = function(stt, span, ratio) {
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
	tickInterval = function(span, majorQ) {
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
}

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


class Fn {
	constructor(str, clr) {
		this.str = (str == undefined) ? '' : str
		this.clr = clr
		this.svg = ''
	}
}




