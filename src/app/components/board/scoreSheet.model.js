( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .factory( 'ScoreSheetModel', ScoreSheetModel );

    /** @ngInject */
    function ScoreSheetModel( ScoreSheetCellModel, diceCombinations ) {
        function ScoreSheet( _tpl ) {
            var tpl = _tpl || {};

            // @fixme Cells as an array is not a good idea.
            // They should either be ordered (an array is not) or have a corresponding label.
            this.cells = getScoreSheetCells( tpl.cells );
            this.total = tpl.total || 0;
        }

        /**
         * Update the total points of the ScoreSheet. The total points
         * are the sum of all locked cells.
         *
         * @param  {Array} roll
         * @return {ScoreSheet}
         */
        ScoreSheet.prototype.updateTotal = function() {
            this.total = 0;

            this.cells.forEach( function( cell ) {
                if ( cell.isLocked ) {
                    this.total += cell.value;
                }
            }.bind( this ) );

            return this;
        };

        /**
         * Creates a fresh collection of ScoreSheetCells by the diceCombination set.
         * If existingCells is passed then their value and isLocked state are patched over.
         *
         * @param  {ScoreSheetCell[]} _cells
         * @return {ScoreSheetCell[]}
         */
        function getScoreSheetCells( _existingCells ) {
            var existingCells = angular.isArray( _existingCells ) ? _existingCells : [],
                cells = [];

            angular.forEach( diceCombinations, function( combination ) {
                var existingCell = getExistingCell( existingCells, combination.ID ) || {},
                    tpl = {
                        id: combination.ID,
                        value: existingCell.value || 0,
                        isLocked: existingCell.isLocked || false
                    };

                cells.push( new ScoreSheetCellModel( tpl ) );
            } );

            return cells;
        }

        /**
         * Find an existing cell from a collection of cells by it's id.
         * If there isn't such a cell then return undefined
         *
         * @param  {Array} cells
         * @param  {number} id
         * @return {(Object|null)}
         */
        function getExistingCell( cells, id ) {
            var cell = null;

            cells.forEach( function( c ) {
                if ( c.id === id ) {
                    cell = c;
                }
            } );

            return cell;
        }

        return ScoreSheet;
    }

} )();
