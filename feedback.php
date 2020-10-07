<?php

//get data pushed
    $sscode=$_POST['put-sscode-here'];
    $name=$_POST['name'];
    $email=$_POST['email'];
    $comment=$_POST['comment'];

// write to file
    file_put_contents('data/feedback/' . $sscode . '-feedback.txt', $sscode . ',' . $name . ',' . $email . ',' . $comment, FILE_APPEND);

//direct back to debriefing
    header('Location: feedback-letter.html');
    exit;

?>