( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( config );

    /** @ngInject */
    function config( localStorageServiceProvider ) {
        localStorageServiceProvider
            .setPrefix( 'dices' );
    }
} )();
