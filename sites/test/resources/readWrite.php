<!DOCTYPE html>
<html>

<!--head start-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>PHP test field</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
</head>
<!--head end-->

<!--style start-->
<style>

</style>
<!--style end-->

<!--script start-->
<script>

</script>
<!--script end-->

<!--body start-->
<body>
	<?php
		$nameError=$emailError="";
		$name=$email="";
		$allRight=-1;
		if ($_SERVER['REQUEST_METHOD']=="POST"){
			$allRight=0;
			if (empty($_POST["name"])) {
    			$nameError = "Name is required";
    			$allRight = -1;
  			} else {
    			$name = input($_POST["name"]);
  			}
  			if (empty($_POST["email"])) {
    			$emailError = "Email is required";
    			$allRight = -1;
  			} else {
    			$email = input($_POST["email"]);
  			}
		}
		function input($input){
			$input=trim($input);
			$input=stripslashes($input);
			$input=htmlspecialchars($input);
			return $input;
		}
	?>
	<form method="post" action=<?php echo input($_SERVER["PHP_SELF"]); ?>>
		Name: <input type="text" name="name" value=<?php echo $name?>><span>* <?php echo $nameError?> </span><br/>
		Email: <input type="text" name="email" value=<?php echo $email?>><span>* <?php echo $emailError?> </span><br/>
		<input type="submit" name="submit" value="submit">
	</form>
	<?php
		if ($allRight==0){
			echo '<h2>Result:</h2>';
			echo 'name: '.$name.'<br/>';
			echo 'email: '.$email.'<br/>';
			$record = '{'.'name='.$name.";".'email='.$email.";".'}';
			$file = fopen('./resources/record.txt','a');
			echo $file;
			fwrite($file, $record);
			fclose($file);
		}
	?>
</body>
<!--body end-->

</html>