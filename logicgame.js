const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const snakeColorInput = document.getElementById("snake-color");

const GRID_SIZE = 20;
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const SNAKE_SPEED = 100;

let snakeColor = "#00ff00"; // Màu sắc mặc định của rắn (xanh lá cây)
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let dx = 0;
let dy = 0;
let gameRunning = false;

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const backButton = document.getElementById('back-button');
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");

document.addEventListener("keydown", changeDirection);
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetHighScore);

function main() {
    if (gameRunning) {
        setTimeout(function onTick() {
            clearCanvas();
            moveSnake();
            drawFood();
            drawSnake();
            checkCollision();
            main(); // Đệ quy để tiếp tục vòng lặp game
        }, SNAKE_SPEED);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = snakeColor; // Sử dụng màu sắc của biến snakeColor
    ctx.fillRect(snakePart.x * GRID_SIZE, snakePart.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snakePart.x * GRID_SIZE, snakePart.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); // Thêm đầu rắn mới vào phía trước
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = "Score: " + score;
        generateFood(); // Tạo thức ăn mới khi rắn ăn được
    } else {
        snake.pop(); // Xóa phần đuôi của rắn nếu không ăn được thức ăn
    }
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (!gameRunning) {
        return;
    }

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= GAME_WIDTH / GRID_SIZE || snake[0].y < 0 || snake[0].y >= GAME_HEIGHT / GRID_SIZE) {
        gameOver(); // Kết thúc game nếu rắn chạm vào tường
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver(); // Kết thúc game nếu rắn tự đụng đầu vào thân
        }
    }
}

function gameOver() {
    gameRunning = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = "High Score: " + highScore;
    }
    alert("Game Over! Your score: " + score);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (GAME_WIDTH / GRID_SIZE));
    food.y = Math.floor(Math.random() * (GAME_HEIGHT / GRID_SIZE));
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            generateFood(); // Đảm bảo thức ăn không xuất hiện trong rắn
        }
    }
}

function startGame() {
    if (!gameRunning) {
        snake = [{ x: 10, y: 10 }]; // Khởi tạo lại rắn
        dx = 0;
        dy = 0;
        score = 0;
        scoreDisplay.textContent = "Score: " + score;
        gameRunning = true;
        drawSnake();
        main(); // Bắt đầu vòng lặp chính của game
    }
}

function resetHighScore() {
    highScore = 0;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = "High Score: " + highScore;
}

// Điều hướng quay lại trang chủ khi click vào nút back
backButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Thay 'your_page.html' bằng URL của trang bạn muốn chuyển đến
});

// Hàm thay đổi màu sắc rắn
function changeSnakeColor() {
    snakeColor = snakeColorInput.value;
    drawSnake(); // Vẽ lại rắn sau khi thay đổi màu sắc
}
