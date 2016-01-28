( function() {
    'use strict';

    angular
        .module( 'dices' )
        .directive( 'yatzySign', yatzySign );

    /** @ngInject */
    function yatzySign() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/yatzySign/yatzySign.html'
        };

        return directive;
    }
} )();
