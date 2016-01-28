( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( config );

    /** @ngInject */
    function config( $provide, $logProvider ) {
        // Enable log
        $logProvider.debugEnabled( true );

        $provide.decorator( '$state', function( $delegate, $stateParams ) {
            $delegate.forceReload = function() {
                return $delegate.go( $delegate.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                } );
            };
            return $delegate;
        } );
    }
} )();
