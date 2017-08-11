MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let target = document.getElementById("stream-items-id");
chrome.runtime.connect();
function getPixivID(url){
	
}

function sendBookmarkRequest(id){
	chrome.runtime.sendMessage({"id" : id}, function(response){
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

	if(request.id !== null){
		document.getElementById(request.id).textContent = "Bookmarked on Pixiv";
	}
});


function createBookmarkButton(id){
	let div = document.createElement("div");
	div.className = 'ProfileTweet-action';
	let press = document.createElement("button");
	press.id = id;
	press.style.fontSize = "12px";
	press.appendChild(document.createTextNode("Bookmark on Pixiv"));
	div.appendChild(press);
	press.addEventListener("click", function(){
		sendBookmarkRequest(id);
	});		
	return div;
}


var markWithButton = function(val, index, list){
	let tweetContent = val.childNodes[1].childNodes[3];
	let tweetText = tweetContent.querySelector(".js-tweet-text-container");
	let tweetTextLink = tweetText.querySelector(".twitter-timeline-link");
	if(tweetTextLink !== null){
		if(tweetTextLink.title.indexOf("pixiv")!==-1){
			//console.log(tweetTextLink.getAttributeNode("data-expanded-url").value);
			let pixlink = tweetTextLink.getAttributeNode("data-expanded-url").value;
			let id = pixlink.substring(pixlink.lastIndexOf("id=")+3);
			tweetContent.querySelector(".stream-item-footer").querySelector(".ProfileTweet-actionList").appendChild(createBookmarkButton(id));								
		}
	}
	//console.log(tweetContent.querySelector(".js-tweet-text-container").childNodes);
	//console.log(tweetContent.querySelector(".stream-item-footer").childNodes);	
}
target.querySelectorAll(".stream-item").forEach(markWithButton);

let observer = new MutationObserver(function(mutations, observer){
	//console.log(mutations);
	for(mutationRecord of mutations){
		
		mutationRecord.addedNodes.forEach(markWithButton);
	}
});

observer.observe(target, {
	childList: true,
});

