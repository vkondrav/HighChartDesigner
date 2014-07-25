'use strict';

angular.element('#canvas').highcharts({
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Test'
        },

        loading: false
    });