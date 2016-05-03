( function() {
    'use strict';

    angular
        .module( 'dices' )
        .directive( 'navbar', navbarDirective );

    /** @ngInject */
    function navbarDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {
                creationDate: '='
            },
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NavbarController( $mdSidenav, moment, playerService ) {
            var vm = this;

            // "vm.creation" is avaible by directive option "bindToController: true"
            vm.relativeDate = moment( vm.creationDate ).fromNow();
            vm.toggleSidenav = toggleSidenav;

            vm.players = playerService.getPlayers();
            vm.currentPlayer = playerService.getLastPlayedPlayer();
            vm.saveCurrentPlayer = saveCurrentPlayer;

            function saveCurrentPlayer() {
                playerService.savePlayer( vm.currentPlayer );
                vm.players = playerService.getPlayers();
            }

            function toggleSidenav( sidenavId ) {
                $mdSidenav( sidenavId ).toggle();
            }

        }
    }

} )();
