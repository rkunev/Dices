( function() {
    'use strict';

    angular.module( 'dices', [
        'dices.player',
        'dices.board',
        'dices.utilities',
        'ngAnimate',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        'ui.router',
        'ngMaterial',
        'LocalStorageModule',
        'toastr'
    ] );
} )();
