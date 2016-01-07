/* global Redux:false */
( function() {
    'use strict';

    angular
        .module( 'dices' )
        .service( 'appState', appState );

    /** @ngInject */
    function appState( counterReducer, rollReducer ) {
        var rootReducer = Redux.combineReducers( {
            counter: counterReducer.getReducer(),
            roll: rollReducer.getReducer()
        } );
        var store = Redux.createStore( rootReducer );

        var service = {
            getStore: getStore
        };

        return service;

        function getStore() {
            return store;
        }
    }

} )();
