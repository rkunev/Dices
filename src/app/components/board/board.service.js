( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .service( 'boardService', boardService );

    /** @ngInject */
    function boardService( utilityService, diceCombinations ) {
        this.calculateResult = calculateResult;
        this.saveResult = saveResult;
        this.isGameOver = isGameOver;
        this.sumResults = sumResults;

        /**
         * Calculates the points from the saved board entries.
         * @todo  Can be done from the BoardModel as a separate method + field.
         *
         * @param  {Board}  board
         * @return {number}
         */
        function sumResults( board ) {
            var result = 0;

            angular.forEach( board, function( res ) {
                if ( res.isLocked ) {
                    result += res.value;
                }
            } );

            return result;
        }

        /**
         * Given the roll and the combination will calculate the possible result.
         * An entry point for calculating any dice result.
         *
         * @param  {Array}  roll
         * @param  {number} combinationId The combination Id from the board constants
         * @return {number}
         */
        function calculateResult( roll, combinationId ) {
            var result = 0;

            switch ( combinationId ) {
                case diceCombinations.ONES.ID:
                case diceCombinations.TWOS.ID:
                case diceCombinations.THREES.ID:
                case diceCombinations.FOURS.ID:
                case diceCombinations.FIVES.ID:
                case diceCombinations.SIXES.ID:
                    result = calculateOneOfAKind( roll, combinationId );
                    break;
                case diceCombinations.ONE_PAIR.ID:
                    result = calculateOnePair( roll );
                    break;
                case diceCombinations.TWO_PAIRS.ID:
                    result = calculateTwoPairs( roll );
                    break;
                case diceCombinations.THREE_OF_A_KIND.ID:
                    result = calculateSameOfAKind( roll, 3 );
                    break;
                case diceCombinations.FOUR_OF_A_KIND.ID:
                    result = calculateSameOfAKind( roll, 4 );
                    break;
                case diceCombinations.SMALL_STRAIGHT.ID:
                case diceCombinations.LARGE_STRAIGHT.ID:
                    result = calculateStraight( roll, combinationId );
                    break;
                case diceCombinations.FULL_HOUSE.ID:
                    result = calculateFullHouse( roll );
                    break;
                case diceCombinations.YATZY.ID:
                    result = calculateYatzy( roll );
                    break;
                case diceCombinations.CHANCE.ID:
                    result = utilityService.getArraySum( roll );
                    break;
                default:
                    console.warn( 'No such combination' );
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there are duplicate dice for the given kind.
         * Returns the sum of the found duplicate dice.
         *
         * @param  {Array}  roll
         * @param  {number} kind       Which duplicates to find (1, 2, 3, 4, 5 or 6)
         * @return {number}
         */
        function calculateOneOfAKind( roll, kind ) {
            var result = 0,
                duplicatesCount = utilityService.countInArray( roll, kind );

            if ( duplicatesCount ) {
                result = duplicatesCount * kind;
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there is a pair (i.e. 2x6).
         * Returns the sum of the pair.
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateOnePair( roll ) {
            var result = 0,
                pairSum = 0,
                sortedRoll = roll.slice().sort();

            for ( var i = 0; i < sortedRoll.length - 1; i++ ) {
                pairSum = sortedRoll[ i ] + sortedRoll[ i + 1 ];

                if ( sortedRoll[ i ] === sortedRoll[ i + 1 ] ) {
                    if ( pairSum > result ) {
                        result = pairSum;
                    }
                }
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there are two unique pairs (i.e. 2x6 + 2x5).
         * Returns the sum of the pairs.
         * @fixme Will not work with 6 dice roll. Also can be done better without mutations to sortedRoll
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateTwoPairs( roll ) {
            var result = 0,
                pairs = [],
                sortedRoll = roll.slice().sort();

            pairs.push( utilityService.splicePair( sortedRoll ) );
            pairs.push( utilityService.splicePair( sortedRoll ) );

            if ( ( pairs[ 0 ].length && pairs[ 1 ].length ) && ( pairs[ 0 ][ 0 ] !== pairs[ 1 ][ 0 ] ) ) {
                pairs = Array.prototype.concat( pairs[ 0 ], pairs[ 1 ] );

                result = utilityService.getArraySum( pairs );
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there are n dice of the same kind.
         * Returns the sum of the found duplicate dice.
         *
         * @param  {Array}  roll
         * @param  {number} n         How many duplicates to find (i.e. 2, 3, 4 or 5)
         * @return {number}
         */
        function calculateSameOfAKind( roll, n ) {
            var result = 0;

            for ( var i = 6; i > 0; i-- ) {
                if ( utilityService.countInArray( roll, i ) >= n ) {
                    result = i * n;
                    break;
                }
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there is a small or a large straight.
         * Returns the score for rolling the respective straight.
         *
         * @param  {Array}  roll
         * @param  {number} combinationId The combination Id from the board constants
         * @return {number}
         */
        function calculateStraight( roll, combinationId ) {
            var result = 0,
                hasDuplicates = utilityService.hasDuplicates( roll ),
                hasOnes = utilityService.arrayContains( roll, 1 ),
                hasSixes = utilityService.arrayContains( roll, 6 );

            if ( hasDuplicates ) {
                return result;
            }

            /**
             * Small straight contains a '1' and doesn't contain '6'.
             * Large doesn't contain a '1' and contains a '6'.
             */
            if ( combinationId === diceCombinations.SMALL_STRAIGHT.ID ) {
                if ( hasOnes && !hasSixes ) {
                    result = utilityService.getArraySum( roll );
                }
            } else if ( combinationId === diceCombinations.LARGE_STRAIGHT.ID ) {
                if ( !hasOnes && hasSixes ) {
                    result = utilityService.getArraySum( roll );
                }
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there is 2xN + 3xM combination.
         * Returns the score for rolling a full house.
         * @fixme Will not work with 6 dice roll.
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateFullHouse( roll ) {
            var result = 0,
                threeOfAKind = [],
                sortedRoll = roll.slice().sort();

            // Get the 3 of a kind.
            for ( var i = 0; i < roll.length; i++ ) {
                if ( sortedRoll[i] === sortedRoll[ i + 1 ] && sortedRoll[ i ] === sortedRoll[ i + 2 ] ) {
                    threeOfAKind = sortedRoll.splice( i, 3 );
                    break;
                }
            }

            // If there was 3 of a kind check if remaining dice contain a pair
            if ( threeOfAKind.length && ( sortedRoll[ 0 ] === sortedRoll[ 1 ] ) ) {
                result = utilityService.getArraySum( roll );
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there are 5 of the same kind.
         * Returns the score for rolling a yatzy.
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateYatzy( roll ) {
            var result = 0,
                yatzy = calculateSameOfAKind( roll, 5 );

            if ( yatzy > 0 ) {
                result = 50 + yatzy;
            }

            return result;
        }

        /**
         * Returns a new Board with the locked result row from the board rows.
         * @todo It says that it returns a new Board, but it doesn't actually.
         *       Check to see if new BoardModel(config) is more:
         *           - readable
         *           - performant
         *
         * @param  {Object} result The single row to be locked
         * @param  {Board}  board  All current board rows
         * @return {Board}         The new Board
         */
        function saveResult( result, board ) {
            var newResults = angular.copy( board );

            angular.forEach( newResults, function( res, i ) {
                if ( res.id === result.id ) {
                    newResults[ i ].isLocked = true;
                }
            } );

            return newResults;
        }

        /**
         * Iterates all rows through provided Board to check for unlocked rows.
         * If there aren't any unlocked rows then the game is over.
         *
         * @param  {Board}   board All current board rows
         * @return {boolean}
         */
        function isGameOver( board ) {
            var areAllRowsLocked = true;

            for ( var row in board ) {

                // If any of the rows is not locked then the game is not over
                if ( !board[ row ].isLocked ) {
                    areAllRowsLocked = false;
                    break;
                }
            }

            return areAllRowsLocked;
        }
    }
} )();
