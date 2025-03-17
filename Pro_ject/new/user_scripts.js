document.addEventListener('DOMContentLoaded', () => {
    const testArea = document.getElementById('test-area');
    const startTestButton = document.getElementById('start-test');
    const leaderboard = document.getElementById('leaderboard');
    const performanceStats = document.getElementById('performance-stats');

    let questions = [];
    let userScores = [];

    // Fetch questions from server
    fetch('get_questions.php')
        .then(response => response.json())
        .then(data => {
            questions = data;
            console.log('Questions loaded:', questions);
        })
        .catch(error => console.error('Error loading questions:', error));

    startTestButton.addEventListener('click', () => {
        const userName = prompt("Please enter your name:");
        if (!userName) {
            alert("Name is required to start the test.");
            return;
        }

        testArea.innerHTML = '';
        questions.forEach((q, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                <input type="text" data-answer="${q.answer}">
            `;
            testArea.appendChild(div);
        });
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Test';
        submitButton.addEventListener('click', () => submitTest(userName));
        testArea.appendChild(submitButton);
    });

    function submitTest(userName) {
        let score = 0;
        const inputs = testArea.querySelectorAll('input[data-answer]');
        inputs.forEach(input => {
            if (input.value === input.getAttribute('data-answer')) {
                score++;
            }
        });
        userScores.push({ username: userName, score: score });
        updateLeaderboard();
        updatePerformanceStats();
        alert(`Test submitted! Your score is: ${score}`);
        
        // Save the score to the server
        fetch('save_performance.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `score=${score}&username=${encodeURIComponent(userName)}`
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    function updateLeaderboard() {
        leaderboard.innerHTML = '<h3>Leaderboard</h3>';
        userScores.forEach((entry, index) => {
            const div = document.createElement('div');
            div.textContent = `${entry.username}: ${entry.score}`;
            leaderboard.appendChild(div);
        });
    }

    function updatePerformanceStats() {
        const totalScore = userScores.reduce((acc, entry) => acc + entry.score, 0);
        const averageScore = totalScore / userScores.length;
        performanceStats.innerHTML = `
            <h3>Performance Statistics</h3>
            <p>Total Tests Taken: ${userScores.length}</p>
            <p>Average Score: ${averageScore.toFixed(2)}</p>
        `;
    }
});
