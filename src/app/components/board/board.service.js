( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .service( 'boardService', boardService );

    /** @ngInject */
    function boardService( BoardModel, scoreSheetService ) {
        this.isGameOver = isGameOver;
        this.generateBoardsFromPlayers = generateBoardsFromPlayers;
        this.updateBoardScoreSheetTotal = updateBoardScoreSheetTotal;
        this.updateBoardScoreSheetCellValues = updateBoardScoreSheetCellValues;
        this.getWinnerBoard = getWinnerBoard;


        function getWinnerBoard( boards ) {
            var bestResult = 0,
                winnerBoards = [];

            bestResult = boards
                .map( function( board ) {
                   return board.scoreSheet.total;
                } ).sort().shift();

            winnerBoards = boards.filter( function( board ) {
                return board.scoreSheet.total === bestResult;
            } );

            return winnerBoards[0];
        }

        function updateBoardScoreSheetTotal( boards ) {
            return boards.map( function( board ) {
                return new BoardModel( {
                    id: board.id,
                    scoreSheet: scoreSheetService.updateTotal( board.scoreSheet ),
                    player: board.player
                } );
            } )
        }

        /**
         * Generate a new collection of boards with filled scoresheets.
         *
         * @param  {Board[]} boards
         * @param  {Array}   roll
         * @return {Board[]}
         */
        function updateBoardScoreSheetCellValues( boards, roll ) {
            return boards.map( function( board ) {
                return new BoardModel( {
                    id: board.id,
                    scoreSheet: scoreSheetService.updateUnlockedCellValues( board.scoreSheet, roll ),
                    player: board.player
                } );
            } );
        }

        /**
         * Create a new Board object for each provided player.
         *
         * @param  {Player[]} players A collection of Player models
         * @return {(Board[]|Array)}  Returns a collection of Board models.
         *                            If the players param is not passed then it
         *                            will return an empty collection.
         */
        function generateBoardsFromPlayers( players ) {
            return angular.isArray( players ) ? players.map( generateSingleBoard ) : [];
        }

        /**
         * Wrapper function over creating a new Board model.
         *
         * @param  {Board|Object} tpl Can be either an existing Board or a POJO.
         * @return {Board}
         */
        function generateSingleBoard( tpl ) {
            return new BoardModel( {
                player: tpl
            } );
        }

        /**
         * Checks if all boards are completed. Iterates through the Board collection and
         * if any of the boards are not completed then the game is not over yet.
         * @fixme isCompleted should not be true if any of the players are tied
         *
         * @param  {Board[]} board A collection of Board models
         * @return {boolean}
         */
        function isGameOver( boards ) {
            var isGameOver = true;

            boards.forEach( function( board ) {
                if ( !board.isCompleted() ) {
                    isGameOver = false;
                }
            });

            return isGameOver;
        }
    }
} )();
