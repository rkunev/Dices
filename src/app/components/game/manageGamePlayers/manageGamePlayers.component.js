( function() {
    'use strict';

    angular
        .module( 'dices.player' )
        .component( 'manageGamePlayers', {
            templateUrl: 'app/components/game/manageGamePlayers/manageGamePlayers.html',
            controller: ManageGamePlayersController,
            controllerAs: 'vm',
            bindings: {
                players: '='
            }
        } );

    /** @ngInject */
    function ManageGamePlayersController() {
        var vm = this;

        vm.addPlayer = addPlayer;
        vm.removePlayer = removePlayer;

        function addPlayer() {
            // @fixme use a player service/model
            vm.players.push( {
                id: Math.random() * 10000 + '-' + vm.newPlayer,
                name: vm.newPlayer
            } );

            vm.newPlayer = '';
        }

        function removePlayer( player ) {
            // @fixme use a player service/model
            vm.players = vm.players.filter( function( p ) {
                return p.id !== player.id;
            } );
        }
    }
} )();
