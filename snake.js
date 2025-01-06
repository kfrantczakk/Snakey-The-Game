var canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
//Stałe gry
var gridSize = 25;
var tiles = canvas.width / gridSize;
//Zmienne Gry
var hero = [{ x: 10, y: 10 }];
var kierunek = { x: 0, y: 0 };
var apples = { x: Math.floor(Math.random() * tiles), y: Math.floor(Math.random() * tiles) };
var wynik = 0;
//Pętla
function graLoop() {
    update();
    draw();
}
function update() {
    var glowa = { x: hero[0].x + kierunek.x, y: hero[0].y + kierunek.y };
    //Kolizje
    if (glowa.x < 0 ||
        glowa.y < 0 ||
        glowa.x >= tiles ||
        glowa.y >= tiles ||
        hero.some(function (segment) { return segment.x === glowa.x && segment.y === glowa.y; })) {
        resetGry();
        return;
    }
    if (glowa.x === apples.x && glowa.y === apples.y) {
        wynik++;
        apples = { x: Math.floor(Math.random() * tiles), y: Math.floor(Math.random() * tiles) };
    }
    else {
        hero.pop();
    }
    hero.unshift(glowa);
}
function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    hero.forEach(function (segment) { return ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2); });
    ctx.fillStyle = 'red';
    ctx.fillRect(apples.x * gridSize, apples.y * gridSize, gridSize - 2, gridSize - 2);
    ctx.fillStyle = 'white';
    ctx.font = '20px Helvetica';
    ctx.fillText("Wynik: ".concat(wynik), 10, 20);
}
function resetGry() {
    hero = [{ x: 10, y: 10 }];
    kierunek = { x: 0, y: 0 };
    apples = { x: Math.floor(Math.random() * tiles), y: Math.floor(Math.random() * tiles) };
    wynik = 0;
}
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            if (kierunek.y === 0)
                kierunek = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (kierunek.y === 0)
                kierunek = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (kierunek.x === 0)
                kierunek = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (kierunek.x === 0)
                kierunek = { x: 1, y: 0 };
            break;
    }
});
setInterval(graLoop, 100);
