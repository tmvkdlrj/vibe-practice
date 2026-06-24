// 퀴즈 문제 데이터 (선생님이 원하는 대로 추가/수정 가능!)
const questions = [
    {
        question: "1. 1919년 고종의 인산일을 계기로 일어난 일제강점기 최대 규모의 민족 운동은 무엇일까요?",
        answers: [
            { text: "6·10 만세 운동", correct: false },
            { text: "3·1 운동", correct: true },
            { text: "광주 학생 항일 운동", correct: false },
            { text: "물산 장려 운동", correct: false }
        ]
    },
    {
        question: "2. 조선 후기, 실전 위주의 학문을 강조하며 토지 제도 및 정치 개혁을 주장했던 사상은 무엇일까요?",
        answers: [
            { text: "성리학", correct: false },
            { text: "실학", correct: true },
            { text: "동학", correct: false },
            { text: "불교", correct: false }
        ]
    },
    {
        question: "3. 1910년 국권 피탈 이후, 만주와 연해주 등 국외에 세워진 독립운동가들의 군사 기지 및 훈련소 역할을 한 대표적인 단체는?",
        answers: [
            { text: "독립협회", correct: false },
            { text: "신민회 (신흥무관학교)", correct: true },
            { text: "대한자강회", correct: false },
            { text: "보안회", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score-text');
const quizElement = document.getElementById('quiz');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// 퀴즈 시작
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    quizElement.classList.remove('hide');
    showQuestion();
}

// 문제 표시
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// 보기 초기화
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// 답안 선택 시 처리
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    // 답을 고르면 다른 버튼들은 클릭하지 못하게 막고 정답 버튼을 보여줌
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        // 모든 문제가 끝났을 때
        setTimeout(showScore, 1500); // 마지막 문제 확인 후 1.5초 뒤 결과창 전환
    }
}

// 결과 화면 표시
function showScore() {
    quizElement.classList.add('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreText.innerText = `🎉 퀴즈 종료! 🎉\n\n${questions.length}문제 중 ${score}문제를 맞혔습니다!`;
}

// 다음 문제 버튼 이벤트
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

// 다시하기 버튼 이벤트
restartButton.addEventListener('click', startQuiz);

// 페이지 로드 시 바로 시작
startQuiz();
