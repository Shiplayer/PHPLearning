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
        <div class="form">
            <label class="userPassForm" for="user">user:</label>
            <label class="userPassForm" for="password">password:</label>
        </div>
        <div class="passForm">
            <input type="text" id="user">
            <input type="password" id="password">
        </div>

    </div>
    <div>
        <label for="textField" style="vertical-align: top;">db request:</label>
        <textarea id="textField" cols="40" rows="4"></textarea>
    </div>

    <input type="button" onclick="submitButton()" value="submit">
</div>
<div class="response">

</div>
</body>
</html>
