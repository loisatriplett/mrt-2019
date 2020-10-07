<?php

  //get data pushed
  $studyid=$_POST['put-studyid-here'];
  $sscode=$_POST['put-sscode-here'];
  $data=$_POST['put-data-here'];

// write 2back data to file
    file_put_contents('data/mrt/' . $studyid . '-' . $sscode . '-data.txt', $data, FILE_APPEND);

// write ss code to list
    file_put_contents('data/mrt/data-submit-list.txt', $sscode . PHP_EOL, FILE_APPEND);

//direct to questionnaires
    header('Location: demo.html');
    exit;
?>

