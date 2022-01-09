// events
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