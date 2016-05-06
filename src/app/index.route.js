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
                template: '<landing-page></landing-page>'
            } );

        $urlRouterProvider.otherwise( '/' );
    }

} )();
