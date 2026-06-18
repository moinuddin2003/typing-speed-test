// import api from "./data.json";
const passage = document.getElementById("passage");
const startBtn = document.getElementById("startBtn");
const difficulty = document.querySelectorAll(
  ".control-group:first-child .control-button",
);

async function loadPassage() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    console.log(data);
    return data;
    // console.log(data.easy[0]);
    // console.log(data.easy[Math.round(Math.random() * length)]);
  } catch (error) {
    console.error(error);
  }
}

async function difficultyFuntion() {
  const data = await loadPassage();

  if (data) {
    difficulty.forEach((button) => {
      passage.classList.add("blur");
      console.log(button);
      button.addEventListener("click", () => {
        let buttonText = button.textContent.trim().toLowerCase();
        if (buttonText === "easy") {
          let easy = data.easy[Math.round(Math.random() * 10)];
          console.log(easy);
          passage.innerText = easy.text;
        } else if (buttonText === "medium") {
          let medium = data.medium[Math.round(Math.random() * 10)];
          console.log(medium);
          passage.innerText = medium.text;
        } else {
          let hard = data.hard[Math.round(Math.random() * 10)];
          console.log(hard);
          passage.innerText = hard.text;
        }
      });
    });
  }

  startBtn.addEventListener("click", () => {
    passage.classList.remove("blur");
  });
}

difficultyFuntion();
