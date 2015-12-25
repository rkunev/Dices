( function() {
    'use strict';

    angular
        .module( 'dices' )
        .service( 'notification', notification );

    /** @ngInject */
    function notification( $mdToast, $log, $document, notificationSettings ) {
        var currentToast;
        var settings = notificationSettings;
        var service = {
            error: error,
            info: info,
            success: success,
            warning: warning,

            log: log,
            clearActiveNotification: clearActiveNotification
        };

        return service;

        function error( message ) {
            $mdToast.show( {
                controller: 'NotificationController',
                controllerAs: 'vm',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 10000,
                position: settings.POSITION,
                message: message
            } );
        }

        function info( message ) {
            $mdToast.show( {
                controller: 'NotificationController',
                controllerAs: 'vm',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 10000,
                position: settings.POSITION,
                message: message
            } );
        }

        function success( message ) {
            currentToast = $mdToast.show( {
                controller: 'NotificationController',
                controllerAs: 'vm',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 10000,
                position: settings.POSITION,
                message: message
            } );
        }

        function warning( success ) {
            $mdToast.show( {
                controller: 'NotificationController',
                controllerAs: 'vm',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 10000,
                position: settings.POSITION,
                message: message
            } );
        }

        /**
         * Log debug information to console
         * @param  {String} message Message to display before the data
         * @param  {Mixed} data       Anything that can be logged in the console
         * @return {void}
         */
        function log( message, data ) {
            $log.log( 'Log: ' + message, data );
        }

        /**
         * Gets the last returned promise from an active toast and rejects it
         * @return {void}
         */
        function clearActiveNotification() {
            $mdToast.hide( currentToast );
        }
    }

} )();
