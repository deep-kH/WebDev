// Array to store the questions and their details (admin side)
let examData = [];

// Function to add a new question to the admin panel
function addQuestion() {
    const questionId = examData.length + 1;
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');
    
    // Question Text
    const questionTextLabel = document.createElement('label');
    questionTextLabel.textContent = `Question ${questionId}: `;
    const questionTextInput = document.createElement('input');
    questionTextInput.type = 'text';
    questionTextInput.placeholder = 'Enter question text';
    questionTextInput.required = true;

    // Answer type
    const answerTypeLabel = document.createElement('label');
    answerTypeLabel.textContent = 'Answer Type: ';
    const answerTypeSelect = document.createElement('select');
    answerTypeSelect.innerHTML = `<option value="MCQ">Multiple Choice</option><option value="ShortAnswer">Short Answer</option>`;
    answerTypeSelect.addEventListener('change', () => toggleOptionsVisibility(answerTypeSelect, questionContainer));

    // Option fields (initially hidden for short answers)
    const optionsContainer = document.createElement('div');
    optionsContainer.style.display = 'none';

    // Option 1
    const option1Label = document.createElement('label');
    option1Label.textContent = 'Option 1: ';
    const option1Input = document.createElement('input');
    option1Input.type = 'text';
    option1Input.placeholder = 'Enter option 1';
    const correctAnswerCheckbox1 = document.createElement('input');
    correctAnswerCheckbox1.type = 'checkbox';
    correctAnswerCheckbox1.name = 'correct-answer';
    const correctAnswerLabel1 = document.createElement('label');
    correctAnswerLabel1.textContent = 'Correct Answer';

    optionsContainer.appendChild(option1Label);
    optionsContainer.appendChild(option1Input);
    optionsContainer.appendChild(correctAnswerCheckbox1);
    optionsContainer.appendChild(correctAnswerLabel1);

    // Option 2
    const option2Label = document.createElement('label');
    option2Label.textContent = 'Option 2: ';
    const option2Input = document.createElement('input');
    option2Input.type = 'text';
    option2Input.placeholder = 'Enter option 2';
    const correctAnswerCheckbox2 = document.createElement('input');
    correctAnswerCheckbox2.type = 'checkbox';
    correctAnswerCheckbox2.name = 'correct-answer';
    const correctAnswerLabel2 = document.createElement('label');
    correctAnswerLabel2.textContent = 'Correct Answer';

    optionsContainer.appendChild(option2Label);
    optionsContainer.appendChild(option2Input);
    optionsContainer.appendChild(correctAnswerCheckbox2);
    optionsContainer.appendChild(correctAnswerLabel2);

    // Add question elements to container
    questionContainer.appendChild(questionTextLabel);
    questionContainer.appendChild(questionTextInput);
    questionContainer.appendChild(answerTypeLabel);
    questionContainer.appendChild(answerTypeSelect);
    questionContainer.appendChild(optionsContainer);
    
    document.getElementById('questions-container').appendChild(questionContainer);

    // Add the new question data to the examData array
    examData.push({ id: questionId, text: '', type: 'MCQ', options: [] });
}

// Function to handle saving the form data (which is then sent to the backend)
document.getElementById('exam-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const questions = [];

    // Loop through each question in the form
    const questionElements = document.querySelectorAll('.question');
    questionElements.forEach((questionElement, index) => {
        const questionText = questionElement.querySelector('input[type="text"]').value;
        const answerType = questionElement.querySelector('select').value;
        const options = [];

        // Check if the question type is MCQ, and if so, get the options and correct answer
        if (answerType === 'MCQ') {
            const optionElements = questionElement.querySelectorAll('input[type="text"]');
            const checkboxes = questionElement.querySelectorAll('input[type="checkbox"]');
            
            optionElements.forEach((input, optionIndex) => {
                options.push({
                    option: input.value,
                    isCorrect: checkboxes[optionIndex].checked
                });
            });
        }

        // Create the question object
        questions.push({
            id: examData[index].id,
            text: questionText,
            type: answerType,
            options: options
        });
    });

    // For demo, log the questions. In real use, send this data to your backend (e.g., using AJAX or fetch)
    console.log('Exam Data:', questions);

    // Here, you can save the `questions` to your database via an API call
    // Example:
    // fetch('/saveExam', { method: 'POST', body: JSON.stringify(questions), headers: { 'Content-Type': 'application/json' } })
});
