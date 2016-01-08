( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'AboutController', AboutController );

    /** @ngInject */
    function AboutController( $scope, notification, player, board, BoardModel ) {
        var vm = this;

        vm.creationDate = 1449843091733;
        vm.players = player.getPlayers();
        vm.currentPlayer = player.getLastPlayedPlayer();
        vm.saveCurrentPlayer = saveCurrentPlayer;

        vm.boardTotal = 0;
        vm.boardResults = new BoardModel();
        vm.saveResult = saveResult;

        $scope.$on( 'dices.roll', function( event, rollResult ) {
            angular.forEach( vm.boardResults, function( res ) {
                if ( !res.isLocked ) {
                    res.value = board.calculateResult( rollResult, res.id );
                }
            } );

            vm.boardTotal = board.sumResults( vm.boardResults );
        } );

        function saveCurrentPlayer() {
            player.savePlayer( vm.currentPlayer );
            vm.players = player.getPlayers();
        }

        function saveResult( result ) {
            angular.forEach( vm.boardResults, function( res, i ) {
                if ( res.id === result.id ) {
                    vm.boardResults[ i ].isLocked = true;
                }
            } );

            $scope.$broadcast( 'dices.saveResult' );
        }
    }
} )();
