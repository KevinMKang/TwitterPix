function login(){
	chrome.runtime.sendMessage({"username" : document.getElementById("username").value, "password" : document.getElementById("password").value});	
}
/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){	
	if(!sender.tab){
		if(request.loggedIn){
			document.getElementById("loginform").style.display = "none";
			document.getElementById("status").textContent = "Logged In";
		}else{	
			document.getElementById("loginform").style.display = "block";
			document.getElementById("status").textContent = "Failed to login";
		}
	}
});
*/

function setLoginStatus(){
	chrome.storage.sync.get("loggedIn", function(items){		
		if(items.loggedIn === 'success'){
			document.getElementById("loginform").style.display = "none";
			document.getElementById("status").textContent = "Logged In.";
		}
		if(items.loggedIn==='fail'){	
			document.getElementById("loginform").style.display = "block";
			document.getElementById("status").textContent = "Failed to login.";
		}
	});
}

chrome.storage.onChanged.addListener(function(changes, areaName){
	setLoginStatus();
});

setLoginStatus();

document.getElementById('submit').onclick = login;