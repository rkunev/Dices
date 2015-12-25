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
        vm.log = log;
        vm.success = success;
        vm.clearActiveNotification = clearActiveNotification;

        function showError() {
            notification.error( 'Toast title!' );
        }

        function log( message ) {
            notification.log( message );
        }

        function success( message ) {
            notification.success( message );
        }

        function clearActiveNotification() {
            notification.clearActiveNotification();
        }
    }
} )();
