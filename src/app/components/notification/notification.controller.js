( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'NotificationController', NotificationController );

    /** @ngInject */
    function NotificationController( $scope, $mdToast, message ) {
        var vm = this;

        vm.closeToast = closeToast;
        vm.message = message;

        function closeToast() {
            $mdToast.hide();
        }
    }
} )();
