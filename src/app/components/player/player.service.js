( function() {
    'use strict';

    angular
        .module( 'dices.player' )
        .service( 'playerService', playerService );

    /** @ngInject */
    function playerService( localStorageService, notificationService, defaultPlayer ) {
        this.savePlayer = savePlayer;
        this.getPlayers = getPlayers;
        this.getLastPlayedPlayer = getLastPlayedPlayer;
        this.playerExists = playerExists;
        this.createPlayer = createPlayer;
        this.updatePlayer = updatePlayer;
        this.removePlayers = removePlayers;

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
                notificationService.success( '"' + player.name + '" created' );
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

            notificationService.success( '"' + player.name + '" created' );
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
