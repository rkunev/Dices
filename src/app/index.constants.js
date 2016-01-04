/* global malarkey:false, moment:false */
( function() {
    'use strict';

    var gameRules = {
        DICE_COUNT: 5,
        MAX_ROLLS: 3
    };

    var notificationSettings = {
        POSITION: 'top right',
        DIALOG_TITLE: 'Caution!',
        DIALOG_TEXT_CONTENT: '',
        DIALOG_ARIA_LABEL: 'Caution Dialog',
        DIALOG_OK: 'OK! Got it.',
        DIALOG_CANCEL: 'Cancel'
    };

    angular
        .module( 'dices' )
        .constant( 'malarkey', malarkey )
        .constant( 'moment', moment )
        .constant( 'notificationSettings', notificationSettings )
        .constant( 'gameRules', gameRules );
} )();
