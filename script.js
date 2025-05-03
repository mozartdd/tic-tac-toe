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
        const makeMove = (index, symbol) => {
            gameBoard[index] = symbol;
            console.log(gameBoard);
        };
    
        //Function that loops trough all winnable combinations and for each cell compares that all indices is included in player moves
        const checkForWinningCombination = (player) => {
            return WINNABLE_CELLS.some((cells) => cells.every((cell) => player.includes(cell)));
        };
    
        //Function that resets board to initial state
        const resetBoard = (board) => {
            for (let i = 0; i < board.length; i++) {
                board[i] = '';
            }
        };
    
        //Function which will push user move to playerMoves obj
        const pushPlayerMoves = (player, move) => {
            playerMoves[player].push(move);
        };
    
        return { makeMove, checkForWinningCombination, resetBoard, pushPlayerMoves };
    }
    

    function GameLogic() {
        let isPlayerOneMove = true;
        let isGameOver = true;
        let moveCount = 0;

        const player1Symbol = 'X';
        const player2Symbol = 'O';

        //Function that adds player symbol to gameBoard obj based on player move
        const pushSymbol = (move) => {
            const currentSymbol = isPlayerOneMove ? player1Symbol : player2Symbol;
            gameFlow.makeMove(move, currentSymbol);
            isPlayerOneMove = !isPlayerOneMove;  // Toggles the turn
        };

        //Function to stop game if it is draw

        
        return {pushSymbol};
    }
    //TODO: create design and ui before start working on logic
    function DomManipulations() {

    }
    return {GameFlow, GameLogic};
})();

const gameFlow = globalWrapper.GameFlow();
const gameLogic = globalWrapper.GameLogic();

gameLogic.pushSymbol(0);
gameLogic.pushSymbol(1);
gameLogic.pushSymbol(2);
