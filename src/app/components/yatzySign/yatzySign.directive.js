( function() {
    'use strict';

    angular
        .module( 'dices' )
        .directive( 'yatzySign', yatzySignDirective );

    /** @ngInject */
    function yatzySignDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/yatzySign/yatzySign.html'
        };

        return directive;
    }
} )();
