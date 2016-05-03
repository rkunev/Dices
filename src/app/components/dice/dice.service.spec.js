( function() {
    'use strict';

    describe( 'service diceService', function() {
        var diceService;

        beforeEach( module( 'dices' ) );
        beforeEach( inject( function( _diceService_ ) {
            diceService = _diceService_;
        } ) );

        it( 'should exist', function() {
            expect( diceService )
                .toBeDefined();
        } );

        describe( 'roll function', function() {
            it( 'should exist', function() {
                expect( diceService.roll )
                    .toBeDefined();
            } );

            it( 'should return a number', function() {
                expect( diceService.roll() )
                    .toEqual( jasmine.any( Number ) );
            } );

            it( 'should return an integer greater than 0 and smaller than 7', function() {
                var result = diceService.roll();

                expect( result )
                    .toBeGreaterThan( 0 );
                expect( result )
                    .not.toBeGreaterThan( 7 );
            } );
        } );

        describe( 'canRoll function', function() {
            it( 'should exist', function() {
                expect( diceService.canRoll )
                    .toBeDefined();
            } );

            it( 'should return a boolean', function() {
                expect( typeof diceService.canRoll() )
                    .toEqual( 'boolean' );
            } );
        } );
    } );
} )();
