const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var snakeBody = [];
var longueur = 10;
var score = 0;
var bestScore = 0;

window.addEventListener("keydown", function () {
    if (event.keyCode == "38" && key != 2) {
        keys = 1;
    };
    if (event.keyCode == "40" && key != 1) {
        keys = 2;
    };
    if (event.keyCode == "39" && key != 4) {
        keys = 3;
    };
    if (event.keyCode == "37" && key != 3) {
        keys = 4;
    };
    if (event.keyCode == "32" || event.keyCode == "27") {
        alert("PAUSE");
    };
})


function draw(x, y) {
    ctx.fillStyle = "#3498db";
    ctx.fillRect(x, y, 10, 10);
    var position = {
        "axeX": x,
        "axeY": y,
    }
    snakeBody.push(position);
};


//Supprime tous les éléments
function clear() {
    if (snakeBody.length == longueur) {
        ctx.clearRect(snakeBody[0].axeX, snakeBody[0].axeY, 10, 10);
        snakeBody.shift();
    }
};

var x = 250;
var y = 250;
var keys = 1;
var key = 1;
// 1 = up, 2 = down, 3 = right, 4 = left

//Déplacement
function move() {
    if (key === 1) { //UP
        y -= 10;
    };
    if (key === 2) { //DOWN
        y += 10;
    };
    if (key === 4) { //LEFT
        x -= 10;
    };
    if (key === 3) { //RIGHT
        x += 10;
    };
    draw(x, y);
    if (x == 500 || y == 500 || x < 0 || y < 0) {
        localStorage.bestScore = bestScore;
        document.location.reload(true);
    };

};




var nourritureExist = false;
var nourriturePosition;

//_-_-_-_-_-GESTION NOURRITURE
function nourriture() {
    ctx.fillStyle = "#2ecc71";
    let nbrNouritture = []
    for (var i = 0; i < 490; i += 10) {
        nbrNouritture.push(i);
    };
    if (nourritureExist === false) {
        let x = Math.floor(Math.random() * 48);
        let y = Math.floor(Math.random() * 48);
        for (var i = 0; i < snakeBody.length; i++) {
            if (snakeBody[i].axeX == x) {
                x += 1;
                y += 1;
            };
            if (snakeBody[i].axeY == y) {
                y += 1;
                x += 1;
            };
        };
        ctx.fillRect(nbrNouritture[x], nbrNouritture[y], 10, 10);
        nourritureExist = true;
        nourriturePosition = {
            "axeX": nbrNouritture[x],
            "axeY": nbrNouritture[y],
        };
    };

    if (snakeBody[snakeBody.length - 1].axeX === nourriturePosition.axeX) {
        if (snakeBody[snakeBody.length - 1].axeY === nourriturePosition.axeY) {
            ctx.fillStyle = "#34495e";
            nourritureExist = false;
            longueur += 5;
            //_-_-_-_-_-GESTION DU BEST SCORE
            score += 10;
            if (score > bestScore) {
                bestScore = score;
                // Supprime le html par ID
                function removeHtmlBest() {
                    var node = document.getElementById("bestscore");
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                };
                // Créé et insert du html
                function addHtmlBest() {
                    var parent = document.getElementById("grp");
                    parent.insertAdjacentHTML('afterbegin', '<h2 class="newbc" id="bestscore">New Best Score : ' + bestScore + '</h2>');
                };
                removeHtmlBest();
                addHtmlBest();
            } else {
                // Supprime le html par ID
                function removeHtmlBest() {
                    var node = document.getElementById("bestscore");
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                };
                // Créé et insert du html
                function addHtmlBest() {
                    var parent = document.getElementById("grp");
                    parent.insertAdjacentHTML('afterbegin', '<h2 id="bestscore">Best Score : ' + bestScore + '</h2>');
                };
                removeHtmlBest();
                addHtmlBest();
            };
            //_-_-_-_-_-GESTION DU SCORE
            // Supprime le html par ID
            function removeHtml() {
                var node = document.getElementById("score");
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            };
            // Créé et insert du html
            function addHtml() {
                var parent = document.getElementById("grp");
                parent.insertAdjacentHTML('afterbegin', '<h2 id="score">Score : ' + score + '</h2>');
            };
            removeHtml();
            addHtml();
        };
    };
}

//_-_-_-_-_-GAME OVER
function gameOver() {
    let snakeHead = snakeBody[snakeBody.length - 1];
    let gameOver = false;
    for (let i = 0; i < snakeBody.length - 1 && gameOver == false; i++) {
        if (snakeHead.axeX == snakeBody[i].axeX && snakeHead.axeY == snakeBody[i].axeY) {
            localStorage.bestScore = bestScore;
            document.location.reload(true);
        };
    }
};

function bestScoreStorage() {
    if (localStorage.getItem("bestScore")) {
        bestScore = localStorage.bestScore;
        // Supprime le html par ID
        function removeHtmlBest() {
            var node = document.getElementById("bestscore");
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        };
        // Créé et insert du html
        function addHtmlBest() {
            var parent = document.getElementById("grp");
            parent.insertAdjacentHTML('afterbegin', '<h2 id="bestscore">Best Score : ' + bestScore + '</h2>');
        };
        removeHtmlBest();
        addHtmlBest();
        //_-_-_-_-_-GESTION DU SCORE
        // Supprime le html par ID
        function removeHtml() {
            var node = document.getElementById("score");
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        };
        // Créé et insert du html
        function addHtml() {
            var parent = document.getElementById("grp");
            parent.insertAdjacentHTML('afterbegin', '<h2 id="score">Score : ' + score + '</h2>');
        };
        removeHtml();
        addHtml();
    } else {
        localStorage.setItem("bestScore", 0);
    }
};
bestScoreStorage();
//Loop infinie
alert("Welcome to SNAKE, appuyer sur OK ou presser la touche entrer pour commencer !")
setInterval(function () {
    clear();
    move();
    nourriture();
    gameOver();
    key = keys;
}, 60);