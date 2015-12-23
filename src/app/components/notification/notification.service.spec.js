( function() {
    'use strict';

    describe( 'service notification', function() {
        var notification;

        beforeEach( module( 'dices' ) );
        beforeEach( inject( function( _notification_ ) {
            notification = _notification_;
        } ) );

        it( 'should be registered', function() {
            expect( notification )
                .not.toEqual( null );
        } );
    } );
} )();
