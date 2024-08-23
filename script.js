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

// Detectar pulsación de la barra espaciadora o toque en la pantalla
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isGameOver) {
        jump();
    }
});

document.addEventListener("touchstart", function(event) {
    if (!isGameOver) {
        jump();
    }
});

function jump() {
    if (!character.classList.contains("jump")) {
        character.classList.add("jump");

        setTimeout(function() {
            character.classList.remove("jump");
        }, 500);
    }
}

let isAlive = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft < 80 && obstacleLeft > 50 && characterTop >= 150) {
        isGameOver = true;
        endGame();
    } else if (obstacleLeft < 50 && !obstaclePassed && !isGameOver) {
        score++;
        scoreElement.textContent = "Puntos: " + score;
        obstaclePassed = true;
    }

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
    location.reload(); // Recarga la página para reiniciar el juego
}
