( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'MainController', MainController );

    /** @ngInject */
    function MainController( $timeout, webDevTec ) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1449843091733;

        activate();

        function activate() {
            getWebDevTec();
            $timeout( function() {
                vm.classAnimation = 'rubberBand';
            }, 4000 );
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach( vm.awesomeThings, function( awesomeThing ) {
                awesomeThing.rank = Math.random();
            } );
        }
    }
} )();
