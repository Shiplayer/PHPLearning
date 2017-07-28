<?php
session_start();
if(!is_null($_GET) &&  isset($_SESSION['user'])){
    $dbh =  new PDO('mysql://localhost:3306/test', $_SESSION['user'], $_SESSION['password']);
    $query = $dbh->query($_GET['query']);
    header('Content-Type: text/html; charset=utf-8', true, 200);
    if($query)
        echo json_encode($query->fetchAll());
    else
        echo '$query is return false (' . urldecode($_GET['query']) . ')';
} else{
    header("Content-Type: text/html; charset=utf-8", true, 401);
    echo 'You are unauthorized';
}