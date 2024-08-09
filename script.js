const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart-button");

let score = 0;
let time = 0;
let gameSpeed = 2000;
let isGameOver = false;
let obstaclePassed = false;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isGameOver) {
        jump();
    }
});

function jump() {
    if (character.classList != "jump") {
        character.classList.add("jump");

        setTimeout(function() {
            character.classList.remove("jump");
        }, 500);
    }
}

let isAlive = setInterval(function() {
    // Obtener la posición Y del personaje
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    // Obtener la posición X del obstáculo
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Detectar colisión
    if (obstacleLeft < 80 && obstacleLeft > 50 && characterTop >= 150) {
        // Colisión detectada
        isGameOver = true;
        endGame();
    } else if (obstacleLeft < 50 && !obstaclePassed && !isGameOver) {
        // Incrementar la puntuación cuando el obstáculo es esquivado
        score++;
        scoreElement.textContent = "Puntos: " + score;
        obstaclePassed = true;
    }

    // Resetear el flag de obstáculo pasado cuando el obstáculo sale de la pantalla
    if (obstacleLeft <= 0) {
        obstaclePassed = false;
    }
}, 10);

function increaseDifficulty() {
    if (isGameOver) return;
    if (gameSpeed > 800) {
        gameSpeed -= 200;
        obstacle.style.animation = `moveObstacle ${gameSpeed / 1000}s infinite linear`;
    }
}

let gameTime = setInterval(function() {
    if (isGameOver) return;
    time++;
    timerElement.textContent = "Tiempo: " + time + "s";
    
    if (time % 10 === 0) {
        increaseDifficulty();
    }
}, 1000);

function endGame() {
    alert(`¡Game Over! Obtuviste ${score} puntos.`);
    obstacle.style.animation = "none";
    obstacle.style.display = "none";
    restartButton.style.display = "block";
}

function restartGame() {
    score = 0;
    time = 0;
    gameSpeed = 2000;
    isGameOver = false;
    obstaclePassed = false;

    scoreElement.textContent = "Puntos: " + score;
    timerElement.textContent = "Tiempo: 0s";
    obstacle.style.display = "block";
    obstacle.style.animation = `moveObstacle ${gameSpeed / 1000}s infinite linear`;
    restartButton.style.display = "none";
}
