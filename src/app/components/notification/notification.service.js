( function() {
    'use strict';

    angular
        .module( 'dices' )
        .service( 'notification', notification );

    /** @ngInject */
    function notification( $mdToast, $log, $document, notificationSettings ) {
        var settings = notificationSettings;
        var service = {
            error: error,
            // info: info,
            // success: success,
            // warning: warning,

            log: log
        };

        return service;

        function error( message ) {
            $mdToast.show( {
                controller: 'NotificationController',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 3000,
                position: settings.POSITION,
                message: message
            } );
        }

        function log( message, data ) {
            $log.log( 'Log: ' + message, data );
        }
    }

} )();
