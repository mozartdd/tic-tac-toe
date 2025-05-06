const globalWrapper = (() => {
    function GameFlow() {
        //Board to hold cells/fields selected by user's
        const gameBoard = Array(9).fill('');
    
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

        //resets player moves array's
        const resetPlayerMoves = () => {
            playerMoves.player1 = [];
            playerMoves.player2 = [];
        };

        const getBoard = () => gameBoard;
        const getPlayerMoves = () => playerMoves;
        const resetBoard = () => gameBoard.fill('');
        const getWinCells = () => WINNABLE_CELLS;
    
        return { getBoard, getWinCells, getPlayerMoves, resetBoard, resetPlayerMoves };
    }
    
    function GameLogic() {
        let isPlayerOneMove = true;
        let isGameOver = false;
        let moveCount = 0;

        // Function to push user move to playerMoves object
        const pushPlayerMoves = (move, player) => {
            if(!isGameOver && gameFlow.getBoard()[move] === '') {
                player.push(move);
                moveCount++;
                isPlayerOneMove = !isPlayerOneMove;
            }
        };

        // Checks for a winning combination based on player moves
        const checkForWinningCombination = (array, player) => {
            return array.some((cells) => cells.every((cell) => player.includes(cell)));

        };

        // Adds the player symbol to the game board based on the move
        const pushSymbol = (move) => {
            if (!isGameOver) {
                const currentSymbol = isPlayerOneMove ? 'X' : 'O';
                makeMove(move, currentSymbol);
            }
        };

        // Places the symbol on the board at the specified index
        const makeMove = (index, symbol) => {
            if(gameFlow.getBoard()[index] === '') {
                gameFlow.getBoard()[index] = symbol;
            }
        };

        // Checks for a draw (when all moves are taken)
        const declareDraw = (element) => {
            if (moveCount === 9 && !isGameOver) {
                element.textContent = `Game ended with draw`;
                isGameOver = true;
            }
        };
        // Resets the game state
        const restartGame = () => {
            isPlayerOneMove = true;
            isGameOver = false;
            moveCount = 0;
            gameFlow.resetPlayerMoves()
            gameFlow.resetBoard();
        };
        
        //Handles move after game cell was clicked
        const handleMove = (move, user, element) => {
            const currentPlayer = isPlayerOneMove ? gameFlow.getPlayerMoves().player1 : gameFlow.getPlayerMoves().player2;
            pushPlayerMoves(move, currentPlayer);
            pushSymbol(move);
            declareWinner(currentPlayer, user, element);
            declareDraw(element);
        };

        //Declare a winner in UI
        const declareWinner = (player, user, element) => {
            const winner = checkForWinningCombination(gameFlow.getWinCells(), player); 
            if (winner) {
                element.textContent = `${user} has Won!`;
                isGameOver = true;
            }
        }

        const getPlayerStatus = () => isPlayerOneMove;
        const getGameStatus = () => isGameOver;
        
        return { handleMove, restartGame, getGameStatus, getPlayerStatus};
    }
    
    function GameControls() {
        const startBtn = document.querySelector('[data-class="start-btn"]');
        const gameBoard = document.querySelector('[data-class="high-container"]');
        const cells = document.querySelectorAll('[data-class="cell"]');
        const playerOne = document.querySelector('[data-class="player-one"]');
        const playerTwo = document.querySelector('[data-class="player-two"]');
        const winnerDiv = document.querySelector('[data-class="winner-announcement"]');

        // Handles the game flow when a cell is clicked
        const playGame = () => {
            cells.forEach((cell) => {
                cell.addEventListener('click', () => {
                    if(gameLogic.getGameStatus() === false && cell.dataset.played !== 'true') {
                        const currentSymbol = gameLogic.getPlayerStatus() ? 'X' : 'O';
                        const currentPlayer = gameLogic.getPlayerStatus() ? playerOne.value : playerTwo.value;
                        const gamePiece = document.createElement('span');
                        gamePiece.innerHTML = `<span>${currentSymbol}</span>`;
                        cell.appendChild(gamePiece);
                        cell.dataset.played = 'true'; // Mark cell as played
                        gameLogic.handleMove(+cell.getAttribute('data-value'), currentPlayer, winnerDiv);
                        }
                    })
                })
            };

            const hoverEffect = () => {
                cells.forEach((cell) => {
                    const hoverPiece = document.createElement('div');
                    hoverPiece.classList.add('hover-piece');
            
                    cell.addEventListener('mouseover', () => {
                        if (gameLogic.getGameStatus() === false && cell.dataset.played !== 'true') {
                            hoverPiece.textContent = gameLogic.getPlayerStatus() ? 'X' : 'O';
                            cell.appendChild(hoverPiece);
                        }
                    });
            
                    cell.addEventListener('mouseleave', () => {
                        if (cell.contains(hoverPiece)) {
                            cell.removeChild(hoverPiece);
                        }
                    });

                    cell.addEventListener('click', () => {
                        hoverPiece.innerHTML = '';
                    })
                });
            };

        // Handles restarting the game
        const gameRestart = () => {
            const resetBtn = document.querySelector('[data-class="restart-btn"]');
            resetBtn.addEventListener('click', () => {
                gameLogic.restartGame();
                clearCells();
                winnerDiv.innerHTML = '';
            });
            playGame();
            hoverEffect();
        };

        // Clears all the cells (removes symbols)
        const clearCells = () => {
            cells.forEach((cell) => {
                cell.innerHTML = '';
                cell.dataset.played = 'false'; // Reset custom state
            });
        };

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

        // Displays player names on the screen
        const displayNames = (name) => {
            const nameFields = document.createElement('span');
            const spanContainer = document.querySelector('[data-class="span-container"]');
            nameFields.innerHTML = `<span>${name}</span>`;
            spanContainer.appendChild(nameFields);
        };

        gameRestart();
        startGame();

        return { playerOne, playerTwo };
    }
    return {GameFlow, GameLogic, GameControls};
})();

// Instantiate the game
const gameFlow = globalWrapper.GameFlow();
const gameLogic = globalWrapper.GameLogic();
const gameControls = globalWrapper.GameControls();