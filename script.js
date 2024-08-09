const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

function jump() {
    if (character.classList != "jump") {
        character.classList.add("jump");

        setTimeout(function () {
            character.classList.remove("jump");
        }, 500);
    }
}

let isAlive = setInterval(function () {
    // Obtener la posición Y del personaje
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    // Obtener la posición X del obstáculo
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Detectar colisión
    if (obstacleLeft < 80 && obstacleLeft > 50 && characterTop >= 150) {
        // Colisión detectada
        alert("¡Game Over!");
        obstacle.style.animation = "none";
        obstacle.style.display = "none";
    }
}, 10);