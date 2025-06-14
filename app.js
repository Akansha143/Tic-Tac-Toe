let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let scoreX = 0;
let scoreO = 0;

let fullResetBtn = document.querySelector("#fullReset");

fullResetBtn.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    document.getElementById("scoreX").innerText = scoreX;
    document.getElementById("scoreO").innerText = scoreO;
    resetGame();
});


const scoreDisplay = document.createElement("div");
scoreDisplay.className = "scoreboard";
scoreDisplay.innerHTML = `Player X: <span id="scoreX">0</span> | Player O: <span id="scoreO">0</span>`;
document.querySelector("main").insertBefore(scoreDisplay, document.querySelector(".container"));

const clickSound = new Audio("click.mp3");


let turnO = true;//playerX,playerO
let count=0; //To track draw

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        // ✅ Play sound on box click
        clickSound.currentTime = 0;
        clickSound.play().catch((error) => {
            console.warn("Sound play failed:", error);
        });

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
        // checkWinner();
    });
});


const resetGame=()=>{
    turnO=true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    if (winner === "X") {
        scoreX++;
        document.getElementById("scoreX").innerText = scoreX;
    } else if (winner === "O") {
        scoreO++;
        document.getElementById("scoreO").innerText = scoreO;
    }
};


const checkWinner=()=>{
    for(let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
    
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val=== pos2Val && pos2Val === pos3Val){
            console.log("winner",pos1Val);
            
            showWinner(pos1Val);
         return true;
            }
        }
    }
    return false;
};

const gameDraw = () =>{
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

newBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);


