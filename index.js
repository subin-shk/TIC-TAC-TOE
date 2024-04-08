const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn= document.querySelector("#restartBtn");
const clickSound = document.getElementById("click");
const winSound = document.getElementById("winsound");
const drawSound = document.getElementById("draw");


const winConditions=[
    [0 , 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
];
const winline=[
    [1, -115, 0],
    [0, -35, 0],
    [0, 45, 0],
    [-80, -30, 90],
    [-1, -30, 90],
    [80, -30, 90],
    [7, -30, 45],
    [-2, -30, 135]
];
let options=["","","","","","","","",""];
let currentPlayer="X";
let running=false;


initializeGame();

function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent = `Player ${currentPlayer}'s turn...`;
    running=true;
}

function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    playercolor(this, cellIndex);
    checkWinner();
    playSound()
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
}

function changePlayer(){
    currentPlayer=(currentPlayer=="X") ? "O" : "X";
    statusText.textContent=`Player ${currentPlayer}'s turn...`;

}

function checkWinner(){
    let roundWon=false;

    for(let i =0; i<winConditions.length;i++){
        const condition=winConditions[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];

        if(cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA==cellB&&cellB==cellC){
            drawline();
            roundWon=true;
            break;
            
        }
        
    }

    if(roundWon){
        statusText.textContent=`Player ${currentPlayer} wins! 🎉`;
        document.querySelector(".line").style.width="320px";
        
        playWinSound();
        
        running=false;
    }

    else if(!options.includes("")){
        statusText.textContent=`Draw 🙄`;
        playDrawSound(); 
        running=false;
    }
    else{
        changePlayer();
    }
}

function drawline(){

    const lineDiv = document.querySelector(".line");

    // Find the index of the winning condition
    let winIndex = -1;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA != "" && cellA === cellB && cellB === cellC) {
            winIndex = i;
            break;
        }
    }

    // If a winning condition is found, draw the line
    if (winIndex !== -1) {
        const transformation = winline[winIndex];
        applyTransformation(transformation);
    }
}

// Function to apply transformation to the div
function applyTransformation(transformation) {
    const lineDiv = document.querySelector(".line");
    lineDiv.style.transform = `translate(${transformation[0]}px, ${transformation[1]}px) rotate(${transformation[2]}deg)`;


}


function restartGame(){
    currentPlayer="X";
    options=["","","","","","","","",""];
    document.querySelector(".line").style.width="0px";
    statusText.textContent=`Player ${currentPlayer}'s turn...`;
    cells.forEach(cell=>cell.textContent="");
    
    running=true;
}

function playercolor(cell, index){
    // cells.forEach(cell=>cell.textContent="");
    
    if(currentPlayer=="X"){
        
            // cells.forEach(cellIndex=>cell.style.color = "#FF3939");
           
            cells.forEach(cellIndex=>cell.style.textShadow= "2px 2px 5px red");

        
    }
    else if(currentPlayer=="O"){
        
            // cells.forEach(cellIndex=>cell.style.color = "#397EFF");
            cells.forEach(cellIndex=>cell.style.textShadow= "2px 2px 5px blue");
            
            // document.querySelector(".cell").style.color = "blue";
        
    }
    
}

function playSound() {
    click.play();
}

function playWinSound() {
    winsound.play();
}

function playDrawSound() {
    draw.play();
} 