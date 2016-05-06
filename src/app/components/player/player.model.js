( function() {
    'use strict';

    angular
        .module( 'dices.player' )
        .factory( 'PlayerModel', PlayerModel );

    /** @ngInject */
    function PlayerModel( utilitiesService, defaultPlayer ) {
        function Player( _config ) {
            var config = _config || {};

            this.id = config.id || utilitiesService.generateId();
            this.name = config.name || defaultPlayer.name;
        }

        return Player;
    }
} )();
