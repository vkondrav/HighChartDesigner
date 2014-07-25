'use strict';

/**
 * @ngdoc function
 * @name highChartDesignerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the highChartDesignerApp
 */
angular.module('highChartDesignerApp')
  .controller('MainCtrl', function ($scope) {
	
	$scope.title = 'Title';
	$scope.xAxis = 'x-axis';
	$scope.yAxis = 'y-axis';

	$scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        xAxis: {
        	title: {
        		text: $scope.xAxis
        	}
        },
        yAxis: {
        	title: {
        		text: $scope.yAxis
        	}
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: $scope.title
        },

        loading: false
    };

    $scope.changeTitle = function(){
    	$scope.chartConfig.title.text = $scope.title;
    };

    $scope.changeXaxis = function(){
    	$scope.chartConfig.xAxis.title.text = $scope.xAxis;
    };

    $scope.changeYaxis = function(){
    	$scope.chartConfig.yAxis.title.text = $scope.yAxis;
    };

    $scope.addSeries = function () {
        var rnd = [];
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1);
        }
        $scope.chartConfig.series.push({
            data: rnd
        });
    };
  });
