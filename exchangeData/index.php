<?php

?>
<html>
<head>
    <title>Example for exchange data between server and client</title>
    <link rel="stylesheet" href="css/main.css" type="text/css"/>
    <script src="js/exchangeJS.js" type="text/javascript"></script>
</head>
<body>
<h1>
    Example for exchange data between server and client (sending request to database on server and getting response)
</h1>
<div>
    <div>
        <label for="user">user:</label> <input type="text" id="user">
        <label for="password">password:</label> <input type="password" id="password">
    </div>
    <label for="textField">db request:</label>
    <textarea id="textField" cols="40" rows="4"></textarea>
    <input type="button" onclick="submitButton()" value="submit">
</div>
<div class="response">

</div>
</body>
</html>
