( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( routerConfig );

    /** @ngInject */
    function routerConfig( $stateProvider ) {
        $stateProvider
            .state( 'game', {
                url: '/game',
                template: '<game></game>',
                reload: true
            } );
    }
} )();
