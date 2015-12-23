( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'AboutController', AboutController );

    /** @ngInject */
    function AboutController( notification ) {
        var vm = this;

        vm.creationDate = 1449843091733;
        vm.title = 'Hi from About.html';
        vm.description = 'Static text from AboutController';
        vm.showError = showError;

        function showError() {
            notification.error( 'Toast title!' );
        }
    }
} )();
