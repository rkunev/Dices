( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'AboutController', AboutController );

    /** @ngInject */
    function AboutController( $scope, notification, player, board ) {
        var vm = this;

        vm.creationDate = 1449843091733;
        vm.players = player.getPlayers();
        vm.currentPlayer = player.getLastPlayedPlayer();
        vm.saveCurrentPlayer = saveCurrentPlayer;

        vm.boardTotal = 0;
        vm.boardResults = {
            ones: {
                id: 1,
                label: '1x5',
                value: 0,
                isLocked: false
            },
            twos: {
                id: 2,
                label: '2x5',
                value: 0,
                isLocked: false
            },
            threes: {
                id: 3,
                label: '3x5',
                value: 0,
                isLocked: false
            },
            fours: {
                id: 4,
                label: '4x5',
                value: 0,
                isLocked: false
            },
            fives: {
                id: 5,
                label: '5x5',
                value: 0,
                isLocked: false
            },
            sixes: {
                id: 6,
                label: '6x5',
                value: 0,
                isLocked: false
            }
        };

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
