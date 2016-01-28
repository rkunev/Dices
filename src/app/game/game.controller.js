( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'GameController', GameController );

    /** @ngInject */
    function GameController( $scope, notification, player ) {
        var vm = this;

        vm.creationDate = 1449843091733;
        vm.players = player.getPlayers();
        vm.currentPlayer = player.getLastPlayedPlayer();
        vm.saveCurrentPlayer = saveCurrentPlayer;

        function saveCurrentPlayer() {
            player.savePlayer( vm.currentPlayer );
            vm.players = player.getPlayers();
        }
    }
} )();
