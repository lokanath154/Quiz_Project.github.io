const questions=[
	{
		question:"what is the favourite food of Lokanath?",
		answers:
			[
				{text:"Rasogola",correct:true},
				{text:"Momo",correct:false},
				{text:"Pizza",correct:false},
				{text:"Berger",correct:false},

			]

	},
	{
		question:"What is the hobby of Lokanath?",
		answers:
			[
				{text:"Reading Scriptures",correct:false},
				{text:"Singing Songs",correct:false},
				{text:"Bike Riding",correct:true},
				{text:"Fishing",correct:false},

			]

	},
	{
		question:"What is area of expertise of Lokanath?",
		answers:
			[
				{text:"Node JS",correct:false},
				{text:"AWS",correct:false},
				{text:"ML",correct:false},
				{text:"JAVA",correct:true},

			]

	},
	{
		question:"Who is the father of Lokanath Samal?",
		answers:
			[
				{text:"Laxmidhar Samal",correct:true},
				{text:"Ankit Mishra",correct:false},
				{text:"Debang Prasad Jena",correct:false},
				{text:"Shibuna Samal",correct:false},

			]

	}
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
	currentQuestionIndex=0;
	score=0;
	nextButton.innerHTML="Next";
	showQuestion();

}
function showQuestion()
{
	resetState();
	let currentQuestion=questions[currentQuestionIndex];
	let questionNo=currentQuestionIndex+1;
	questionElement.innerHTML=questionNo+". "+currentQuestion.question;

	currentQuestion.answers.forEach(answer=>{
		const button=document.createElement("button");
		button.innerHTML=answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct)
		{
			button.dataset.correct=answer.correct;
		}
		button.addEventListener("click",selectAnswer);


	});  
}
function resetState()
{
	nextButton.style.display="none";
	while(answerButtons.firstChild)
	{
		answerButtons.removeChild(answerButtons.firstChild);
	}

 }
function selectAnswer(e)
{
	const selectedBtn= e.target;
	const isCorrect=selectedBtn.dataset.correct ==="true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}
	else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button=>{
		if(button.dataset.correct=== "true"){
			button.classList.add("correct");
		}
		button.disabled = "true";
	});
	nextButton.style.display= "block";

}
function showScore(){
	resetState();
	questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML ="play again";
	nextButton.style.display="block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}else{
		showScore();
	}
}

nextButton.addEventListener("click",()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
});
startQuiz();
