

let order = [];
let playOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "~~";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId); //If u turn the power off --> clear Inter ---> stop simon from flashing colors .
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  order = [];
  playOrder = [];
  flash = 0;
  turn = 1;
  good = true;
  intervalId = 0;
  win = false;
  turnCounter.innerHTML = 1;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1); //Random number for the order on Computer Turn
  }
  console.log(order);

  compTurn = true;
  intervalId = setInterval(gameTurn, 800); //setI.. Run the gameTurn function ---> flash the light 'every 800ms'
  //and Still reapeting intel the Interval become cleared ---> after all lights flashed
}

function gameTurn() {
  on = false; //to make the player that he cannot'click'on any buttons
  if (flash === turn) {
    //Computer Turn is Over \\ turn of the player
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true; //now the player can'click'on the buttons
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 00);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

//to make the player'click'on the colors --> we're going to have some more event listeners

topLeft.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(1);
    check(); //to check if the player are correct
    one();
    if (!win) {
      setTimeout(() => clearColor(), 300); //after a certain time, it will be cleared
    }
  }
});

topRight.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(2);
    check(); //to check if the player are correct
    two();
    if (!win) {
      setTimeout(() => clearColor(), 300); //after a certain time, it will be cleared
    }
  }
});

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(3);
    check(); //to check if the player are correct
    three();
    if (!win) {
      setTimeout(() => clearColor(), 300); //after a certain time, it will be cleared
    }
  }
});

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(4);
    check(); //to check if the player are correct
    four();
    if (!win) {
      setTimeout(() => clearColor(), 300); //after a certain time, it will be cleared
    }
  }
});

function check() {
  if (playOrder[playOrder.length - 1] !== order[playOrder.length - 1])
    good = false;

  //The condition if the player win the game

  if (playOrder.length == 20 && good) {
    winGame();
  }
  //The condition if the player dont win the game

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }

  //The condition if the player got it correct but hasnt won the game yet
  if (turn == playOrder.length && good && !win) {
    turn++;
    playOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN";
  on = false;
  win = true;
}

