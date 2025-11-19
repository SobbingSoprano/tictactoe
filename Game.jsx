import React, { useState, useEffect } from "react";
import GameGrid from "./GameGrid.jsx";

function Game() {

   const [moves, setMoves] = useState(new Array(9).fill(""));
   const [turn, setTurn] = useState("X");
   const [winner, setWinner] = useState(null);
   const [gameOver, setGameOver] = useState(false);

   const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ];

   useEffect(() => {
      checkWinner();
   }, [moves]);

   function checkWinner() {
      for (let pattern of winPatterns) {
         const [a, b, c] = pattern;
         if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            setWinner(moves[a]);
            setGameOver(true);
            return;
         }
      }

      if (moves.every(square => square !== "")) {
         setWinner("tie");
         setGameOver(true);
      }
   }

   function gridClick(whichSquare) {
      if (gameOver || moves[whichSquare] !== "") {
         return;
      }

      const movesCopy = [...moves];
      movesCopy[whichSquare] = turn;
      setMoves(movesCopy);
      setTurn(turn === "O" ? "X" : "O");
   }

   function newGame() {
      setMoves(new Array(9).fill(""));
      setTurn("X");
      setWinner(null);
      setGameOver(false);
   }

   return (
      <>
         <h1>Tic-Tac-Toe</h1>
         <GameGrid moves={moves} click={gridClick} />
         <p>
            {gameOver ? (
               winner === "tie" ? (
                  <strong>Game Over: It's a Tie!</strong>
               ) : (
                  <strong className={winner}>Game Over: {winner} Wins!</strong>
               )
            ) : (
               <>Turn: <strong className={turn}>{turn}</strong></>
            )}
         </p>
         <p>
            <button onClick={newGame}>New Game</button>
         </p>
      </>
   );
}

export default Game;