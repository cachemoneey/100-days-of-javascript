let heads = 0;
let tails = 0;
let coin = document.querySelector("coin");
let flipBtn = document.getElementById("flip-button");
let resetBtn = document.getElementById("reset-button");

flipBtn.addEventListener("click", () => {
    let i = Math.floor(Math.random * 2);
    coin.style.animation = "none";
    if (i) {
        setTimeout(function () {
            coin.style.animation = "spin-heads 3s forwards"
        }, 100);
        heads++;
    } else {
        setTimeout(function () {
            coin.style.animation = "spin-tails 3s forwards"
        }, 100);
        tails++;
    }
    setTimeout(updateScore(), 3000);
    disableButton();
})

function updateScore(){
    document.querySelector("heads-score").textContent = `Heads: ${heads}`;
    document.querySelector("tails-score").textContent = `Heads: ${tails}`;

}

function disableButton(){
    flipBtn.disabled = true;
    setTimeout(function() {
        flipBtn.disabled = false;
    }, 3000);
}

resetBtn.addEventListener("click", () => {
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    updateScore();
})
