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
    $scope.legendX = 0;
    $scope.legendY = 0;

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
        //$scope.chartConfig.options.legend.x = $scope.legendX;
        console.log($scope.legendX);
    };

    angular.element('input[type=\'number\']').stepper();

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
  }])
  .directive('myStepper', [function(){
        var def = {
            restrict : 'A',
            link : function(element) {
                //element.stepper();
                console.log(element);
            }
        };
    return def;
  }])
  .directive('wrapper', function(){
        var def = {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope : {
                max: '=',
                min: '='
            },
            templateUrl: 'views/partials/columnWrapper.html',
            link: function(scope) {
                console.log(scope.max, scope.min);
            }

        };
    return def;
  })
  .directive('panel', function(){
        var def = {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope : {
                size: '=',
                title: '@'                
            },
            templateUrl: 'views/partials/panelWrapper.html',
            link: function(scope) {
                console.log(scope.size, scope.title);
            }

        };
    return def;
    })
  .directive('onlyDigits', function () {

    //http://jlevyuk.blogspot.ca/2013/08/restrict-input-to-numbers-only-in.html
    return {
        restrict: 'A',
        link: function (scope, element) {
            angular.element(element).on('keydown', function (event) {
                var key = event.which || event.keyCode;
               
                if (!event.shiftKey && !event.altKey && !event.ctrlKey &&
                    // numbers  
                    key >= 48 && key <= 57 ||
                    // Numeric keypad
                    key >= 96 && key <= 105 ||
                    // Backspace and Tab and Enter
                   key === 8 || key === 9 || key === 13 ||
                    // Home and End
                   key === 35 || key === 36 ||
                    // left and right arrows
                   key === 37 || key === 39 ||
                    // Del and Ins
                   key === 46 || key === 45)
                {
                    return true;
                }

                return false;
            });
        }
    };
});