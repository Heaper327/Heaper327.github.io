<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Examples</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">
</head>

<body>
    <?php
    	if ($_FILES['file']['error']>0){
    		echo "Error!";
    	}
    	else {
    		echo "filename: ".$_FILES['file']['name']."<br/>";
    		echo "file position: ".$_FILES['file']['tmp_name']."<br/>";
    		echo basename("/test/test/Asshole");
    	}
    ?>
</body>

</html>