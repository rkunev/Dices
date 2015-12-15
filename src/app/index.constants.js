/* global malarkey:false, moment:false */
( function() {
    'use strict';

    var gameRules = {
        diceCount: 5,
        maxRolls: 3
    };

    angular
        .module( 'dices' )
        .constant( 'malarkey', malarkey )
        .constant( 'moment', moment )
        .constant( 'gameRules', gameRules );

} )();
