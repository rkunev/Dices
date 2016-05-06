( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .factory( 'ScoreSheetCellModel', ScoreSheetCellModel );

    /** @ngInject */
    function ScoreSheetCellModel() {
        function ScoreSheetCell( _tpl ) {
            var tpl = _tpl || {};

            // @todo Can this be done without throwing an error?
            if ( !tpl.id ) {
                throw new Error( 'ScoreSheetCellModel: cannot create a new cell with an id of ' + tpl.id );
            }

            this.id = tpl.id;
            this.isLocked = tpl.isLocked || false;
            this.value = tpl.value || 0;
        }

        return ScoreSheetCell;
    }

} )();
