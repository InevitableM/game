import React, { useEffect, useState } from 'react';
import '../css/snake.css';

export default function SnakeGame() {
    const [board, setBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
    const [snake, setSnake] = useState([{x: 0,y: 9}]);
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [apple, setApple] = useState(generateApple());

    function generateApple() {
        let newApple;
        do {
            newApple = {
           x: Math.floor(Math.random() * 10),
           y: Math.floor(Math.random() * 10)
            };
        } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));
        return newApple;
    }
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    setDirection('UP');
                    break;
                case 'ArrowDown':
                    setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    setDirection('RIGHT');
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (gameOver) return;
        const moveSnake = () => {
            const newSnake = [...snake];
            const head = { ...newSnake[0] };

            switch (direction) {
                case 'UP':
                    head.y -= 1;
                    break;
                case 'DOWN':
                    head.y += 1;
                    break;
                case 'LEFT':
                    head.x -= 1;
                    break;
                case 'RIGHT':
                    head.x += 1;
                    break;
                default:
                    break;
            }
            if (head.x < 0 || head.x >= 10 || head.y < 0 || head.y >= 10 || newSnake.some(s => s.x === head.x && s.y === head.y)) {
                setGameOver(true);
                return;
            }
            newSnake.unshift(head);
            if (head.x === apple.x && head.y === apple.y) {
                setApple(generateApple());
            } else {
                newSnake.pop();
            }
            setSnake(newSnake);
        };

        const interval = setInterval(moveSnake, 200);
        return () => clearInterval(interval);
    }, [snake, direction, gameOver, apple]);

    const restartGame = () => {
        setSnake([{ x:0, y: 9 }]);
        setDirection('RIGHT');
        setGameOver(false);
        setApple(generateApple());
    };

    return (
        <div className="game">
            {gameOver ? (
                <div className="game-over">
                    Game Over
                    <button className="restart-button" onClick={restartGame}>
                        Restart
                    </button>
                </div>
            ) : (
                <div>
                    <p>Use Arrows to Move</p>
                <div className="game-board">
                    {board.map((row, i) => (
             <div key={i} className="board-row">
                    {row.map((cell, ind) => {
                  const isSnake = snake.some((s) => s.x === ind && s.y === i);
                    const isApple = apple.x === ind && apple.y === i;
                      return (
                 <div  key={ind}
                     className={`board-cell ${isSnake ? "snake" : ""} ${isApple ? "apple" : ""}`}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                </div>
            )}
        </div>
    );
}