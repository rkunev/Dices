( function() {
    'use strict';

    angular
        .module( 'dices' )
        .component( 'appRoot', {
            templateUrl: 'app/components/appRoot/appRoot.html',
            controller: AppRootController,
            controllerAs: 'vm'
        } );

    /** @ngInject */
    function AppRootController() {
        var vm = this;

        vm.creationDate = 1449843091733;
    }
} )();
