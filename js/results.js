const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("final-score");
const recentScore = localStorage.getItem("recentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = recentScore;

console.log(MAX_QUESTIONS);

const MAX_HIGHSCORE = 5;

username.addEventListener("key", () => {
  // saveScoreBtn.disabled = !username.value;
  if (!username.value) {
    saveScoreBtn.disabled = false;
  }
});

const saveHighScore = function (e) {
  e.preventDefault();
  const score = {
    score: recentScore,
    name: username.value,
  };
  highScores.push(score);
  console.log(highScores);

  highScores.sort((a, b) => b.score - a.score);

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");
};
