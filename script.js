const globalWrapper = (() => {
    function GameFlow() {
        //Board to hold cells/fields selected by user's
        const gameBoard = Array(9).fill('');
        //Shallow copy of gameBoardArray
        const gameBoardCopy = [...gameBoard];

        const WINNABLE_CELLS = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows

            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns

            [0, 4, 8], [2, 4, 6] //diagonal
        ];
        //Obj that hold information of player chosen cells inside of an arrays
        const playerMoves = {
            player1: [],
            player2: []
        };

        //Function to add user checked symbol to game board
        function makeMove(index, symbol) {
            gameBoard[index] = symbol;
        };
        //Function that loops trough all winnable combinations and for each cell compares that all indices is included in player moves
        function checkForWinningCombination(player) {
            return WINNABLE_CELLS.some((cells) => cells.every((cell ) => player.includes(cell)));
        }
        //Function that resets board to initial state
        function resetBoard(board) {
            for(let i = 0; i < board.length; i++) {
                board[i] = '';
            }
        }

        return {makeMove, checkForWinningCombination, resetBoard};
    }

    function GameLogic() {
        let isPlayerOneMove = true;
        let isGameOver = false;
        let moveCount = 0;

        const player1Symbol = 'X';
        const player2Symbol = 'O';

        //TODO: create a function which will push user move to playerMoves obj
        function pushPlayerMoves(player, move) {
            playerMoves[player].push(move);
        }


    }
    //TODO: create design and ui before start working on logic
    function DomManipulations() {

    }
    return {GameFlow, GameLogic};
})();

const gameFlow = globalWrapper.GameFlow();
const gameLogic = globalWrapper.GameLogic();