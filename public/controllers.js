'use strict';

var driveApp = angular.module('driveApp', []);

driveApp.controller('DriveCtrl', function ($scope, $http) {

	$scope.scoreObject = {};
	$scope.highScores;
	$scope.hasHighScore = false;

	$scope.getHighScores = function(callback) {
		console.log("Checking high scores");
		$http.get('/api/scores/high').
			success(function(data, status, headers, config) {
			  console.log("High scores retrieved ", data);
			  $scope.highScores = data;
			  callback(null, 'one');
			}).
			error(function(data, status, headers, config) {
			  console.log("Error retrieving high scores ", data);
			  callback(null, 'one');
			});
	}

	$scope.checkForHighScore = function(callback) {
		console.log("Checking if you have a high score");
		if ($scope.highScores.length < 3) {
			console.log("You have a high score!");
			$scope.hasHighScore = true;
			callback(null, 'two');
		} else {
			for (var i = 0; i < $scope.highScores.length; i++) {
				if ($scope.scoreObject.finalTimeInMilliseconds < $scope.highScores[i].finalTimeInMilliseconds) {
					console.log("You have a high score!");
					$scope.hasHighScore = true;
				}
			}
			callback(null, 'two');
		}
	}

	$scope.submitScore = function() {
		console.log("Score submitted!");
		$http.post('/api/scores', {scoreObject: $scope.scoreObject}).
		  success(function(data, status, headers, config) {
		    console.log("Database updated ", data);
		    $('#myModal').modal('hide');
		    setTimeout(window.location.reload.bind(window.location), 1000);
		  }).
		  error(function(data, status, headers, config) {
		    console.log("Error updating database ", data);
		    $('#myModal').modal('hide');
		    setTimeout(window.location.reload.bind(window.location), 1000);
		  });
	}

	$scope.playAgain = function() {
		setTimeout(window.location.reload.bind(window.location), 500);
	}
});

driveApp.filter('toFormattedTimeString', function() {
	return function(finalTimeInMilliseconds) {
		var min = Math.floor(finalTimeInMilliseconds / 60000);
		
		var sec = Math.floor((finalTimeInMilliseconds - min * 60000) / 1000); 
		if(sec < 10) sec = "0" + sec;
		
		var mili = Math.floor(finalTimeInMilliseconds - min * 60000 - sec * 1000);
		if(mili < 100) mili = "0" + mili;
		if(mili < 10) mili = "0" + mili;
		
		var formattedTimeString = ""+min+":"+sec+":"+mili;
		return formattedTimeString;
	};
})

driveApp.filter('differenceFromLastHighScore', function() {
	return function(newFinalTimeInMilliseconds, scope) {
		if (scope.highScores) {

			var differenceInTime =  newFinalTimeInMilliseconds - scope.highScores[scope.highScores.length - 1].finalTimeInMilliseconds

			var min = Math.floor(differenceInTime / 60000);
			
			var sec = Math.floor((differenceInTime - min * 60000) / 1000); 
			if(sec < 10) sec = "0" + sec;
			
			var mili = Math.floor(differenceInTime - min * 60000 - sec * 1000);
			if(mili < 100) mili = "0" + mili;
			if(mili < 10) mili = "0" + mili;
			
			var formattedTimeString = ""+min+":"+sec+":"+mili;
			return formattedTimeString;
		} else {
			return newFinalTimeInMilliseconds;
		}
	};
})