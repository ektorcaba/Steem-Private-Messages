if(!Cookies.get('username')){
	location.href = "/login";
}


var simplemde = new SimpleMDE();

const accesstoken = Cookies.get('access_token');
var username = Cookies.get('username');
const nameChannel = "messages";
const steembundle = require('steem');

$("#from").val(username);

const api = sc2.Initialize({
  app: 'steemcodeit.com',
  callbackURL: 'http://spm.ektorcaba.com/success',
  accessToken: accesstoken,
  scope: ['vote', 'comment', 'custom_json']
});

var private_memo = ""; //active privada remitente
var public_memo = "";

if(Cookies.get('memo_key')){
	private_memo = Cookies.get('memo_key');
}




//COMPRUEBA QUE EXISTA EL CANAL SI NO LO CREA
steem.api.getContent(username, nameChannel, function(err, result) {
  //console.log(err, result);

  if(result.id == 0){
  	alert("Creating you Private messages channel. Accept this box and wait a few seconds for auto refresh.");
  	console.log("CHANNEL NOT FOUND!, CREATING...");





		api.comment("", "messages", username, nameChannel, "My messages", "## This is my channel for Private messages, get your own Private messages channel on [spm.ektorcaba.com](http://spm.ektorcaba.com) and [more info](https://steemit.com/steemit/@ektorcaba/new-steem-private-messages-spm)", '{"tags":["messages"]}', function (err, result) {

  			console.log(err, result);

		//steem.broadcast.comment(wif, "", "messages", username, nameChannel, "My messages", "## This is my channel for Private messages, get your own Private messages channel on www.com", '{"tags":["messages"]}', function(err, result) {
		  //console.log(err, result);
		  if(result.result.id){

					if(!err){
					  	alert("Your channel has been created, enjoy!.");
					  	alert("WARNING: You have to set your private memo key in order to receive and send messages. Until this not set you cannot receive or send anything.");
					  	console.log("CHANNEL CREATED!");
					  	location.reload();
				  	}



		  }
		});

	  


  }else{

  	if(private_memo==""){
		alert("WARNING: You have to set your private memo key in order to receive and send messages. Until this not set you cannot receive or send anything.");	
  	}


  }

});









function receiveMessages(){

	//steem.api.getContent(username, nameChannel, function(err, main_result) {
	api.me(function (err, main_result) {	
	//console.log(err, main_result);

		//PILLA LOS MENSAJES Y LOS DECODIFICA  
		steem.api.getContentReplies(username, nameChannel, function(err, result) {
		  //console.log(err, result);

		  result.forEach(function(item){
		  	var jdata = JSON.parse($.parseJSON(item.json_metadata));
		  	

		  	if(jdata["is_encrypted"] == "true"){
		  		

		  		var et = steembundle.memo.decode(private_memo, item.title);
		  		var eb = steembundle.memo.decode(private_memo, item.body);


var converter = new showdown.Converter();


steem.api.getActiveVotes(item.author, item.permlink, function(err, vresult) {

var like = '<i onclick="vote(\''+item.author+'\',\''+item.permlink+'\'); $(this).prop(\'disabled\',true);" class="far fa-thumbs-up text-secondary vote"></i>';

try{
	vresult.forEach(function(it){

		if((it["voter"] == username) && (it["weight"]>0)){
			like = '<i onclick="unvote(\''+item.author+'\',\''+item.permlink+'\'); $(this).prop(\'disabled\',true);" class="fas fa-thumbs-up text-success voted"></i>';
			
		}else{
			like = '<i onclick="vote(\''+item.author+'\',\''+item.permlink+'\'); $(this).prop(\'disabled\',true);" class="far fa-thumbs-up text-secondary vote"></i>';
			
		}

	});

}catch(e){

	like = '<i onclick="vote(\''+item.author+'\',\''+item.permlink+'\'); $(this).prop(\'disabled\',true);" class="far fa-thumbs-up text-secondary vote"></i>';

}



try {
		  	
				  		if(main_result.user_metadata["read"].indexOf(item.permlink) == -1){
				  			//NO LEIDO
							if ($('#'+item.permlink).length === 0) {
							    $("#messages_board").prepend('<tr id="'+item.permlink+'"><td><!--<input type="checkbox">//--> <a href="#" class="text-success" onclick="showMsg(\''+item.parent_author+'\',\''+item.permlink+'\')"><i class="far fa-envelope"></i></i></a></td><td><strong>@'+ item.author +'</strong></td><td><strong>'+atob(et.substring(1, et.length))+'</strong></td><td><strong>'+item.active+'</strong></td><td><a href="#" class="text-success" onclick="showMsgBox(); $(\'#to\').val(\''+item.author+'\'); $(\'#subject\').val(\'RE:'+atob(et.substring(1, et.length))+'\');"><i class="fas fa-share-square"></i></a></td><td>'+like+'</td></tr><tr class="'+item.permlink+'" style="display:none;"><td colspan="6">'+converter.makeHtml(atob(eb.substring(1, eb.length)))+'</td></tr>');

							}

				  		}else{
				  			//LEIDO
				  			//console.log(item);
							if ($('#'+item.permlink).length === 0) {
							    $("#messages_board").prepend('<tr id="'+item.permlink+'"><td><!--<input type="checkbox">//--> <a href="#" class="text-success" onclick="showMsg(\''+item.parent_author+'\',\''+item.permlink+'\')"><i class="far fa-envelope-open"></i></i></a></td><td>@'+ item.author +'</td><td>'+atob(et.substring(1, et.length))+'</td><td>'+item.active+'</td><td><a href="#" class="text-success" onclick="showMsgBox(); $(\'#to\').val(\''+item.author+'\'); $(\'#subject\').val(\'RE:'+atob(et.substring(1, et.length))+'\');"><i class="fas fa-share-square"></i></a></td><td>'+like+'</td></tr><tr class="'+item.permlink+'" style="display:none;"><td colspan="6">'+converter.makeHtml(atob(eb.substring(1, eb.length)))+'</td></tr>');

							}

				  		}


	}
	catch(err) {



		if ($('#'+item.permlink).length === 0) {
		    $("#messages_board").prepend('<tr id="'+item.permlink+'"><td><!--<input type="checkbox">//--> <a href="#" onclick="showMsg(\''+item.parent_author+'\',\''+item.permlink+'\')" class="text-success"><i class="far fa-envelope"></i></i></a></td><td><strong>@'+ item.author +'</strong></td><td><strong>'+atob(et.substring(1, et.length))+'</strong></td><td><strong>'+item.active+'</strong></td><td><a href="#" class="text-success" onclick="showMsgBox(); $(\'#to\').val(\''+item.author+'\'); $(\'#subject\').val(\'RE:'+atob(et.substring(1, et.length))+'\');"><i class="fas fa-share-square"></i></a></td><td>'+like+'</td></tr><tr class="'+item.permlink+'" style="display:none;"><td colspan="6">'+converter.makeHtml(atob(eb.substring(1, eb.length)))+'</td></tr>');

		}

}  	
		  	

});

  		




		  	}




		  });


		});


		
	});

}


receiveMessages();

setInterval(function(){
	receiveMessages();
}, 180000);




function showMsg(to,id){

	$("."+id).toggle();
	$("#row_"+ id).toggleClass( "far fa-envelope-open",true);
	readedMsg(to,id);

}




function readedMsg(to,permlink){


//steem.api.getContent(username, nameChannel, function(err, result) {
api.me(function (err, result) {

	try{

  			//console.log(err);

  		
		  		if(result.user_metadata["read"].indexOf(permlink) == -1){

					result.user_metadata["read"].push(permlink);


					//steem.broadcast.customJson(wif, [], [username], "private_messages", txorig_json, function(err, resultcustom) {
						api.updateUserMetadata(result.user_metadata, function (err, res) {
						  console.log(err, res)



						});						



		  		}
	}
	catch{

						api.updateUserMetadata({"read":[permlink]}, function (err, res) {
						  console.log(err, res)
						});	

	}




});


}


$("#msgForm").submit(function(e){
	e.preventDefault();
	
	$("#btnsubmit").prop("disabled",true);

	sendMsg($("#to").val(),$("#subject").val(),$("#msg").val());
});

$("input#memo").change(function(){

	steem.api.getAccounts([username], function(err, accres) {
		var memo_is_valid = steem.auth.wifIsValid($("input#memo").val(), accres[0].memo_key);

		if(memo_is_valid){

			$("#memo_box").removeClass("alert-danger");
			Cookies.set('memo_key', $("input#memo").val(), { expires: 7 });

			private_memo = $("input#memo").val();

		}else{
			$("#memo_box").addClass("alert-danger",true);
			Cookies.remove('memo_key');
		}
	});



});



function vote(author,permlink){

	api.vote(username, author, permlink, 10000, function (err, res) {
	  location.reload();
	});
}



function unvote(author,permlink){
	api.vote(username, author, permlink, 0, function (err, res) {
	  location.reload();
	});
}



function sendMsg(to,subject,body){

	if(private_memo != ""){

		
		steem.api.getContent(to, nameChannel, function(err, res) {

			if(res.id == 0){
				alert("Sorry!, user " + to + " don't have a Private messages channel created. You can send a transfer to contact with him.");
			}else{
				steem.api.getAccounts([to], function(err, accres) {
					
					var encodedtitle = steembundle.memo.encode(private_memo, accres[0].memo_key,"#"+btoa(subject));
					var encoded = steembundle.memo.encode(private_memo, accres[0].memo_key,"#"+btoa(body));

					var commentPermlink = steem.formatter.commentPermlink(to, encodedtitle.substring(1, encodedtitle.length).toLowerCase());


					api.comment(to, nameChannel, username, commentPermlink, encodedtitle, encoded, '{"tags":["messages"],"is_encrypted":"true"}', function (err, result) {

					//ENVIA UN MENSAJE
					//steem.broadcast.comment(chanowif, to, nameChannel, username, "private-message-"+new Date().getTime(), encodedtitle, encoded, '{"tags":["messages"],"is_encrypted":"true"}', function(err, result) {
					  console.log(err, result);
					  if(result){
					  	alert("Success!, your message has been sent.");
					  	console.log("Your Message has been sent!");

					  	location.reload();
					  }
					});

				});
			}
		});

	}else{
		$("#memo_box").show();
		$("#memo_box").addClass("alert-danger");		
		goToByScroll("memo_box");
	}

}




function showMsgBox(){

	$("input#memo").val(private_memo);
	$("#memo_box").toggle();
	$('#sendBox').toggle();	

}


     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        

        //$('#back-to-top').tooltip('show');





function goToByScroll(id) {
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top
    }, 'slow');
}