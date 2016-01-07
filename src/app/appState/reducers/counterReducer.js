/* global Redux:false */
( function() {
    'use strict';

    angular
        .module( 'dices' )
        .service( 'counterReducer', counterReducer );

    /** @ngInject */
    function counterReducer() {
        var store = Redux.createStore( counter );

        var service = {
            getReducer: getReducer,
            getStore: getStore
        };

        return service;

        function getReducer() {
            return counter;
        }

        function getStore() {
            return store;
        }

        function counter( state, action ) {
            state = state || 0;

            switch ( action.type ) {
                case 'INCREMENT':
                    return state + 1
                case 'DECREMENT':
                    return state - 1
                default:
                    return state
            }
        }
    }

} )();
