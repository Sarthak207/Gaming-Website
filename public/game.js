let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#rstBtn");
let exitBtn = document.querySelector("#exitBtn");



let newButn = document.querySelector("#newBtn");
let = msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turn0 = true // Player 0 , player X
let count = 0;
const restgame = () =>{
    turn0 =true;
    enableboxes();
    msgContainer.classList.add("hide");
}

const winpattern = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText="0";
            turn0=false;
        } else{
                box.innerText = "X";
                turn0=true;
        }
        count++;
        box.disabled=true;
        checkWinner();
    });
});

const enableboxes = () =>{
    for( let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
}
const disableboxes = () =>{
    for( let box of boxes){
        box.disabled = true;
    }
}
 const showWinner = (pos1val) => {
    msg.innerText = `Congratulations, Winner is ${pos1val}`;
    msgContainer.classList.remove("hide");
    disableboxes();
 };

const checkWinner = ()=>{
    for(let pattern of winpattern){
        
let pos1val = boxes[pattern[0]].innerText;
let pos2val = boxes[pattern[1]].innerText;
let pos3val = boxes[pattern[2]].innerText;

if(pos1val !=="" && pos2val !== "" && pos3val !== ""){
    if(pos1val===pos2val && pos2val===pos3val){
         showWinner(pos1val);
    }
    else{
        drawgame();
    }
}
    
    
    }
};

 newButn.addEventListener('click',restgame);
 rstBtn.addEventListener('click',restgame);
 exitBtn.addEventListener("click", () => {
    window.location.href = "http://localhost:5173/"; // Replace '/' with your actual homepage URL
});

 const drawgame = () =>{
    if(count===9){
        msg.innerText = "Game is draw ,No Winner ";
        msgContainer.classList.remove("hide");
        disableboxes();
    }
 }
 