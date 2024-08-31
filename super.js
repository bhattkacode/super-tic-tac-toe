const message = document.getElementsByTagName("p")[0];
const button = document.getElementsByTagName("button")[0];
const superBoard = document.getElementById("superBoard");
const overlay = document.getElementById("overlay");
//use document.querySelector instead of getElementBy...
const tiles = document.querySelectorAll(".tile");
const boards = document.querySelectorAll(".board");
const overlays = document.querySelectorAll(".overlayTile");


let currentPlayer = "X";
message.textContent = `${currentPlayer}'s Turn`;

for (let bnum = 0; bnum < 9; bnum++) {
    tileList = Array.from(boards[bnum].getElementsByClassName("tile"));
    // console.log(`loop: ${bnum}, tileList: ${tileList}`);
    for (let tnum = 0; tnum < tileList.length; tnum++) {
        const tile = tileList[tnum];
        // console.log(`tile: ${tile}`);
        tile.addEventListener("click", () => {
            // console.log(`bnum: ${bnum}, tnum:${tnum}`);
            if (tile.innerHTML === "") {
                resetOverlays();
                tile.innerHTML = `<img height=45px src="img/${currentPlayer}.png">`;
                const img = tile.querySelector("img");
                void img.offsetWidth;
                img.classList.add("show");
                focusOverlay(tnum);
                if (wonTile(bnum)) {
                    console.log("won");
                    wonOverlay(bnum, currentPlayer);
                    console.log("after wonoverlay");
                    if (checkWon()) {
                        overlay.style.display = "block";
                        overlay.textContent = `${currentPlayer} WON`;
                        button.style.display = "inline-block";
                        return;
                    } else if (checkDraw()) {
                        overlay.style.display = "block";
                        overlay.textContent = "DRAW";
                        button.style.display = "inline-block";
                        return;
                    };
                    console.log("after won checks");
                } else if (drawTile(bnum)) {
                    drawedOverlay(bnum);
                    if (checkDraw()) {
                        overlay.style.display = "block";
                        overlay.textContent = "DRAW";
                        button.style.display = "inline-block";
                        return;
                    };

                }
                console.log("after draw checks");
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `${currentPlayer}'s Turn`;
                console.log(`changed player to ${currentPlayer}`);
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
    };
}
button.onclick = () => {
    message.textContent = `${currentPlayer}'s Turn`;
    overlay.textContent = ""
    overlay.style.display = "none";
    button.style.display = "none";
    document.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");
    overlays.forEach(overlay => {
        overlay.innerHTML = "";
        overlay.classList.remove("blocked");
        overlay.style.display = "none";
    })
}

focusOverlay = (bnum) => {
    if (!overlays[bnum].classList.contains("blocked")) {
        for (let i = 0; i < 9; i++) {
            if (i !== bnum) {
                overlays[i].classList.add("inactive");
                overlays[i].style.display = "block";
            }
        }
    }
}

resetOverlays = () => {
    for (let i = 0; i < 9; i++) {
        if (overlays[i].classList.contains("inactive") && !overlays[i].classList.contains("blocked")) {
            overlays[i].classList.remove("inactive");
            overlays[i].style.display = "none";
        }
    }
}

function drawedOverlay(bnum) {
    overlays[bnum].classList.add("blocked");
    overlays[bnum].style.display = "block";
    overlays[bnum].textContent = "DRAW";
}

function wonOverlay(bnum, player) {
    const overlay = overlays[bnum];
    overlay.classList.add("blocked");
    overlay.style.display = "block";
    overlay.innerHTML = `<img height=100px src="img/${player}.png">`;
    const img = overlay.querySelector("img");
    void img.offsetWidth;
    img.classList.add("show");
}

function wonTile(bnum) {
    const tileList = Array.from(boards[bnum].getElementsByClassName("tile"));
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        try {
            return tileList[a].firstChild.src === tileList[b].firstChild.src &&
                tileList[b].firstChild.src === tileList[c].firstChild.src &&
                tileList[a].innerHTML !== "";
        } catch (TypeError) {
            return false;
        }
    });
}

function drawTile(bnum) {
    const tileList = Array.from(boards[bnum].getElementsByClassName("tile"));
    return (tileList.every(tile => {
        return (tile.innerHTML != "");
    }))
}

function checkWon() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        try {
            return overlays[a].firstChild.src === overlays[b].firstChild.src &&
                overlays[b].firstChild.src === overlays[c].firstChild.src;
            // overlays[a].innerHTML !== "";
        } catch (TypeError) {
            return false;
        }
    });
}

function checkDraw(bnum) {
    return (Array.from(overlays).every(overlay => {
        return (overlay.innerHTML != "");
    }))
}
