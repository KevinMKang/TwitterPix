let accessToken;
let userID;
let refreshToken;
let loggedIn = false;
let requestTab;

chrome.storage.sync.set({"loggedIn": 'none'});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if(!sender.tab){
			login(request.username, request.password);
		}else{
			if(loggedIn){
				requestTab = sender.tab;
				bookmarkRequest(request.id);
			}else{
				
			}
		}
	}
);
const baseURL = 'https://app-api.pixiv.net/';

function bookmarkRequest(id){
	if(!userID){
		return false;
	}

	let url = 'https://app-api.pixiv.net/v2/illust/bookmark/add'
    let data = {
        'illust_id': id,
		'restrict': 'public'
    }
	let headers = {
		'App-OS': 'ios',
		'App-OS-Version': '10.3.1',
		'App-Version': '6.7.1',
		'Authorization' : 'Bearer '+ accessToken
	}

	
	$.ajax({
		url: url,
		type: 'POST',
		data: data,
		headers: headers,
		dataType: 'json',	
		success: function (data, txtstatus, xhr){

			chrome.tabs.sendMessage(requestTab.id, {id: id});			
		},
		error: function (data){
 
		}
	});
	
}

function login(name, pw){
	let url = 'https://oauth.secure.pixiv.net/auth/token';
	
	let headers = {
		'App-OS': 'ios',
		'App-OS-Version': '10.3.1',
		'App-Version': '6.7.1',
	}
	let data = {
		'get_secure_url': 1,
		'client_id': 'bYGKuGVw91e0NMfPGp44euvGt59s',
		'client_secret': 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK',
	} //standard iOS app client_id and secret
	data.grant_type = 'password';
	data.username = name;
	data.password = pw;
	$.ajax({
		url: url,
		type: 'POST',
		data: data,
		headers: headers,
		dataType: 'json',
		success: function (data){

			accessToken = data.response.access_token;
			userID = data.response.user.id;
			refreshToken = data.response.refreshToken;
			loggedIn=true;

			chrome.storage.sync.set({"loggedIn": 'success'});
		},
		error: function (data){
	
			chrome.storage.sync.set({"loggedIn": 'fail'});
   
		}		
	});	
}