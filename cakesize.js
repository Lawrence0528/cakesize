'use strict';
var formatFloat = function(num, pos) {
	var size = Math.pow(10, pos);
	return Math.round(num * size) / size;
}

var cakeSizeApp = angular.module("cakeSizeApp",["ngMaterial"]);

cakeSizeApp.directive('sizeInput', ['$sce',function($sce) {
	return {
		scope : {
			title : '=',
			area : '=',
			volume : '='
		},
        templateUrl: "CakeInput.html",
		controller: function($scope, $element, $attrs) {
            $scope.round = {};
		 	
			$scope.calcRound = function() {
				if ($scope.round.diameter) {
					$scope.round.area = formatFloat(($scope.round.diameter/2)*Math.PI,2);
					$scope.area = $scope.round.area;
					if ($scope.round.height) {
						$scope.round.volume = formatFloat($scope.round.area * $scope.round.height,2);
						$scope.volume = $scope.round.volume;	
					}
				}
			}
        },
		link : function(scope, element, attrs, ctrl) {
			$sce.trustAsHtml("CakeInput.html");
		}
	}

	
}]);

cakeSizeApp.controller("cakeSizeCalc",['$scope',function($scope) {
		$scope.calcRatio = function(source,target) {
			if (source && target) {
				if (source.volume && target.volume) {
					return formatFloat(target.volume / source.volume,2);
				} else if(source.area && target.area) {
					return formatFloat(target.area / source.area,2);
				}
			}
		}
	}]);