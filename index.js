const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer; //to identify whose turn it is currently
let gameGrid; //to track the status of grid

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

 //lets create a function to initialize the game

 function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bi krna padega boxes ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initalize box with css properties again mtlb ki game restart krne pe box ki jo initial css properties hai voh phir se apply ho
        box.classList = `box box${index+1}`;
    } );
    newGameBtn.classList.remove("active"); 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 }

 initGame();

 function swapTurn()
 {
    if(currentPlayer=="X"){
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    //for updating the ui mtlb jo text upr likha hoti hai ab X current player hai ya 0
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 }

 function checkGameOver(index) {
    
    let answer = "";
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value 
        if( (gameGrid[position[0]] != "" || gameGrid[position[1]] !="" || gameGrid[position[2]] != "")
           && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])) {
        
            //check if winner is 6
            if(gameGrid[position[0]] == 'X')
                answer = "X";

                else
                answer = "0";

                //diasble pointer Events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // now we know X/0 is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

                
        }
    });

    //it means we have a winner
    if(answer!=""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //let check whether there is tie
    let fillcount = 0;
    gameGrid.forEach((box) => {
        if(box !="" )
            fillcount++;
    });

    //board is filled , game is TIE 
    if(fillcount == 9 ){
        gameInfo.innerText = "Game Tie";
        newGameBtn.classList.add("active");
    }

 }

 function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer; //it changes in UI
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"; // it represents the changes in our inner logic
        //swap kro turn ko
        swapTurn();
        //check whether game has ended or not
        checkGameOver();
    }
 }

 boxes.forEach((box,index) => {
    box.addEventListener("click",() =>{
        handleClick(index);
    })
 });

 newGameBtn.addEventListener("click",initGame);



