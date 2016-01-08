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
