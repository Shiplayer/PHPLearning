<?php
if(count($_GET) > 2){
    setcookie("user", $_GET['login']);
    setcookie("password", $_GET['password']);
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
echo count($_COOKIE);
if(!is_null($_COOKIE))
    echo '<form action="index.php" method="get">
    <p><b>Your Name:</b> <input type="text" name="login" /><br />
        <b>Subject:</b> <input type="password" name="password" /><br />
    <p><input type="submit" value="Send it!"></p>
</form>';
else
    echo '
    <h1>Hello, ' . $_COOKIE['user'] . '</h1>';
?>

</body>
</html>