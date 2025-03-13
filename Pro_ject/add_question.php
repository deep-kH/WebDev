<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $question = $_POST['question'];
    $answer = $_POST['answer'];

    // Retrieve existing questions
    $file = 'questions.json';
    if (file_exists($file)) {
        $questions = json_decode(file_get_contents($file), true);
    } else {
        $questions = [];
    }

    // Add the new question
    $questions[] = ['question' => $question, 'answer' => $answer];

    // Save the questions back to the file
    file_put_contents($file, json_encode($questions));

    echo "Question added successfully!";
}
?>
