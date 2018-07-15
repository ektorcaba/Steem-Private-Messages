<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">


	<title></title>

<script src="//cdn.steemjs.com/lib/latest/steem.min.js"></script>
<script src="/js/sc2.min.js"></script>
<script src="/js/js.cookie.js"></script>
</head>
<body>
<div class="container">

</div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
<script>

var api = sc2.Initialize({
  app: 'steemcodeit.com',
  callbackURL: 'http://pm.ektorcaba.com/success',
  accessToken: '<?php echo $_GET["access_token"]; ?>',
  scope: ['vote', 'comment', 'custom_json']
});


api.me(function (err, res) {
  //console.log(err, res);
  	var d = new Date();
  	d.setTime(d.getTime()+(<?php echo $_GET['expires_in']; ?>));
  	if(res.user == "<?php echo $_GET['username']; ?>"){
      
      Cookies.set('username', res.user, { expires: 7 });
      Cookies.set('access_token', '<?php echo $_GET['access_token']; ?>', { expires: 7 });

		window.location.href = "/steem";	
  	}

});




</script>
    
  </body>
</html>