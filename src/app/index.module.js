( function() {
    'use strict';

    angular
        .module( 'dices', [
            'dices.player',
            'dices.board',
            'ngAnimate',
            'ngSanitize',
            'ngMessages',
            'ngAria',
            'restangular',
            'ui.router',
            'ngMaterial',
            'LocalStorageModule',
            'toastr'
        ] );
} )();
