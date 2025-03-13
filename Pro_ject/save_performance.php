<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userScore = $_POST['score'];
    $userName = $_POST['username'];

    // Retrieve existing scores
    $file = 'scores.json';
    if (file_exists($file)) {
        $scores = json_decode(file_get_contents($file), true);
    } else {
        $scores = [];
    }

    // Add the new score
    $scores[] = ['username' => $userName, 'score' => $userScore];

    // Save the scores back to the file
    file_put_contents($file, json_encode($scores));

    echo "Score saved successfully!";
}
?>
