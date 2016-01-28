( function() {
    'use strict';

    var defaultPlayer = {
        name: 'Player1'
    };

    angular
        .module( 'dices.player' )
        .constant( 'defaultPlayer', defaultPlayer );
} )();
