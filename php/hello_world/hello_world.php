<?php
echo "Hello World!" . "\n"; // operator. = operator+

$x = 5; // global variable
$y = 5; // and this

function helloWorld(){
	ECHO "hello" . " world" . "!" . "\n"; //<br /> in html and not case sensitive.
}

helloWorld();

function Add($a, $b){
	$number = func_num_args(); // func_num_args() - return number of args
	print "number of args: $number \n";
	$args_list = func_get_args(); // func_get_args() - return array of args
	for($i = 0; $i < $number; $i++){
//		if(!is_callable($args_list[$i])) // is_callable() is function that can verify that type the variable can be called as a function 
		print "args[$i]: " . $args_list[$i] . "\n"; //the same thing that echo
	}
//	$args_list = func_get_args();
	return $a + $b; // return a + b
}

echo Add($x, $y) . "\n";
//echo Add(function(){return $x + $y;}, $y) . "\n"; //it is not easy...
?>
