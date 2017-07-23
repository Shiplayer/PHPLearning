<?php

if(!is_null($_GET)){
    $dbh =  new PDO('mysql://localhost:3306/test', $_GET['user'], $_GET['password']);
    $query = $dbh->query($_GET['query']);
    header('Content-Type: text/html; charset=utf-8', true, 200);
    if($query)
        echo json_encode($query->fetchAll());
    else
        echo '$query is return false (' . urldecode($_GET['query']) . ')';
}