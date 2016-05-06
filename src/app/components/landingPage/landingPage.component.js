( function() {
    'use strict';

    angular
        .module( 'dices' )
        .component( 'landingPage', {
            templateUrl: 'app/components/landingPage/landingPage.html',
            controller: AppRootController,
            controllerAs: 'vm'
        } );

    /** @ngInject */
    function AppRootController() {
        var vm = this;

        vm.creationDate = 1449843091733;
    }
} )();
