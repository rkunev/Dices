( function() {
    'use strict';

    angular
        .module( 'dices.player' )
        .service( 'player', player );

    /** @ngInject */
    function player( localStorageService, notification, defaultPlayer ) {
        var service = {
            savePlayer: savePlayer,
            getPlayers: getPlayers,
            getLastPlayedPlayer: getLastPlayedPlayer,
            playerExists: playerExists,
            createPlayer: createPlayer,
            updatePlayer: updatePlayer,
            removePlayers: removePlayers
        };

        return service;

        function getLastPlayedPlayer() {
            var players = localStorageService.get( 'players' ) || [ defaultPlayer ];

            return players[ players.length - 1 ];
        }

        function savePlayer( player ) {
            if ( this.playerExists( player ) ) {
                this.updatePlayer( player );
            } else {
                this.createPlayer( player );
            }
        }

        function createPlayer( player ) {
            var players = this.getPlayers() || [];

            if ( player.name ) {
                players.push( player );
                localStorageService.set( 'players', players );
                notification.success( '"' + player.name + '" created' );
            }
        }

        function updatePlayer( player ) {
            var players = this.getPlayers();

            angular.forEach( players, function( p, i ) {
                /** @todo: Use player id instead of name */
                if ( p.name === player.name ) {
                    players.splice( i, 1 );
                    players.push( p );
                }
            } );

            notification.success( '"' + player.name + '" created' );
            localStorageService.set( 'players', players );
        }

        function playerExists( player ) {
            var players = this.getPlayers() || [],
                playerExists = false;

            playerExists = players.some( function( p ) {
                return player.name === p.name;
            } );

            return playerExists;
        }

        function getPlayers() {
            return localStorageService.get( 'players' );
        }

        function removePlayers() {
            localStorageService.set( 'players', [] );
        }
    }

} )();
