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

    $scope.positions = {
        horizontal: ['center', 'right', 'left'],
        vertical: ['top','middle', 'bottom'],
        align: ['horizontal', 'vertical']
    };

	$scope.label = {
        title: 'Title',
        subtitle: 'subtitle',
        xAxis: 'x-axis',
        yAxis: 'y-axis'
    };

	$scope.series = {
        name: 'series name',
        color: getRandomColor()
    };

    $scope.legend = {
        title: 'legend title',
        horizontalPosition:$scope.positions.horizontal[0],
        verticalPosition: $scope.positions.vertical[2],
        layout: $scope.positions.align[0],
        x: 0,
        y: 0
    };

	$scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            },
            title: {
            	text: $scope.label.title
        	},
            subtitle: {
                text: $scope.label.subtitle
            },
            xAxis: {
        		title: {
        			text: $scope.label.xAxis
        		}
        	},
        	yAxis: {
        		title: {
        			text: $scope.label.yAxis
        		}
        	},
        	legend: {
                title: {
                    text: $scope.legend.title
                },
        		align: $scope.legend.horizontalPosition,
                verticalAlign: $scope.legend.verticalPosition,
                layout: $scope.legend.layout,
                x: $scope.legend.x,
                y: $scope.legend.y
        	},

        	loading: false
        },
        series: []        
    };

    $scope.change = function(){
    	$scope.chartConfig.options.title.text = $scope.label.title;
        $scope.chartConfig.options.xAxis.title.text = $scope.label.xAxis;
        $scope.chartConfig.options.yAxis.title.text = $scope.label.yAxis;
        $scope.chartConfig.options.subtitle.text = $scope.label.subtitle;
        $scope.chartConfig.options.legend.align = $scope.legend.horizontalPosition;
        $scope.chartConfig.options.legend.verticalAlign = $scope.legend.verticalPosition;
        $scope.chartConfig.options.legend.layout = $scope.legend.layout;
        $scope.chartConfig.options.legend.x = $scope.legend.x;
        $scope.chartConfig.options.legend.y = $scope.legend.y;
        $scope.chartConfig.options.legend.title.text = $scope.legend.title;
    };


    $scope.addSeries = function () {

        var rnd = [];
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 100) + 1);
        }
        $scope.chartConfig.series.push({
        	name: $scope.series.name,
        	color: $scope.series.color,
            data: rnd
        });

        $scope.series.color = getRandomColor();

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

    //angular.element('input[type=\'number\']').stepper();

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
                   key === 46 || key === 45 ||

                   key === 109 || key === 189)
                {
                    return true;
                }

                return false;
            });
        }
    };
  })
.directive('isNumber', function () {
    return {
        restrict: 'A',
        template: '<input ng-model="inputValue" />',
        scope: {
            inputValue: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split('');
                if (arr.length === 0) {
                    return;
                }
                if (arr.length === 1 && (arr[0] === '-' || arr[0] === '.' )) {
                    return;
                }
                if (arr.length === 2 && newValue === '-.') {
                    return;  
                } 
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
});