// import api from "./data.json";
const passage = document.getElementById("passage");
const startBtn = document.getElementById("startBtn");
const difficulty = document.querySelectorAll(
  ".control-group:first-child .control-button",
);

const mode = document.querySelectorAll(
  ".control-group:last-child .control-button",
);
console.log(mode);
const hint = document.querySelector(".hint");

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
  passage.classList.add("blur");

  const data = await loadPassage();

  if (data) {
    passage.innerText = data.hard[Math.round(Math.random() * 10)].text;

    difficulty.forEach((button) => {
      button.addEventListener("click", () => {
        console.log(difficulty);
        difficulty.forEach((btn) => {
          btn.classList.remove("selected");
          // te poore pr se sleected ura dega
        });
        button.classList.add("selected");
        // ye jispr click hogi uspr lgyga

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

    mode.forEach((btn) => {
      btn.addEventListener("click", () => {
        mode.forEach((button) => {
          button.classList.remove("selected");
        });
        btn.classList.add("selected");
      });
    });
  }

  startBtn.addEventListener("click", () => {
    passage.classList.remove("blur");
    startBtn.classList.add("hidden");
    hint.classList.add("hidden");

    const selectMode = document.querySelectorAll(
      ".control-group:last-child .control-button.selected",
    );

    console.log(selectMode);

    if (selectMode) {
      let selectedMode = selectMode.textContent.trim().toLowerCase();
      console.log(selectedMode);

      if (selectedMode === "Timed (60s)") {
        let timer = 60;
        let timerInterval = setInterval(() => {
          timer--;
          console.log("time baqi he", timer);

          if (timerInterval <= 0) {
            clearInterval(timerInterval);
            console.log("time up");
          }
        }, 1000);
      } else {
        passage.innerText = data.hard[Math.round(Math.random() * 10)].text;
      }
    }
  });
}
difficultyFuntion();
