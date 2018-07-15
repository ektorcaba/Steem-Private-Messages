// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': "http://spm.ektorcaba.com/steem"}, function(tab) {
    localStorage.setItem("lastview", new Date().getTime());
    chrome.browserAction.setBadgeText({text: ""});
  });
});


setInterval(function(){



	if(localStorage.getItem("username")){


		steem.api.getContentReplies(localStorage.getItem("username"), "messages", function(err, result) {

			var myDate = new Date(result[result.length-1].active);
			var offset = myDate.getTimezoneOffset() * 60 * 1000;
			var withOffset = myDate.getTime();
			var withoutOffset = withOffset - offset;


		  if(parseInt(withoutOffset) > parseInt(localStorage.getItem("lastview"))){
		  	chrome.browserAction.setBadgeText({text: "new"});

		  }
		  
		
		});


	}


}, 120000);



//