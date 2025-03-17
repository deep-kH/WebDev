// Import and Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication
const signInBtn = document.getElementById("signInBtn");
const registerBtn = document.getElementById("registerBtn");

signInBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("User signed in successfully!");
        showExamSection();
    } catch (error) {
        alert("Error: " + error.message);
    }
});

registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User registered successfully!");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Fetch Questions
const questionsContainer = document.getElementById("questions-container");

const loadQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, "questions"));
    querySnapshot.forEach((doc) => {
        const questionData = doc.data();
        const questionEl = document.createElement("div");
        questionEl.innerHTML = `
      <p>${questionData.text}</p>
      ${questionData.options
                .map((option, index) => `<label><input type="radio" name="${doc.id}" value="${option}"> ${option}</label>`)
                .join("<br>")}
    `;
        questionsContainer.appendChild(questionEl);
    });
};

// Timer
const startTimer = (duration) => {
    const timerEl = document.getElementById("time-left");
    let timeLeft = duration;

    const timerInterval = setInterval(() => {
        timerEl.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Time's up! Submit your answers.");
        }
    }, 1000);
};

// Show Exam Section
const showExamSection = () => {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("exam-section").style.display = "block";
    loadQuestions();
    startTimer(300); // 5-minute timer
};

// Submit Answers and Save Score
document.getElementById("exam-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    let score = 0;
    const formData = new FormData(e.target);

    const querySnapshot = await getDocs(collection(db, "questions"));
    querySnapshot.forEach((doc) => {
        const correctAnswer = doc.data().correctAnswer;
        if (formData.get(doc.id) === correctAnswer) score++;
    });

    // Save score to Firestore
    const user = auth.currentUser;
    await setDoc(doc(db, "scores", user.uid), { score });

    alert("Exam submitted! Your score: " + score);
    showLeaderboard();
});

// Show Leaderboard
const showLeaderboard = () => {
    document.getElementById("exam-section").style.display = "none";
    document.getElementById("leaderboard").style.display = "block";

    const leaderboardList = document.getElementById("leaderboard-list");
    onSnapshot(collection(db, "scores"), (snapshot) => {
        leaderboardList.innerHTML = "";
        snapshot.forEach((doc) => {
            const scoreData = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `User: ${doc.id} - Score: ${scoreData.score}`;
            leaderboardList.appendChild(listItem);
        });
    });
};
