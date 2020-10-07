<?php

  //get data pushed
  $studyid=$_POST['put-study-id-here'];
  $sscode=$_POST['put-ss-code-here'];
  $data=$_POST['put-demo-data-here'];

// write survey data to file
    file_put_contents('data/demo/' . $studyid . '-' . $sscode . '-demo-data.txt', $data, FILE_APPEND);

// write ss code to list
    file_put_contents('data/demo/demo-submit-list.txt', $sscode . PHP_EOL, FILE_APPEND);

  include("feedback-letter.html");
?>

