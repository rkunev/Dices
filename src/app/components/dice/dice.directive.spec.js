( function() {
    'use strict';

    describe( 'directive dice', function() {
        var vm;
        var el;

        beforeEach( module( 'dices' ) );
        beforeEach( inject( function( $compile, $rootScope ) {
            el = angular.element( '<dice></dice>' );

            $compile( el )( $rootScope.$new() );
            $rootScope.$digest();
            vm = el.isolateScope()
                .vm;
        } ) );

        it( 'should be compiled', function() {
            expect( el.html() )
                .not.toEqual( null );
        } );

        it( 'should give the player a chance to roll the dice', function() {
            expect( vm.canRoll )
                .toEqual( true );
        } );

        it( 'should report an error after the third roll', function() {
            for ( var i = 1; i <= 10000; i++ ) {
                vm.rollDice();

                if ( i === 4 ) {
                    expect( vm.diceResult )
                        .toBeUndefined();
                }

                if ( i === 10000 ) {
                    expect( vm.diceResult )
                        .toBeUndefined();
                }
            }
        } );
    } );
} )();
