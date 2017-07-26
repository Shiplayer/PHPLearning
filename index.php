<?php

?>

<html>
<head>

</head>
<body>
<h1>Select page with examples:</h1>
<?php
if($handel = opendir(".")){
    while(false !== ($entry = readdir($handel))){
        if(is_dir($entry) && ($arr = scandir($entry)) !== false){
            if(in_array("index.php", $arr)){
                echo "<li><a href=" . $entry . '\\index.php' . '>' . $entry . '</a></li>';
            }
        }
    }
}

?>
</body>
</html>
