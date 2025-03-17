document.addEventListener("DOMContentLoaded", () => {
    // Register user
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    // Login user
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    // Fetching and displaying available exams
    if (document.getElementById("exam-list-container")) {
        getAvailableExams();
    }

    // Handling exam submission
    if (document.getElementById("exam-form")) {
        // You would dynamically add questions here
    }
});

// Register user logic
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const email = document.getElementById("new-email").value;

    // Here you'd send the data to your backend to register the user
    console.log("Registering user:", username, email);

    // Redirect to login after registration
    window.location.href = "index.html";
}

// Login user logic
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Here you'd validate user login with your backend
    console.log("Logging in:", username);

    // After login, redirect to the list of exams
    document.getElementById("login-container").style.display = "none";
    document.getElementById("exam-list-container").style.display = "block";
}

// Fetch available exams from backend (mock data here)
function getAvailableExams() {
    // Example mock data (should be fetched from your API)
    const exams = [
        { id: 1, name: "Aptitude for placements" },
        { id: 2, name: "LBS mock exam" }
    ];

    const examList = document.getElementById("exam-list");
    exams.forEach(exam => {
        const li = document.createElement("li");
        li.textContent = exam.name;
        li.addEventListener("click", () => takeExam(exam.id));
        examList.appendChild(li);
    });
}

// Simulate taking an exam
function takeExam(examId) {
    // Redirect to the exam page (this would normally load the questions)
    window.location.href = "exam.html?exam_id=" + examId;
}

// Example of how to render questions in an exam page
// Function to fetch and render exam questions on the student page
function renderExamQuestions(examId) {
    fetch(`http://localhost:5000/exam/${examId}/questions`)
        .then(response => response.json())
        .then(data => {
            const questions = data.questions;
            const form = document.getElementById('exam-form');

            questions.forEach((question) => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');

                const questionText = document.createElement('p');
                questionText.textContent = question.text;
                questionElement.appendChild(questionText);

                // If the question is MCQ
                if (question.type === 'MCQ') {
                    question.options.forEach((option, index) => {
                        const label = document.createElement('label');
                        const input = document.createElement('input');
                        input.type = 'radio';
                        input.name = `question-${question.id}`;
                        input.value = option.option;
                        label.appendChild(input);
                        label.appendChild(document.createTextNode(option.option));
                        questionElement.appendChild(label);
                    });
                }

                form.appendChild(questionElement);
            });
        })
        .catch(error => console.error('Error fetching exam questions:', error));
}

// Call this function when the page loads to render the questions dynamically
window.onload = function () {
    const examId = 1; // You should replace this with the actual exam ID
    renderExamQuestions(examId);
};


// Handle exam submission
function submitExam() {
    // Collect answers from the form and send them to the backend
    alert("Exam submitted!");
}
