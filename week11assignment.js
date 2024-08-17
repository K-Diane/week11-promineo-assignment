// the selection of cells using
let cell0 = $("#cell0");
let cell1 = $("#cell1");
let cell2 = $("#cell2");
let cell3 = $("#cell3");
let cell4 = $("#cell4");
let cell5 = $("#cell5");
let cell6 = $("#cell6");
let cell7 = $("#cell7");
let cell8 = $("#cell8");

//this deefine the players
let playerA = "X";
let playerB = "O";
//to determine turns counts of each player
let turn = 0;
//this determine the winner
let winner = false;

//hidding alerts from html file
$("#alertStart").hide();
$("#alertWinner").hide();
$("#alertDraw").hide();

// Define winning patterns
let winPatterns = [
  // rows
  [cell0, cell1, cell2],
  [cell3, cell4, cell5],
  [cell6, cell7, cell8],
  // columns
  [cell0, cell3, cell6],
  [cell1, cell4, cell7],
  [cell2, cell5, cell8],
  // diagonals
  [cell0, cell4, cell8],
  [cell2, cell4, cell6],
];

// function to end the game and disable further moves
let endGame = () => {
  console.log("GAME OVER");
  $(".cell").css("pointer-events", "none");
};

//Tracking the current player
let currentPlayer = "";

// Checking for the player winner, (a,b,c) are symbol of cells (winning patterns) declared above, announce the winner if there is a win
//show who won the game , end the game after the win by calling end game function
//Return true if the there is a winner and false if not
let checkWinner = (currentPlayer, a, b, c) => {
  if (
    a.text() === currentPlayer &&
    b.text() === currentPlayer &&
    c.text() === currentPlayer
  ) {
    winner = true;
    $("#alertWinner").text(`${currentPlayer} Wins!`).show();
    endGame();
    return true;
  }
  return false;
};

// Checking for all winning combinations and if there is no winner and turns reach 9 , we have a draw
let results = () => {
  checkWinner(currentPlayer, ...winPatterns[0]);
  checkWinner(currentPlayer, ...winPatterns[1]);
  checkWinner(currentPlayer, ...winPatterns[2]);
  checkWinner(currentPlayer, ...winPatterns[3]);
  checkWinner(currentPlayer, ...winPatterns[4]);
  checkWinner(currentPlayer, ...winPatterns[5]);
  checkWinner(currentPlayer, ...winPatterns[6]);
  checkWinner(currentPlayer, ...winPatterns[7]);

  if (turn === 9 && winner === false) {
    endGame();
    $("#alertDraw").show();
  }
};

// starting the game
let startGame = () => {
  console.log("Start Game!");

  // turn counter to increment
  console.log(turn++);

  // assign currentPlayer with player A, print the value of current player to the console for debbuging purpose
  currentPlayer = playerA;
  console.log(currentPlayer);

  // Highlight Player A's section to indicate whose turn it is to highlight whose is playing

  $("#aPlayer").addClass("bg-light border border-primary");

  // Show the initial game alert
  $("#alertStart").show();

  $(".cell").on("click", function () {
    // Hide the initial game start alert when a cell is clicked
    $("#alertStart").hide();

    // Set the text of the clicked cell to the current player either 'X' or 'O'
    $(this).text(currentPlayer);
    // Check if the number of turns is greater than 4, indicating that enough moves have been made,
    //console log the winner and call result function to check the winner or if it is a draw
    if (turn > 4) {
      console.log(winner);
      results();
    }

    // switching players
    // If the current player is Player A, switch to Player B, increment the turn counter into the console log
    //highligt player B indicating it is the turn and remove the highlight from player A
    if (currentPlayer === playerA) {
      currentPlayer = playerB;
      console.log(turn++);
      $("#bPlayer").addClass("bg-light border border-primary");
      $("#aPlayer").removeClass("bg-light border border-primary");
    } else {
      // If the current player is Player B, switch to Player A, increment the turn counter into the console log
      //highligt player A indicating it is the turn and remove the highlight from player B
      currentPlayer = playerA;
      console.log(turn++);
      $("#aPlayer").addClass("bg-light border border-primary");
      $("#bPlayer").removeClass("bg-light border border-primary");
    }

    // Update turn alert
    $("#alertStart").text(`${currentPlayer}'s Turn`);
  });
};

// Start the game when the page loads
document
  .getElementById("startBtn")
  .addEventListener("click", () => startGame());

// Reload the page to reset the game
document
  .getElementById("resetBtn")
  .addEventListener("click", () => document.location.reload(true));
