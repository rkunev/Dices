( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( routerConfig );

    /** @ngInject */
    function routerConfig( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.when('/game', '/game/new');

        $stateProvider
            .state( 'game', {
                url: '/game',
                template: '<game></game>',
                abstract: true
            } )
            .state( 'game.new', {
                url: '/new',
                template: '<manage-game-players players="vm.players"></manage-game-players>'
            } )
            .state( 'game.play', {
                url: '/play',
                template: '<game-yatzy layout="row" layout-wrap players="vm.players"></game-yatzy>'
            } );
    }
} )();
