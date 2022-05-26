const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const scoreAlert = document.querySelector(".final-text");
const finalScore = document.getElementById("final-score");
const recentScore = localStorage.getItem("recentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = recentScore;

const toNum = Number(recentScore);

highScores.forEach((userScore) => {
  if (toNum > Number(userScore.score)) {
    scoreAlert.innerHTML = "Congrats, New High Score🎉";
  } else scoreAlert.innerHTML = "Your Final Score";
});

const MAX_HIGHSCORE = 5;

username.addEventListener("keypress", () => {
  // saveScoreBtn.disabled = !username.value;
  if (!username.value) {
    saveScoreBtn.disabled = true;
  } else saveScoreBtn.disabled = false;
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
