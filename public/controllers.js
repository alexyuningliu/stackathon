'use strict';

var driveApp = angular.module('driveApp', []);

driveApp.controller('DriveCtrl', function ($scope, $http) {

	$scope.scoreObject = {};
	$scope.highScores = {};
	$scope.hasHighScore = false;

	$scope.getHighScores = function() {
		console.log("Checking high scores");
		$http.get('/api/scores/high').
			success(function(data, status, headers, config) {
			  console.log("High scores retrieved ", data);
			}).
			error(function(data, status, headers, config) {
			  console.log("Error retrieving high scores ", data);
			});
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