window.addEventListener("DOMContentLoaded", () => {
    const passageEl = document.getElementById("passage");
    const startButton = document.querySelector(".start-button");
    const hintEl = document.querySelector(".hint");
    const difficultyButtons = document.querySelectorAll(".control-group:first-child .control-button");

    let currentDifficulty = "hard";

    async function loadPassage(difficulty = "hard") {
        try {
            const response = await fetch("./data.json");
            const data = await response.json();
            const passages = data[difficulty] || data.hard;
            console.log(passages)
            const randomIndex = Math.floor(Math.random() * passages.length);
            passageEl.textContent = passages[randomIndex].text;
            passageEl.classList.add("blur");
            startButton.classList.remove("hidden");
            hintEl.textContent = "Or click the text and start typing";
        } catch (error) {
            console.error(error);
            passageEl.textContent = "Unable to load passage.";
            passageEl.classList.add("blur");
        }
    }

    startButton.addEventListener("click", () => {
        passageEl.classList.remove("blur");
        hintEl.textContent = "";
        startButton.classList.add("hidden");
    });

    difficultyButtons.forEach(button => {
        button.addEventListener("click", () => {
            difficultyButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");

            currentDifficulty = button.textContent.trim().toLowerCase();
            loadPassage(currentDifficulty);
        });
    });

    loadPassage(currentDifficulty);
});
