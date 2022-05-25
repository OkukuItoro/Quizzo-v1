const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("final-score");
const recentScore = localStorage.getItem("recentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = recentScore;

const MAX_HIGHSCORE = 5;

username.addEventListener("keypress", () => {
  // saveScoreBtn.disabled = !username.value;
  if (!username.value) {
    return "user";
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
