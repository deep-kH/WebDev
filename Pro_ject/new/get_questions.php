<?php
// Retrieve existing questions
$file = 'questions.json';
if (file_exists($file)) {
    $questions = json_decode(file_get_contents($file), true);
    echo json_encode($questions);
} else {
    echo json_encode([]);
}
?>
