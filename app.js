window.addEventListener('DOMContentLoaded', function() {
	var isStreaming = false,
		v = document.getElementById('v'),
		c = document.getElementById('c'),
		con = c.getContext('2d');
		w = 600, 
		h = 420,

	// Cross browser
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	if (navigator.getUserMedia) {
		// Request access to video only
		navigator.getUserMedia(
			{
				video:true,
				audio:false
			},		
			function(stream) {
				// Cross browser checks
				var url = window.URL || window.webkitURL;
    			v.src = url ? url.createObjectURL(stream) : stream;
    			// Set the video to play
    			v.play();
			},
			function(error) {
				alert('Something went wrong. (error code ' + error.code + ')');
				return;
			}
		);
	}
	else {
		alert('Sorry, the browser you are using doesn\'t support getUserMedia');
		return;
	}

	// Wait until the video stream can play
	v.addEventListener('canplay', function(e) {
	    if (!isStreaming) {
	    	// videoWidth isn't always set correctly in all browsers
	    	if (v.videoWidth > 0) h = v.videoHeight / (v.videoWidth / w);
			c.setAttribute('width', w);
			c.setAttribute('height', h);
			// Reverse the canvas image
			con.translate(w, 0);
			con.scale(-1, 1);
	      	isStreaming = true;
	    }
	}, false);

	// Wait for the video to start to play
	v.addEventListener('play', function() {

		var detector;

		if (!detector) {
			var width = 80;
			var height = 80;
			detector = new objectdetect.detector(width, height, 1.1, objectdetect.handfist);
		}
		
		// Every 33 milliseconds copy the video image to the canvas
		setInterval(function() {
			if (v.paused || v.ended) return;
			con.fillRect(0, 0, w, h);
			con.drawImage(v, 0, 0, w, h);

			console.log("New set of coordinates!");

			var coords = detector.detect(v, 1);
			if (coords[0]) {
				var coord = coords[0];
				
				/* Rescale coordinates from detector to video coordinate space: */
				coord[0] *= v.videoWidth / detector.canvas.width;
				coord[1] *= v.videoHeight / detector.canvas.height;
				coord[2] *= v.videoWidth / detector.canvas.width;
				coord[3] *= v.videoHeight / detector.canvas.height;
			
				console.log("coord[0]", coord[0]);
				console.log("coord[1]", coord[1]);
				console.log("coord[2]", coord[2]);
				console.log("coord[3]", coord[3]);

				/* Find coordinates with maximum confidence: */
				var coord = coords[0];
				for (var i = coords.length - 1; i >= 0; --i)
					if (coords[i][4] > coord[4]) coord = coords[i];

				con.beginPath();
					con.lineWidth = '2';
					con.fillStyle = 'rgba(0, 255, 255, 0.5)';
					con.fillRect(
						coord[0] / v.videoWidth * c.clientWidth,
						coord[1] / v.videoHeight * c.clientHeight,
						coord[2] / v.videoWidth * c.clientWidth,
						coord[3] / v.videoHeight * c.clientHeight);
					con.stroke();
					
			}

		}, 1000);

	}, false);


});