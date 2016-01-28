( function() {
    'use strict';

    angular
        .module( 'dices' )
        .directive( 'acmeNavbar', acmeNavbar );

    /** @ngInject */
    function acmeNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {
                creationDate: '=',
                currentPlayer: '='
            },
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NavbarController( $mdSidenav, moment, player ) {
            var vm = this;

            // "vm.creation" is avaible by directive option "bindToController: true"
            vm.relativeDate = moment( vm.creationDate ).fromNow();
            vm.toggleSidenav = toggleSidenav;

            vm.players = player.getPlayers();
            vm.currentPlayer = player.getLastPlayedPlayer();
            vm.saveCurrentPlayer = saveCurrentPlayer;

            function saveCurrentPlayer() {
                player.savePlayer( vm.currentPlayer );
                vm.players = player.getPlayers();
            }

            function toggleSidenav( sidenavId ) {
                $mdSidenav( sidenavId ).toggle();
            }

        }
    }

} )();
