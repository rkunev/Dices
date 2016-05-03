( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( routerConfig );

    /** @ngInject */
    function routerConfig( $stateProvider, $urlRouterProvider ) {
        $stateProvider
            .state( 'home', {
                url: '/',
                template: '<app-root></app-root>'
            } );

        $urlRouterProvider.otherwise( '/' );
    }

} )();
