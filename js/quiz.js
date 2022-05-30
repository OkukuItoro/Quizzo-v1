const question = document.getElementById("question");

const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.querySelector(".score-text");
const correctAnswerResult = document.querySelector(".question-correct-answer");
const optionsContainer = Array.from(
  document.getElementsByClassName(".choice-container")
);
const loader = document.getElementById("loader");
const quizBody = document.getElementById("quiz-body");

const choices = Array.from(document.getElementsByClassName("choice-text"));
const submitButton = document.querySelector(".submit-button");
const nextButton = document.querySelector(".next-button");

/** VARIABLES, ARRAYS AND OBJECTS */
let currentQuestion = {};

let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let score = 0;
let userAnswer;

console.log("Welcome to Quizzo v1");

//CONSTANTS
const MAX_QUESTIONS = 20;

/** FUNCTION TO CALL AND GET DATA FROM API */
const getQuizData = async function () {
  const data = await fetch(
    "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple"
  );

  const quizzData = await data.json();

  const questionObjects = quizzData.results;
  console.log("Questions Recieved");

  questionObjects.forEach((questionData) => {
    const question = questionData.question;
    const answer = questionData.correct_answer;
    const incorrectAnswers = questionData.incorrect_answers;
    const quizOptions = [answer, ...incorrectAnswers];
    questionItem = { question, answer, incorrectAnswers, quizOptions };
    questions.push(questionItem);
  });
};

/** FUNCTION TO START THE QUIZ WITH THE FETCHED QUIZ DATA
 * the counter and score are set to zero.
 */
const startQuiz = async function () {
  questionCounter = 0;
  score = 0;
  await getQuizData();
  availableQuestions = [...questions];
  getNewQuestion();

  quizBody.classList.remove("hidden");
  loader.classList.add("hidden");
};

/** FUNCTION TO RUN THE QUIZ QUESTIONS */
const getNewQuestion = function () {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("recentScore", score);

    // go to the results page
    return window.location.assign("results.html");
  }
  questionCounter++;
  questionCounterText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  // Randomize the questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  // Randomize the options
  const randomizeOptions = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };
  const newOptions = randomizeOptions(currentQuestion.quizOptions);

  // options are updated with each set of newOptions
  choices.forEach((choice, i) => {
    choice.innerHTML = newOptions[i];
  });

  // next question
  availableQuestions.splice(questionIndex, 1);
};

//Enable users to click options
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    userAnswer = e.target;

    // Toggle the options
    choices.forEach((choice) => {
      choice != userAnswer
        ? choice.parentElement.classList.remove("selected-answer")
        : "";
    });
    userAnswer.parentElement.classList.add("selected-answer");

    submitButton.disabled = false;
  });
});

submitButton.addEventListener("click", () => {
  // Checks the user's answer
  validateUserAnswer(userAnswer);
  userAnswer.parentElement.classList.remove("selected-answer");
  submitButton.disabled = true;
  nextButton.disabled = false;

  choices.forEach((choice) => {
    choice.classList.add("disable");
  });
});

nextButton.addEventListener("click", () => {
  if ((submitButton.disabled = true)) {
    nextButton.disabled = true;
  }
  removeClasses(userAnswer);
  getNewQuestion();
});

/** Functions */
const incrementScore = (num) => {
  score += num;
  scoreText.innerHTML = score;
};

const validateUserAnswer = function (answer) {
  if (answer.parentElement.classList.contains("selected-answer")) {
    if (answer.innerHTML == currentQuestion.answer) {
      answer.parentElement.classList.add("correct");
      incrementScore(1);
    } else {
      answer.parentElement.classList.add("incorrect");
    }
  }

  //loops to check correct answer (if user's answer is incorrect)
  choices.forEach((choice) => {
    choice.innerHTML == currentQuestion.answer
      ? choice.parentElement.classList.add("correct")
      : "";
  });
};

// Remove validated answer classes
const removeClasses = function (answer) {
  answer.parentElement.classList.remove("selected-answer");
  answer.parentElement.classList.remove("correct");
  answer.parentElement.classList.remove("incorrect");
  answer.classList.remove("disable");
  choices.forEach((choice) => {
    choice.parentElement.classList.remove("selected-answer");
    choice.parentElement.classList.remove("correct");
    choice.parentElement.classList.remove("incorrect");
    choice.classList.remove("disable");
  });
};

// DISABLE THE OPTIONS & SUBMIT AFTER USER HAS CLICKED AN ANSWER
const disableOptions = function () {
  nextButton.disabled = false;
  // choices.onmousedown = new function ("return false;");
};

startQuiz();
