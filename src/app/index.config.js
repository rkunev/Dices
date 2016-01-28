( function() {
    'use strict';

    angular
        .module( 'dices' )
        .config( config );

    /** @ngInject */
    function config( $logProvider ) {
        // Enable log
        $logProvider.debugEnabled( true );
    }
} )();
