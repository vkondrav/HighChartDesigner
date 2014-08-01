'use strict';

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function replacer(key, value){
    //console.log(key);
    //if (key === 'data' || value === null){
    //    return undefined;
    //}else{
    //    return value;
    //}
    return value;
}

function getRandomData(n, min, max){

    if(isNaN(n)){n = 12;}
    if(isNaN(min)){min = 20;}
    if(isNaN(max)){max = 100;}

    var rnd = [];
    for (var i = 0; i < n; i++) {
        rnd.push(Math.floor(Math.random() * max) + min);
    }

    return rnd;
}

function passByValue(obj){
    return JSON.parse(JSON.stringify(obj));
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

    //ALL VARIBLES
    //CHARTS
    $scope.chart = {
        animation: true,
        backgroundColor: '#FFFFFF',
        borderColor: '#4572A7',
        borderRadius: 5,
        borderWidth: 0,
        height: null,
        ignoreHiddenSeries: true,
        inverted: false,
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        plotBackgroundColor: '#FFFFFF',
        plotBorderColor: '#C0C0C0',
        plotBorderWidth: 0,
        plotShadow: false,
        shadow: false,
        spacingBottom: null,
        spacingLeft: null,
        spacingRight: null,
        spacingTop: null,
        type: 'line',
        width: null
    };

    $scope.series = {
        name: 'series',
        color: getRandomColor(),
        last: 'series',
        counter: 1,
        added: false,
        type: 'default',
        num: 12,
        min: 20,
        max: 100,
    };

    $scope.lists = {
        bool: [true, false],
        chartTypes: ['bar', 
                     'line',
                     'area',
                     'areaspline',
                     'bubble',
                     'column',
                     'spline'],
        horizontal: ['center', 'right', 'left'],
        vertical: ['top','middle', 'bottom'],
        align: ['horizontal', 'vertical']
    };
    
    $scope.lists.chartTypesPlus = passByValue($scope.lists.chartTypes);
    $scope.lists.chartTypesPlus.push('default');

    $scope.legend = {
        align: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#909090',
        borderRadius: 0,
        borderWidth: 0,
        enabled: true,
        floating: false,
        itemDistance: 20,
        itemMarginBottom: 0,
        itemMarginTop: 0,
        itemWidth: null,
        labelFormat: '{name}',
        layout: 'horizontal',
        lineHeight: 16,
        margin: 15,
        maxHeight: null,
        padding: 8,
        reversed: false,
        rtl: false,
        shadow: false,
        symbolHeight: 12,
        symbolPadding: 5,
        symbolRadius: 5,
        symbolWidth: 16,        
        title: 'legend title',
        verticalAlign: 'bottom',
        width: null,
        x: 0,
        y: 0
    };

    $scope.positions = {
        horizontal: ['center', 'right', 'left'],
        vertical: ['top','middle', 'bottom'],
        align: ['horizontal', 'vertical'],
        chartTypes: ['bar', 
                     'line',
                     'area',
                     'areaspline',
                     'bubble',
                     'column',
                     'spline']
    };

	$scope.label = {
        title: 'Title',
        subtitle: 'subtitle',
        xAxis: 'x-axis',
        yAxis: 'y-axis'
    };

    //$scope.chart = {
    //    type: $scope.positions.chartTypes[0],
    //    animation: true
    //};

	$scope.chartConfig = {
        options: {
            chart: {},
            legend: {},
        },
        series: [{
            name: 'series', 
            data: getRandomData($scope.series.num,$scope.series.min,$scope.series.max),
            color: getRandomColor()
        }]        
    };

    $scope.json = {
        output: null
    };

    $scope.change = function(){
        $scope.chartConfig.options.chart = passByValue($scope.chart);  

        $scope.chartConfig.options.legend = passByValue($scope.legend);    

        $scope.json.output = JSON.stringify($scope.chartConfig, replacer, '\t');
    };

    $scope.change();

    $scope.seriesCheck = function(){
        if($scope.series.type === 'default'){
            return null;
        }else{
            return $scope.series.type;
        }
    };

    $scope.addSeries = function () {

        
        if($scope.series.name === $scope.series.last){

            if($scope.series.added){
                $scope.series.name = $scope.series.name.slice(0, -1) + $scope.series.counter;
            }else{
                $scope.series.name = $scope.series.name + $scope.series.counter;
            }

            $scope.series.last = $scope.series.name;
            $scope.series.counter += 1;
            $scope.series.added = true;

        }else{

            $scope.series.added = false;
            $scope.series.last = $scope.series.name;
            $scope.series.counter = 1;

        }

        $scope.chartConfig.series.push({

        	name: $scope.series.name,
        	color: $scope.series.color,
            data: getRandomData($scope.series.num,$scope.series.min,$scope.series.max),
            type: $scope.seriesCheck()

        });

        $scope.series.color = getRandomColor();

    };

    $scope.removeSeries = function () {
        $scope.chartConfig.series.pop();

        if($scope.series.added && $scope.series.counter > 0){
            $scope.series.counter -= 1;
        }
    };

    $scope.resetSeries = function(){
    	$scope.chartConfig.series = [];
        $scope.series.name = 'series';
        $scope.series.counter = 1;
    };

    $scope.applySelecter = function(){
    	angular.element('select').selecter();
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
            //replace: true,
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
            //replace: true,
            transclude: true,
            scope : {
                size: '=',
                title: '@'                               
            },
            templateUrl: 'views/partials/panelWrapper.html',
            link: function(scope) {
                scope['panel-' + scope.title] = true;

                //slide control
                scope.slideDown = function(id){
                    if(scope[id]){
                        angular.element('#' + id).slideDown();
                        scope[id] = false;
                    }else{
                        angular.element('#' + id).slideUp();
                        scope[id] = true;
                    }
                };
                //console.log(scope.size, scope.title);
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
})
.directive('setNull', function(){
    var def = {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attrs, ngModel) {
            elem.on('change', function() {
                scope.$watch(attrs.ngModel, function (value) {
                    if(value === ''){
                        console.log('Value is' + value);
                        ngModel.$setViewValue(null);
                    } 
                });
            });        
        }
    };

    return def;
})
.directive('colorPicker', function(){
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elem, attrs, ngModel) {
      //elem.
      if (!ngModel) {
        return;
      }
      ngModel.$render = function () {
        //elem.spectrum('set', ngModel.$viewValue || '#fff');
      };
      elem.on('change', function () {
        scope.$apply(function () {
          ngModel.$setViewValue(elem.val());
        });
      });
    }
  };
});