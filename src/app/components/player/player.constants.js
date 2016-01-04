( function() {
    'use strict';

    var defaultPlayer = {
        name: 'Loser'
    };

    angular
        .module( 'dices.player' )
        .constant( 'defaultPlayer', defaultPlayer );
} )();
