<?php
session_start();
if(isset($_GET) && !empty($_GET['login']) && !empty($_GET["password"])){
    /*setcookie('user', $_GET['login']);
    setcookie("password", $_GET['password']);*/
    $_SESSION['user'] = $_GET['login'];
    $_SESSION['password'] = $_GET['password'];
}
?>
<html>
<head>
    <title>
        Login form
    </title>

</head>
<body>
<?php
echo count($_COOKIE) . "<br>";
if(empty($_SESSION['user']))
    echo '<form action="index.php" method="get">
    <p><b>Your Name:</b> <input type="text" name="login" /><br />
        <b>Subject:</b> <input type="password" name="password" /><br />
    <p><input type="submit" value="Send it!"></p>
</form>';
else
    echo '
    <h1>Hello, ' . $_SESSION['user'] . '</h1>
    <script src="js/main.js" type="text/javascript"></script>
    <form action="logout.php" method="post">
        <input type="submit" value="exit">
    </form>';

?>
<div>
    <a href="../index.php">home page</a>
</div>
</body>
</html>