const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
let storedAnswer;
let score = 0;
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
  const type = randomNumber(0, 3);
  let randomNumber1 = randomNumber(1, 10);
  let randomNumber2 = randomNumber(1, 10);
  let question, answer;

  if (type === 0) {
    question = `Q. What is ${randomNumber1} multiplied by ${randomNumber2} ?`;
    answer = randomNumber1 * randomNumber2;
  } else if (type === 1) {
    while (randomNumber2 === 0 || randomNumber1 % randomNumber2 !== 0) {
      randomNumber1 = randomNumber(1, 10);
      randomNumber2 = randomNumber(1, 10);
    }
    question = `Q. What is ${randomNumber1} divided by ${randomNumber2} ?`;
    answer = randomNumber1 / randomNumber2;
  } else if (type === 2) {
    question = `Q. What is the sum of ${randomNumber1} and ${randomNumber2} ?`;
    answer = randomNumber1 + randomNumber2;
  } else {
    question = `Q. What is ${randomNumber1} minus ${randomNumber2} ?`;
    answer = randomNumber1 - randomNumber2;
  }

  return { question, answer };
};

const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  storedAnswer = answer;
};
showQuestion();

const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(questionFormEl);

  const userAnswer = +formData.get("answer");
  if (userAnswer === storedAnswer) {
    score += 1;
  } else {
    score -= 1;
  }
  scoreEl.innerText = score;
  event.target.reset();
  showQuestion();
};