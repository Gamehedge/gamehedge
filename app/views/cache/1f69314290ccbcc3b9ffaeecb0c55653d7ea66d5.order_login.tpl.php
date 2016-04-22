<?php
/* Smarty version 3.1.29, created on 2016-02-22 19:26:10
  from "/srv/www/Dropbox/gamehedge/app/views/order_login.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56cba722accc57_77434797',
  'file_dependency' => 
  array (
    '1f69314290ccbcc3b9ffaeecb0c55653d7ea66d5' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/order_login.tpl',
      1 => 1455605740,
      2 => 'file',
    ),
    '33498fee86d803cb843252afce911b57507ea35f' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/shared/header.tpl',
      1 => 1455490330,
      2 => 'file',
    ),
    '51c8896fa6047397ac3448dc738f6279f0d94047' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/shared/footer.tpl',
      1 => 1455489660,
      2 => 'file',
    ),
  ),
  'cache_lifetime' => 3600,
),true)) {
function content_56cba722accc57_77434797 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html lang="en-US" >
	<head>
		<title>GameHedge</title>
		<base href="/">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<meta http-equiv="x-ua-compatible" content="IE=edge" />
		<meta name="robots" content="NOINDEX, NOFOLLOW" />
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" />
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css" />
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="/assets/css/style.css" />
		
		
	</head>
	<body>
		<header>
			<div class="container">
				<h1>Login</h1>
			</div>
		</header>
<main>
	<div class="container">
		<p><a href="https://www.facebook.com/v2.5/dialog/oauth?client_id=788859334580166&state=ddf3d15cfd89f15595f674e488f40c4b&response_type=code&sdk=php-sdk-5.1.2&redirect_uri=http%3A%2F%2Fgamehedge.jxw3.com%2Forder%2Flogin_redirect&scope=email%2Cuser_likes">Log In with Facebook</a></p>
	</div>
</main>
		<footer>
			<div class="container">
				&copy; 2016 GameHedge. All Rights Reserved
			</div>
		</footer>
		<div growl></div>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
		<!--[if lt IE 9]>
			<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		
		<script src="/assets/js/site.js"></script>
	</body>
</html><?php }
}
