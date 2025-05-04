const globalWrapper = (() => {
    function GameFlow() {
        //Board to hold cells/fields selected by user's
        const gameBoard = Array(9).fill('');
        const getBoard = () => gameBoard; 
    
        const WINNABLE_CELLS = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6] //diagonal
        ];
        const getWinCells = () => WINNABLE_CELLS;

        //Obj that hold information of player chosen cells inside of an arrays
        const playerMoves = {
            player1: [],
            player2: []
        };
        const getPlayerMoves = () => playerMoves;

        //resets player moves array's
        const resetPlayerMoves = () => {
            playerMoves.player1 = [];
            playerMoves.player2 = [];
        };
    
        //Function that resets board to initial state
        const resetBoard = () => {
            for (let i = 0; i < gameBoard.length; i++) {
                gameBoard[i] = '';
            }
        };
    
        return { getBoard, getWinCells, getPlayerMoves, resetBoard, resetPlayerMoves };
    }
    
    function GameLogic() {
        let isPlayerOneMove = true;
        let isGameOver = false;
        let moveCount = 0;

        const player1Symbol = 'X';
        const player2Symbol = 'O';

        //Function that adds player symbol to game board obj based on player move
        const pushSymbol = (move) => {
            if (!isGameOver) {
                const currentSymbol = isPlayerOneMove ? player1Symbol : player2Symbol;
                makeMove(move, currentSymbol);
            }
        };
        //Function which will push user move to playerMoves obj
        const pushPlayerMoves = (move) => {
            const currentPlayer = isPlayerOneMove ? gameFlow.getPlayerMoves().player1 : gameFlow.getPlayerMoves().player2;
            if(!isGameOver && gameFlow.getBoard()[move] === '') {
                isPlayerOneMove = !isPlayerOneMove;  // Toggles the turn
                currentPlayer.push(move);
                moveCount++;
            }
        };

        //Function to add user checked symbol to game board
        const makeMove = (index, symbol) => {
            if(gameFlow.getBoard()[index] === '') {
                gameFlow.getBoard()[index] = symbol;
            }
        };

        //Function to stop game if it is draw
        const declareDraw = () => {
            if (moveCount === 9) {
                isGameOver = true;
                console.log('Game has ended with draw!');
            }
        };

        const restartGame = () => {
            isPlayerOneMove = true;
            isGameOver = false;
            moveCount = 0;
            gameFlow.resetPlayerMoves()
            gameFlow.resetBoard();
        };
        //Function that loops trough all winnable combinations and for each cell compares that all indices is included in player moves
        const checkForWinningCombination = (array, player) => {
            const winner =  array.some((cells) => cells.every((cell) => player.includes(cell)));
            console.log(gameFlow.getPlayerMoves());
            if (winner) {
                console.log(isPlayerOneMove ? `${gameControls.playerTwo.value} has won the game` : `${gameControls.playerOne.value} has won the game`);
                isGameOver = true;
            }
        };
        
        //Handles move after game cell was clicked
        const handleMove = (move) => {
            const currentPlayer = isPlayerOneMove ? gameFlow.getPlayerMoves().player1 : gameFlow.getPlayerMoves().player2;
            pushPlayerMoves(move);
            checkForWinningCombination(gameFlow.getWinCells(), currentPlayer);  
            pushSymbol(move);
            declareDraw();          
        };

        const getPlayerStatus = () => isPlayerOneMove;
        const getGameStatus = () => isGameOver;
        
        return { handleMove, restartGame, getGameStatus, makeMove, getPlayerStatus};
    }
    
    function GameControls() {
        const startBtn = document.querySelector('[data-class="start-btn"]');
        const gameBoard = document.querySelector('[data-class="high-container"]');
        const cells = document.querySelectorAll('[data-class="cell"]');


        const playerOne = document.querySelector('[data-class="player-one"]');
        const playerTwo = document.querySelector('[data-class="player-two"]');

        //TODO: FIX BUG THAT STOPS GAME BEFORE I INPUT LAST ELEMENT IN CELL

        const playGame = () => {
            //Makes action after cell on board is pressed
            cells.forEach((cell) => {
                cell.addEventListener('click', () => {
                    const currentSymbol = gameLogic.getPlayerStatus() ? 'X' : 'O';
                    gameLogic.handleMove(+cell.getAttribute('data-value'));
                    const gamePiece = document.createElement('span');
                    if(gameLogic.getGameStatus() === false && cell.innerHTML === '') {
                        gamePiece.innerHTML = `<span>${currentSymbol}</span>`;
                        cell.appendChild(gamePiece);
                        }
                    
                    })
                })
            };
        
        //resets game data
        const gameRestart = () => {
            const resetBtn = document.querySelector('[data-class="restart-btn"]')
            .addEventListener('click', () => {
                gameLogic.restartGame();
                clearCells();
            })
        };
        const clearCells = () => {
            cells.forEach((cell) => {
                cell.innerHTML = ``;
            })
        }

        //starts game, adds user input name's to game screen
        const startGame = () => {
            startBtn.addEventListener('click', () => {
    
            if (playerOne.value !== '' && playerTwo.value !== '') {
                startBtn.closest('.player-input-fields').style.display = 'none';
                gameBoard.style.display = 'flex';
                displayNames(`Player 1: ${playerOne.value} (X)`);
                displayNames(`Player 2: ${playerTwo.value} (O)`);
            }
            })
        };

        //Function to display player name's from input fields to screen
        const displayNames = (name) => {
            const nameFields = document.createElement('span');
            const spanContainer = document.querySelector('[data-class="span-container"]');

            nameFields.innerHTML = `<span>${name}</span>`;
            spanContainer.appendChild(nameFields);
        };

        gameRestart();
        startGame();
        playGame();

        return {playerOne, playerTwo};
    }
    return {GameFlow, GameLogic, GameControls};
})();

const gameFlow = globalWrapper.GameFlow();
const gameLogic = globalWrapper.GameLogic();
const gameControls = globalWrapper.GameControls();