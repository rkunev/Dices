( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .directive( 'board', boardDirective );

    /** @ngInject */
    function boardDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/board/board.html',
            controller: BoardController,
            controllerAs: 'vm',
            scope: {
                players: '<'
            },
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function BoardController( $scope, $rootScope, $state, boardService, playerService, notificationService ) {
            var vm = this;

            vm.boards = [];
            vm.saveResult = saveResult;

            activate();

            function activate() {
                getPlayers();
                generateBoards();
                setUpListeners();
            }

            function getPlayers() {
                vm.players.push( playerService.getLastPlayedPlayer() );
            }

            function generateBoards() {
                vm.boards = boardService.generateBoardsFromPlayers( vm.players );
                console.log(vm.boards);
            }

            function setUpListeners() {
                var unsubscribeFromRoll = $rootScope.$on( 'dices.roll', function( event, roll ) {
                    vm.boards = boardService.updateBoardScoreSheetCellValues( vm.boards, roll );
                } );

                $scope.$on( '$destroy', unsubscribeFromRoll );
            }

            function saveResult( cell ) {
                var winnerBoard;

                cell.isLocked = true;

                vm.boards = boardService.updateBoardScoreSheetTotal( vm.boards );

                $rootScope.$emit( 'dices.saveResult' );

                if ( boardService.isGameOver( vm.boards ) ) {
                    winnerBoard = boardService.getWinnerBoard( vm.boards );

                    $rootScope.$emit( 'dices.gameOver' );

                    notificationService.showConfirm( {
                        title: 'Winner: ' + winnerBoard.player.name,
                        textContent: 'Result: ' + winnerBoard.scoreSheet.total,
                        ok: 'New Game?',
                        cancel: 'Nah...'
                    } ).then( function() {

                        // @fixme Forcing a full reload will remove the bot/hot-seat player entry
                        // effectively redirecting to /game/new
                        $state.forceReload();
                    } );
                }
            }
        }
    }
} )();
