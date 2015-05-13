'use strict';

var driveApp = angular.module('driveApp', []);

driveApp.controller('DriveCtrl', function ($scope, $http) {

	$scope.scoreObject = {};
	$scope.exportedFinalTimeInMilliseconds = exportedFinalTimeInMilliseconds;

	$scope.submitScore = function() {
		console.log("Score submitted!");
		$http.post('/api/scores', {scoreObject: $scope.scoreObject}).
		  success(function(data, status, headers, config) {
		    console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		  });
	}
});