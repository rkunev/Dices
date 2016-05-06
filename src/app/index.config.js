( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( indexConfig );

    /** @ngInject */
    function indexConfig( $provide ) {
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
