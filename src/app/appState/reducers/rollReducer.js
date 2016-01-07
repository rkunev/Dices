/* global Redux:false */
( function() {
    'use strict';

    angular
        .module( 'dices' )
        .service( 'rollReducer', rollReducer );

    /** @ngInject */
    function rollReducer() {
        var store = Redux.createStore( roll );

        var service = {
            getReducer: getReducer,
            getStore: getStore
        };

        return service;

        function getReducer() {
            return roll;
        }

        function getStore() {
            return store;
        }

        function roll( state, action ) {
            state = state || 'nothing has happened';

            switch ( action.type ) {
                case 'DICE':
                    return 'The dice were rolled'
                case 'PEN':
                    return 'The pen was thrown'
                default:
                    return state
            }
        }
    }

} )();
