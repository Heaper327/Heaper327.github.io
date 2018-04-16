var password="不得了不得了"
var privateContent="看什么看"

function check(){
	input=document.getElementById("inputPswd");
	button=document.getElementById("submitPswd");
	content=document.getElementById("contentPswd");
	container=document.getElementById("containerPswd");
	if (input.value==password){
		button.style.display="none";
		input.style.display="none";			
		container.style.display="none";
		content.style.backgroundColor="transparent";
		content.style.textAlign="left";
		content.innerHTML=privateContent;
	}
	else{
		input.value="";
		alert("wrong password!");
	}
}

function setTimer(){
	var date = new Date();
	date = date.toString();
	document.getElementById("time").innerHTML=date.substring(0,date.indexOf("G"));
	setTimeout(setTimer, 500);
}
