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
                label: 'Ones',
                value: 0,
                isLocked: false
            },
            twos: {
                id: 2,
                label: 'Twos',
                value: 0,
                isLocked: false
            },
            threes: {
                id: 3,
                label: 'Threes',
                value: 0,
                isLocked: false
            },
            fours: {
                id: 4,
                label: 'Fours',
                value: 0,
                isLocked: false
            },
            fives: {
                id: 5,
                label: 'Fives',
                value: 0,
                isLocked: false
            },
            sixes: {
                id: 6,
                label: 'Sixes',
                value: 0,
                isLocked: false
            },
            onePair: {
                id: 7,
                label: '1 Pair',
                value: 0,
                isLocked: false
            },
            twoPairs: {
                id: 8,
                label: '2 Pairs',
                value: 0,
                isLocked: false
            },
            threeOfAKind: {
                id: 9,
                label: '3 of a Kind',
                value: 0,
                isLocked: false
            },
            fourOfAKind: {
                id: 10,
                label: '4 of a Kind',
                value: 0,
                isLocked: false
            },
            smallStraight: {
                id: 11,
                label: 'Small Straight',
                value: 0,
                isLocked: false
            },
            largeStraight: {
                id: 12,
                label: 'Large Straight',
                value: 0,
                isLocked: false
            },
            fullHouse: {
                id: 13,
                label: 'Full House',
                value: 0,
                isLocked: false
            },
            yatzy: {
                id: 14,
                label: 'Yatzy',
                value: 0,
                isLocked: false
            },
            chance: {
                id: 15,
                label: 'Chance',
                value: 0,
                isLocked: false
            }
        };

        vm.saveResult = saveResult;

        // var unsubscribe = $ngRedux.subscribe( function() {
        //     var state = $ngRedux.getState(),
        //         rollResult = state.diceRoll.rollResult;

        //     console.log( 'handleDiceRoll:', rollResult );

        //     angular.forEach( vm.boardResults, function( res ) {
        //         if ( !res.isLocked ) {
        //             res.value = board.calculateResult( rollResult, res.id );
        //         }
        //     } );

        //     vm.boardTotal = board.sumResults( vm.boardResults );
        // } );

        // $scope.$on( '$destroy', unsubscribe );

        // var unsubscribe = $ngRedux.connect( handleDiceRoll )( vm );
        // $scope.$on( '$destroy', unsubscribe );

        // function handleDiceRoll( state ) {
        //     return state;
        // }

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

            // $ngRedux.dispatch( {
            //     type: 'BOARD_TURN_END',
            //     saveResult: true
            // } );
            $scope.$broadcast( 'dices.saveResult' );
        }
    }
} )();
