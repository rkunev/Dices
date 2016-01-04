( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( routerConfig );

    /** @ngInject */
    function routerConfig( $stateProvider ) {
        $stateProvider
            .state( 'about', {
                url: '/about',
                templateUrl: 'app/about/about.html',
                controller: 'AboutController',
                controllerAs: 'vm',
                reload: true
            } );
    }
} )();
