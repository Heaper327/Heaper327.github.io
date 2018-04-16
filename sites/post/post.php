<!DOCTYPE html>
<html>
 
<!--head start-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Post</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="post.css" rel="stylesheet">
</head>
<!--head end-->

<!--body start-->
<body class="no-cache">

<script src="post.js">
	if (isSafari()) {
    	$(window).bind("pageshow", function (event) {
        	if (event.originalEvent.persisted && $('body').hasClass("no-cache")) {
            	document.body.style.display = "none";
            	window.location.reload();
        	}
    	});
	}
	
	function isSafari() {
   		if (navigator.userAgent.indexOf("Safari") > -1) {
			return true;
    	}
    	return false;
	}
</script>

<?php include 'resources/postGet.php'; ?>

<?php 
	$comment="";
	$commentError="";
	if ($_SERVER['REQUEST_METHOD']=='POST'){
		$comment=cleanInput($_POST['comment']);
		if ($comment==""){
			$commentError="no empty comments please";
		} 
		else {
			postAdd ('post.txt',$comment);
			$_POST['comment']="";
		}
	}
	function cleanInput ($data){
		$data=trim($data);
		$data=stripslashes($data);
		$data= str_replace('{', "%", $data);
		$data= str_replace('}', "%", $data);
		$data=htmlspecialchars($data);
		return $data;
	}
?>

<div class="wrapper">

	<!--header start-->
	<div class="header">
		<h1>Post anything here!</h1>

		<!--map start-->
		<div class="map">
			
		</div>
		<!--map end-->
	</div>

	<!--header end-->

	<div class="content">

		<!--content start-->

		<div class="post" style="display: none;">
			<div class="info">
				<div class="name">
						James
				</div>
				<div class="time">
						2017/12/12
				</div>
			</div>
			<div class="post-content">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar ut eros id rhoncus. Curabitur tincidunt nunc sed bibendum pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ac hendrerit mi, quis cursus mauris. Mauris at sodales elit. Duis auctor, odio et posuere aliquet, lorem mauris condimentum magna, a consectetur magna diam ut dui. Sed auctor nibh nunc, nec ornare urna pharetra ac. Donec eget venenatis est. Donec mauris arcu, ornare eget varius a<blockquote>landit ac urna. Sed porttitor, tortor sit amet venenatis accumsan, nibh ipsum rhoncus urna, vel cursus urna ante quis tortor. Morbi eu porttitor mi. Sed mattis, lorem quis scelerisque ultrices, felis metus aliquam elit, a accumsan eros leo vel orci. Sed dignissim enim sit amet iaculis aliquam. Sed pharetra felis urna, ac consectetur nisi dapibus rhoncus.dkdjsadsjakdl</blockquote><p>
			</div>
		</div>

		<?php
			$makeCell = function ($strContent){
				echo '<div class="post"><div class="post-content"><p>';
				echo $strContent;
				echo '</p></div></div>';
			};
			postGet ('post.txt',$makeCell);
		?>
		<!--content end-->

	</div> 

	<!--comment start-->
	<div class="comment">
		<form action="<?php echo htmlspecialchars($_SERVER[PHP_SELF]);?>" method="post">
			<textarea name="comment"></textarea>
			<input class="comment-submit" type="submit" name="submit" value="Submit your comment">
			<span><?php echo $commentError;?></span>
		</form>
	</div>
	<!--comment end-->

</body>
<!--body end-->

</html>