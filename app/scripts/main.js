'use strict';

(function() {

	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		drawStuff(canvas.width, canvas.height); //not before
	}
	
	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
	
	function drawStuff(canvasWidth, canvasHeight) {
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		function randomNum(min, max) {
			return Math.random() * (max - min) + min;
		}

		var prevCX = randomNum(0 , canvasWidth),
			prevCY = randomNum(0 , canvasHeight);

		var firstCX = prevCX,
			firstCY = prevCY;

		function drawCircle(i) {
			var cX = randomNum(i, canvasWidth),
				cY = randomNum(i, canvasHeight),
				radius = 4;
			ctx.beginPath();
			ctx.arc(cX, cY, radius, 0, 2 * Math.PI, false);
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
			ctx.stroke(); //stroke circle
			uniteCircles(i, cX, cY, prevCX, prevCY, radius);
			drawBezier(i, cX, cY, prevCX, prevCY);
			prevCX = cX;
			prevCY = cY;
		}

		function uniteCircles(i, cX, cY, prevCX, prevCY, radius) {
			switch(i) {
				case 0:
					drawLine(cX, cY, prevCX, prevCY);
					break;
				case 8:
					drawLine(cX, cY, prevCX, prevCY);
					drawLine(cX, cY, firstCX, firstCY); //draw closing line to the first el
					radius = 4;
					ctx.beginPath();
					ctx.arc(firstCX, firstCY, radius, 0, 2 * Math.PI, false);
					ctx.lineWidth = 1;
					ctx.strokeStyle = 'rgba(250, 53, 22, 1)';
					ctx.stroke(); //stroke closing circle
					break;
				default:
					drawLine(cX, cY, prevCX, prevCY);
					break;
			}
		}

		function drawLine(cX, cY, prevCX, prevCY) {
			ctx.beginPath();
			ctx.moveTo(cX, cY);
			ctx.lineTo(prevCX, prevCY);
			ctx.lineCap='round';
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
			ctx.stroke(); //stroke line
		}

		function drawBezier(i, cX, cY, prevCX, prevCY) {
			ctx.beginPath();
			ctx.moveTo(cX, cY);
			ctx.bezierCurveTo(canvasWidth/2, canvasHeight/2, cX, cY, prevCX, prevCY);
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
			ctx.stroke();
		}

		function drawElementsLoop(max){
			for (var i = 0; i < max; i++) {
				drawCircle(i);
				drawBezier(i);
			}
		}

		drawElementsLoop(9);//ammount of circles to be drawn
		
	}//drawStuff

	window.setInterval(function(){
		drawStuff(canvas.width,canvas.height);
	}, 5000);

})(); 
