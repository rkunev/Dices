( function() {
    'use strict';

    angular
        .module( 'dices' )
        .component( 'gameYatzy', {
            templateUrl: 'app/components/game/gameYatzy/gameYatzy.html',
            controller: GameYatzyController,
            controllerAs: 'vm',
            bindings: {
                players: '<'
            }
        } );

    /** @ngInject */
    function GameYatzyController( $state ) {
        var vm = this;

        if ( !vm.players.length ) {
            $state.go( 'game.new' );
        }
    }
} )();
