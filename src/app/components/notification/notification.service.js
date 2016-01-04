( function() {
    'use strict';

    angular
        .module( 'dices' )
        .service( 'notification', notification );

    /** @ngInject */
    function notification( $mdToast, $mdDialog, $log, $document, notificationSettings ) {
        var currentToast;
        var currentDialog;
        var service = {
            error: error,
            info: info,
            success: success,
            warning: warning,

            log: log,
            clearActiveNotification: clearActiveNotification,
            showAlert: showAlert,
            showConfirm: showConfirm
        };

        return service;

        function error( message ) {
            $mdToast.show( {
                controller: 'NotificationController',
                controllerAs: 'vm',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 10000,
                position: notificationSettings.POSITION,
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
                position: notificationSettings.POSITION,
                message: message
            } );
        }

        function success( message ) {
            currentToast = $mdToast.show( {
                controller: 'NotificationController',
                controllerAs: 'vm',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 1500,
                position: notificationSettings.POSITION,
                message: message
            } );
        }

        function warning( message ) {
            $mdToast.show( {
                controller: 'NotificationController',
                controllerAs: 'vm',
                templateUrl: 'app/components/notification/notification-template.html',
                parent: $document.body,
                hideDelay: 10000,
                position: notificationSettings.POSITION,
                message: message
            } );
        }

        /**
         * Log debug information to console
         *
         * @param  {String} message Message to display before the data
         * @param  {Mixed} data     Anything that can be logged in the console
         * @return {void}
         */
        function log( message, data ) {
            $log.log( 'Log: ' + message, data );
        }

        /**
         * Get the last returned promise from an active toast and reject it
         *
         * @return {void}
         */
        function clearActiveNotification() {
            $mdToast.hide( currentToast );
        }

        /**
         * Show a modal dialog with a message. If event is passed
         * then the dialog animation will start from the clicked location
         *
         * @link https://material.angularjs.org/latest/api/service/$mdDialog
         * @param  {Object} event   The event object
         * @param  {Object} options Dialog preset. See @link for all preset options
         * @return {Promise}        A promise that can be resolved
         */
        function showAlert( event, options ) {
            currentDialog = $mdDialog.show(
                $mdDialog.alert()
                    .title( options.title || notificationSettings.DIALOG_TITLE )
                    .textContent( options.textContent || notificationSettings.DIALOG_TEXT_CONTENT )
                    .ariaLabel( options.ariaLabel || notificationSettings.DIALOG_ARIA_LABEL )
                    .ok( options.ok || notificationSettings.DIALOG_OK )
                    .clickOutsideToClose( true )
                    .targetEvent( event )
            );

            return currentDialog;
        }

        /**
         * Show a modal dialog with a message. If event is passed
         * then the dialog animation will start from the clicked location.
         * Use returned promise to resolve user's action (ok/cancel)
         *
         * @link https://material.angularjs.org/latest/api/service/$mdDialog
         * @param  {Object} event   The event object
         * @param  {Object} options Dialog preset. See @link for all preset options
         * @return {Promise}        A promise that can be resolved
         */
        function showConfirm( event, options ) {
            currentDialog = $mdDialog.show(
                $mdDialog.confirm()
                    .title( options.title || notificationSettings.DIALOG_TITLE )
                    .textContent( options.textContent || notificationSettings.DIALOG_TEXT_CONTENT )
                    .ariaLabel( options.ariaLabel || notificationSettings.DIALOG_ARIA_LABEL )
                    .ok( options.ok || notificationSettings.DIALOG_OK )
                    .cancel( options.cancel || notificationSettings.DIALOG_CANCEL )
                    .clickOutsideToClose( true )
                    .targetEvent( event )
            );

            return currentDialog;
        }
    }

} )();
