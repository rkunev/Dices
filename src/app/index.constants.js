/* global malarkey:false, moment:false */
( function() {
    'use strict';

    var gameRules = {
        DICE_COUNT: 5,
        MAX_ROLLS: 3
    };

    var notificationSettings = {
        POSITION: 'top right'
    }

    angular
        .module( 'dices' )
        .constant( 'malarkey', malarkey )
        .constant( 'moment', moment )
        .constant( 'notificationSettings', notificationSettings )
        .constant( 'gameRules', gameRules );
} )();
