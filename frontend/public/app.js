let userScore = 0;
let compScore = 0;
let exitBtn = document.querySelector("#exitBtn");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorepara = document.querySelector("#user-score");
const compScorepara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ['Rock', 'Paper', 'Scissors'];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawgame = () => {
    //draw game
    msg.innerText="Game was Draw, Play again"
    msg.style.backgroundColor="#081b31";
};

const showWinner = (userWin, userchoice , compChoice) => {
    if(userWin){
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText=`You Win! your ${userchoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";

    }else{
        compScore++;
        compScorepara.innerText = compScore;
        msg.innerText=`You lost! ${compChoice} beats your ${userchoice}`;
        msg.style.backgroundColor="red";
    }
};

const playgame = (userchoice) => {
    console.log("userchoice = ",userchoice)
    //Generate Computer Choice
    const compChoice = genCompChoice();
    console.log("Computer Choice =",compChoice);


   if(userchoice === compChoice){
    //game draw
   drawgame();
   }
   else{
    let userWin = true;
    if(userchoice === "Rock"){
        userWin = compChoice === "Paper" ? false : true;
    }else if( userchoice==="Paper"){
        userWin = genCompChoice === "scissors" ? false :true;
    }else{
        userWin = genCompChoice === "Rock" ? false : true ;
    }
    showWinner(userWin,userchoice,compChoice);
}
};
exitBtn.addEventListener("click", () => {
    window.location.href = "http://localhost:5173/"; // Replace '/' with your actual homepage URL
});

choices.forEach((choice)  => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});