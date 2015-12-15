( function() {
    'use strict';

    describe( 'service diceEngine', function() {
        var diceEngine;

        beforeEach( module( 'dices' ) );
        beforeEach( inject( function( _diceEngine_ ) {
            diceEngine = _diceEngine_;
        } ) );

        it( 'should exist', function() {
            expect( diceEngine )
                .toBeDefined();
        } );

        describe( 'rolledTimes variable', function() {
            it( 'should exist', function() {
                expect( diceEngine.rolledTimes )
                    .toBeDefined();
            } );

            it( 'should be a number', function() {
                expect( diceEngine.rolledTimes )
                    .toEqual( jasmine.any( Number ) );
            } );
        } );

        describe( 'rollDice function', function() {
            it( 'should exist', function() {
                expect( diceEngine.rollDice )
                    .toBeDefined();
            } );

            it( 'should return a number', function() {
                expect( diceEngine.rollDice() )
                    .toEqual( jasmine.any( Number ) );
            } );

            it( 'should return an integer greater than 0 and smaller than 7', function() {
                var result = diceEngine.rollDice();

                expect( result )
                    .toBeGreaterThan( 0 );
                expect( result )
                    .not.toBeGreaterThan( 7 );
            } );
        } );

        describe( 'canRoll function', function() {
            it( 'should exist', function() {
                expect( diceEngine.canRoll )
                    .toBeDefined();
            } );

            it( 'should return a boolean', function() {
                expect( typeof diceEngine.canRoll() )
                    .toEqual( 'boolean' );
            } );
        } );

        describe( 'incrementRollCounter function', function() {
            it( 'should increment rolledTimes counter', function() {
                var rolledTimes = diceEngine.rolledTimes;
                diceEngine.incrementRollCounter();

                expect( diceEngine.rolledTimes )
                    .toEqual( rolledTimes + 1 );
            } );
        } );

        describe( 'resetRollCounter function', function() {
            it( 'should reset rolledTimes counter to 0', function() {
                diceEngine.resetRollCounter();

                expect( diceEngine.rolledTimes )
                    .toBe( 0 );
            } );
        } );
    } );
} )();
