( function() {
    'use strict';

    angular
        .module( 'dices' )
        .controller( 'GameController', GameController );

    /** @ngInject */
    function GameController() {
        var vm = this;

        vm.creationDate = 1449843091733;
    }
} )();
