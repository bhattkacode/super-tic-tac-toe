const tiles = document.getElementsByClassName("tile");
const message = document.getElementsByTagName("p")[0];
const button = document.getElementsByTagName("button")[0];
const board = document.getElementById("board");
const overlay = document.getElementById("overlay");
let currentPlayer = "X";
message.textContent = `${currentPlayer}'s Turn`;

let tileList = Array.from(tiles);
tileList.forEach((tile) => {
    tile.addEventListener("click", () => {
        if (tile.innerHTML === "") {
            tile.innerHTML = `<img height=90px src="img/${currentPlayer}.png">`;
            const img = tile.querySelector("img");
            void img.offsetWidth; // Trigger a reflow
            img.classList.add("show");
            if (won(tileList)) {
                message.textContent = "";
                overlay.textContent = `${currentPlayer} WON`;
                overlay.style.display = "block";
                button.style.display = "inline-block";
                return;
            } else if (draw(tileList)) {
                message.textContent = "";
                overlay.textContent = "DRAW"
                overlay.style.display = "block";
                button.style.display = "inline-block";
                return;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `${currentPlayer}'s Turn`;
            }
        } else {
            const img = tile.querySelector("img");
            void img.offsetWidth;
            img.classList.add("wiggle");
            setTimeout(() => {
                img.classList.remove("wiggle");
            }, 200)
        }
    }
    )
});

button.onclick = () => {
    message.textContent = `${currentPlayer}'s Turn`;
    overlay.textContent = ""
    overlay.style.display = "none";
    button.style.display = "none";
    tileList.forEach(tile => tile.innerHTML = "");
}

function won(tileList) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        try {
            return tileList[a].firstChild.src === tileList[b].firstChild.src &&
                tileList[b].firstChild.src === tileList[c].firstChild.src;
        } catch (TypeError) {
            return false;
        }
    });
}

function draw(tileList) {
    return (tileList.every(tile => {
        return (tile.innerHTML != "");
    }))
}
