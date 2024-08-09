const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let score = 0;
let time = 0;
let gameSpeed = 2000;
let isGameOver = false;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
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
        alert("¡Game Over!");
        isGameOver = true;
        obstacle.style.animation = "none";
        obstacle.style.display = "none";
    } else if (obstacleLeft < 50 && !isGameOver) {
        // Incrementar la puntuación cuando el obstáculo es esquivado
        score++;
        scoreElement.textContent = "Puntos: " + score;
    }
}, 10);

// Función para incrementar la dificultad
function increaseDifficulty() {
    if (isGameOver) return;
    if (gameSpeed > 800) {
        gameSpeed -= 200;
        obstacle.style.animation = `moveObstacle ${gameSpeed / 1000}s infinite linear`;
    }
}

// Reloj del juego y aumento de dificultad con el tiempo
let gameTime = setInterval(function() {
    if (isGameOver) return;
    time++;
    timerElement.textContent = "Tiempo: " + time + "s";
    
    if (time % 10 === 0) {
        increaseDifficulty();
    }
}, 1000);
