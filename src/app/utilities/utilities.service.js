( function() {
    'use strict';

    angular
        .module( 'dices.utilities' )
        .service( 'utilitiesService', utilitiesService );

    /** @ngInject */
    function utilitiesService() {
        this.splicePair = splicePair;
        this.countInArray = countInArray;
        this.hasDuplicates = hasDuplicates;
        this.getArraySum = getArraySum;
        this.arrayContains = arrayContains;
        this.generateId = generateId;

        /**
         * Generates a random rfc4122 version 4 UUID.
         * @see http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
         *
         * @return {string}
         */
        function generateId() {
            var uuidv4 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8 );

                return v.toString(16);
            });

            return uuidv4;
        }

        /**
         * Checks if the given array contains the searched value.
         *
         * @param  {Array} array
         * @param  {Any}   what
         * @return {boolean}
         */
        function arrayContains( arr, what ) {
            return arr.indexOf( what ) > -1;
        }

        /**
         * From the sorted array get the first pair of dice.
         * @fixme This will lead to unexpected results when there are multiple pairs.
         * @todo Abstract the fn to not mutate the provided array and not expect a sorted array as input
         *
         * @param  {Array} sortedRoll
         * @return {Array}            An array of pairs with fixed length of two
         */
        function splicePair( sortedRoll ) {
            var pairs = [];

            for ( var i = 0; i < sortedRoll.length - 1; i++ ) {
                if ( sortedRoll[ i ] === sortedRoll[ i + 1 ] ) {
                    pairs = sortedRoll.splice( i, 2 );
                }
            }

            return pairs;
        }

        /**
         * Find how many occurrences are there of the searched item in the array.
         *
         * @param  {Array} array
         * @param  {Any}   what
         * @return {number}
         */
        function countInArray( arr, what ) {
            var count = 0;

            for ( var i = 0; i < arr.length; i++ ) {
                if ( arr[ i ] === what ) {
                    count++;
                }
            }

            return count;
        }

        /**
         * Check if the provided array contains duplicates.
         *
         * @param  {Array}   arr
         * @return {boolean}
         */
        function hasDuplicates( arr ) {
            var sorted_arr = arr.slice().sort(),
                hasDuplicate = false;

            for ( var i = 0; i < sorted_arr.length - 1; i++ ) {
                if ( sorted_arr[ i + 1 ] == sorted_arr[ i ] ) {
                    hasDuplicate = true;
                    break;
                }
            }

            return hasDuplicate;
        }

        /**
         * Returns the sum of all numbers in the array.
         *
         * @param  {Array}  arr
         * @return {number}
         */
        function getArraySum( arr ) {
            return arr.reduce( function( prev, next ) {
                return prev + next;
            } );
        }
    }
} )();
