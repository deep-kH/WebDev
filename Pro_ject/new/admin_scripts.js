document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-form');
    const questionTableBody = document.querySelector('#question-table tbody');

    let questions = [];

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const question = adminForm.question.value;
        const answer = adminForm.answer.value;
        
        // Send question to server
        fetch('add_question.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `question=${encodeURIComponent(question)}&answer=${encodeURIComponent(answer)}`
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            questions.push({ question, answer });
            adminForm.reset();
            alert('Question added successfully!');
            updateQuestionTable();
        })
        .catch(error => console.error('Error:', error));
    });

    function updateQuestionTable() {
        questionTableBody.innerHTML = '';
        questions.forEach((q, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${q.question}</td>
                <td>${q.answer}</td>
                <td><button onclick="editQuestion(${index})">Edit</button></td>
                <td><button onclick="deleteQuestion(${index})">Delete</button></td>
            `;
            questionTableBody.appendChild(row);
        });
    }

    window.editQuestion = (index) => {
        const newQuestion = prompt('Edit Question:', questions[index].question);
        const newAnswer = prompt('Edit Answer:', questions[index].answer);
        if (newQuestion !== null && newAnswer !== null) {
            questions[index].question = newQuestion;
            questions[index].answer = newAnswer;
            updateQuestionTable();
        }
    };

    window.deleteQuestion = (index) => {
        if (confirm('Are you sure you want to delete this question?')) {
            questions.splice(index, 1);
            updateQuestionTable();
        }
    };
});
