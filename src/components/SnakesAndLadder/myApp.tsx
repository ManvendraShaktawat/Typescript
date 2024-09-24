import styles from "./myApp.module.css";
import React, { useState } from "react";

const GRID = Array.from({ length: 10 }, (_, i): number[] => {
  return Array.from({ length: 10 }, (_, j): number => {
    let val: number;
    if (i % 2 === 0) {
      val = i * 10 + (j + 1);
    } else {
      val = i * 10 + (10 - j);
    }
    return 101 - val;
  });
});

const COLORS = [styles.red, styles.green, styles.blue, styles.yellow];

const NUMBER_OF_PLAYERS: number = 2; // max 4

const SNAKES = [
  [18, 5],
  [35, 10],
  [68, 29],
  [86, 21],
];

const LADDERS = [
  [11, 48],
  [40, 60],
  [63, 94],
];

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

const App = () => {
  const [dice, setDice] = useState<DiceValue>();
  const [currentTurn, setCurrentTurn] = useState(0);
  const [playerPos, setPlayerPos] = useState<number[]>(
    Array(NUMBER_OF_PLAYERS).fill(1)
  );
  const [isLoading, setIsLoading] = useState(false);

  function getNextTurn() {
    return currentTurn === NUMBER_OF_PLAYERS - 1 ? 0 : currentTurn + 1;
  }

  function rollDice() {
    const diceValue: DiceValue = Math.ceil(Math.random() * 6) as DiceValue;
    console.log(`Player ${currentTurn + 1} rolled a ${diceValue}`);
    setDice(diceValue);
    const newPosArr = [...playerPos];
    if (newPosArr[currentTurn] + diceValue <= 100) {
      newPosArr[currentTurn] += diceValue;

      const isSnake = checkSnakes(newPosArr);
      if (!isSnake) {
        checkLadder(newPosArr);
      }

      // pass by reference above
      setPlayerPos(newPosArr);
    } else {
      console.log(`Player ${currentTurn + 1} exceeded the limit`);
    }
    setCurrentTurn(getNextTurn());
  }

  function checkSnakes(newPosArr: number[]): boolean {
    for (let i = 0; i < SNAKES.length; i++) {
      if (SNAKES[i][0] === newPosArr[currentTurn]) {
        newPosArr[currentTurn] = SNAKES[i][1];
        console.log(`Player ${currentTurn + 1} bitten by Snake S${i + 1}`);
        return true;
      }
    }
    return false;
  }

  function checkLadder(newPosArr: number[]): boolean {
    for (let i = 0; i < LADDERS.length; i++) {
      if (LADDERS[i][0] === newPosArr[currentTurn]) {
        newPosArr[currentTurn] = LADDERS[i][1];
        console.log(`Player ${currentTurn + 1} takes the Ladder L${i + 1}`);
        return true;
      }
    }
    return false;
  }

  const winner = playerPos
    .map((pos, idx) => {
      if (pos === 100) {
        return idx + 1;
      }
    })
    .filter((player) => player);

  return (
    <div className={styles.app}>
      <h3>Snakes and Ladder</h3>
      <div className={styles.grid}>
        {GRID.map((_, i) => {
          return (
            <div className={styles.row} key={`row${i}`}>
              {GRID[i].map((_, j) => {
                const count = GRID[i][j];
                const players = playerPos.map((pos, idx) => {
                  if (pos === count) {
                    return (
                      <div
                        key={`player${idx}`}
                        className={`${styles.player} ${COLORS[idx]}`}
                      >
                        {idx + 1}
                      </div>
                    );
                  }
                });
                let bgColor;
                let tileTag = "";
                if (i === 0 && j === 0) {
                  bgColor = styles.finish;
                }
                SNAKES.forEach((snake, i) => {
                  if (snake.includes(count)) {
                    if (snake[0] === count) bgColor = styles.snake;
                    tileTag = `S${i + 1}`;
                  }
                });
                LADDERS.forEach((ladder, i) => {
                  if (ladder.includes(count)) {
                    if (ladder[0] === count) bgColor = styles.ladder;
                    tileTag = `L${i + 1}`;
                  }
                });

                return (
                  <div
                    className={`${styles.tile} ${bgColor}`}
                    key={`cell${i}${j}`}
                  >
                    <div className={styles.count}>
                      {count}
                      <b>{tileTag}</b>
                    </div>
                    <div className={styles.players}>{players}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <h5 className={styles.start}>START</h5>
      {winner.length ? (
        <h2 className={styles.winner}>
          Player {winner[0]} wins, congratulations!!
        </h2>
      ) : (
        <div className={styles.actionPanel}>
          <h3>Roll dice</h3>
          {Array(NUMBER_OF_PLAYERS)
            .fill(true)
            .map((_, idx) => (
              <button
                key={`btn${idx}`}
                className={`${styles.rollBtn} ${
                  idx !== currentTurn && styles.disabled
                }`}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    rollDice();
                  }, 500);
                }}
              >
                Player {idx + 1}
              </button>
            ))}
          <div className={styles.dice}>
            {isLoading ? <span className={styles.loader}></span> : dice}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
