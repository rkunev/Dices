( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .factory( 'BoardModel', BoardModel );

    /** @ngInject */
    function BoardModel( ScoreSheetModel, PlayerModel, utilitiesService ) {
        function Board( _config ) {
            var config = _config || {};

            this.id = config.id || utilitiesService.generateId();
            this.scoreSheet = config.scoreSheet || new ScoreSheetModel();
            this.player = config.player || new PlayerModel();
        }

        /**
         * Checks if board is completed. Iterates through the cells in the ScoreSheet collection
         * and if any of the cells is not locked then the game is not over yet.
         *
         * @return {boolean}
         */
        Board.prototype.isCompleted = function() {
            var isCompleted = true;

            this.scoreSheet.cells.forEach( function( cell ) {
                if ( !cell.isLocked ) {
                    isCompleted = false;
                }
            });

            return isCompleted;
        };

        return Board;
    }

} )();
