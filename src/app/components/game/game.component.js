( function() {
    'use strict';

    angular
        .module( 'dices' )
        .component( 'game', {
            templateUrl: 'app/components/game/game.html',
            controller: GameController,
            controllerAs: 'vm'
        } );

    /** @ngInject */
    function GameController() {
        var vm = this;

        vm.creationDate = 1449843091733;
    }
} )();
