<?php session_start();
if(isset($_SESSION)){
    if(isset($_SESSION['user'])){
        unset($_SESSION['user']);
        unset($_SESSION['password']);
    }

}
header("location:index.php");