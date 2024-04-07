const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn= document.querySelector("#restartBtn");
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
    [1, -110, 0],
    [0, -30, 0],
    [0, 45, 0],
    [80, -30, 90],
    [-1, -30, 90],
    [75, -30, 90],
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
    statusText.textContent = `${currentPlayer}'s turn`;
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
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
}

function changePlayer(){
    currentPlayer=(currentPlayer=="X") ? "O" : "X";
    statusText.textContent=`${currentPlayer}'s turn`;

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
        statusText.textContent=`${currentPlayer} wins!`;
        document.querySelector(".line").style.width="320px";
        
        
        
        running=false;
    }

    else if(!options.includes("")){
        statusText.textContent=`Draw!`;
        running=false;
    }
    else{
        changePlayer();
    }
}

function drawline(){
    let j=0;
    // for(i=0;i<winline.length;i++){
        
        for(j ; j<winline.length; j++){
    // while(j<winline.length){
        const e=winline[j];
        // const l1=options[e[0]];
        // const l2=options[e[1]];
        // const l3=options[e[2]];
        document.querySelector(".line").style.transform=`translate(${e[0]}px,${e[1]}px) rotate(${e[2]}deg)`
        // j++;
        break;
        }
    // while(j<winline.length){
    //     const e=winline[j];
    //             document.querySelector(".line").style.transform=`translate(${e[0]}px,${e[1]}px) rotate(${e[2]}deg)`
    // // j++;
    // break;
    // }
    // console.log(j);
    //     j++;

    // }

}


function restartGame(){
    currentPlayer="X";
    options=["","","","","","","","",""];
    document.querySelector(".line").style.width="0px";
    statusText.textContent=`${currentPlayer}'s turn`;
    cells.forEach(cell=>cell.textContent="");
    
    running=true;
}

function playercolor(cell, index){
    // cells.forEach(cell=>cell.textContent="");
    
    if(currentPlayer=="X"){
        
            cells.forEach(cellIndex=>cell.style.color = "red");
            // document.querySelector(".cell").style.color = "red";
        
    }
    else if(currentPlayer=="O"){
        
            cells.forEach(cellIndex=>cell.style.color = "blue");
            // document.querySelector(".cell").style.color = "blue";
        
    }
    
}