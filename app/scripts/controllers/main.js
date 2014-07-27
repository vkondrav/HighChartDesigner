'use strict';

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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
	$scope.subtitle = 'subtitle';
	$scope.seriesName = 'series name';
	$scope.seriesColor = getRandomColor();
	$scope.positions = ['center', 'right', 'left'];
	$scope.verticalPositions = ['top','middle', 'bottom'];
	$scope.layout = ['horizontal', 'vertical'];
	$scope.legendAlign = $scope.positions[0];
	$scope.legendVerticalAlign = $scope.verticalPositions[2];
	$scope.legendLayout = $scope.layout[0];

	$scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            },
            title: {
            	text: $scope.title
        	},
            subtitle: {
                text: 'Subtitle'
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
        	legend: {
        		align: 'center'
        	},

        	loading: false
        },
        series: []        
    };

    $scope.changeTitle = function(){
    	$scope.chartConfig.options.title.text = $scope.title;
    };

    $scope.changeXaxis = function(){
    	$scope.chartConfig.options.xAxis.title.text = $scope.xAxis;
    };

    $scope.changeYaxis = function(){
    	$scope.chartConfig.options.yAxis.title.text = $scope.yAxis;
    };

    $scope.changeSubtitle = function(){
    	$scope.chartConfig.options.subtitle.text = $scope.subtitle;
    };

    $scope.addSeries = function () {

        var rnd = [];
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 100) + 1);
        }
        $scope.chartConfig.series.push({
        	name: $scope.seriesName,
        	color: $scope.seriesColor,
            data: rnd
        });

        $scope.seriesColor = getRandomColor();

    };

    $scope.removeSeries = function () {
        $scope.chartConfig.series.pop();
    };

    $scope.resetSeries = function(){
    	$scope.chartConfig.series = [];
    };

    $scope.applySelecter = function(){
    	angular.element('select').selecter();
    };

    $scope.changeLegend = function(){
    	$scope.chartConfig.options.legend.align = $scope.legendAlign;
    	$scope.chartConfig.options.legend.verticalAlign = $scope.legendVerticalAlign;
    	$scope.chartConfig.options.legend.layout = $scope.legendLayout;
    };

    //$scope.applySelecter();

    $scope.applyHighlight = function(){
    	hljs.initHighlightingOnLoad();
    };

  })
  .directive('postRender', [ '$timeout', function($timeout) {
		var def = {
		    restrict : 'A', 
		    terminal : true,
		    transclude : true,
		    link : function(scope) {
		        $timeout(scope.applySelecter(), 100);
		    }
		};
	return def;
  }]);