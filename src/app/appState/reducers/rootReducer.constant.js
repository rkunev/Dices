/* global Redux:false */
( function() {
    'use strict';

    var reducers = {
        diceRoll: diceRoll
    };

    function diceRoll( state, action ) {
        if ( angular.isUndefined( state ) ) {
            state = {
                rollResult: [ 0, 0, 0, 0, 0 ],
                saveResult: false
            }
        }

        switch ( action.type ) {
            case 'DICE_ROLL':
                return angular.extend( {}, state, {
                    rollResult: action.rollResult
                } );
            case 'DICE_RESET':
                return angular.extend( {}, state, {
                    rollResult: [ 0, 0, 0, 0, 0 ]
                } );
            case 'BOARD_TURN_END':
                return angular.extend( {}, state, {
                    saveResult: action.saveResult
                } );
            default:
                return state;
        }
    }

    var rootReducer = Redux.combineReducers( reducers );

    angular
        .module( 'dices' )
        .constant( 'rootReducer', rootReducer );
} )();
