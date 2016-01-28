( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'MainController', MainController );

    /** @ngInject */
    function MainController( $timeout ) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1449843091733;

        activate();

        function activate() {
            $timeout( function() {
                vm.classAnimation = 'rubberBand';
            }, 4000 );
        }
    }
} )();
