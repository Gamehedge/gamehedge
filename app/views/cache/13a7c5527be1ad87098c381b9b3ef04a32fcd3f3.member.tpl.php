<?php
/* Smarty version 3.1.29, created on 2016-02-21 22:52:43
  from "/srv/www/Dropbox/gamehedge/app/views/member.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56ca860b3be643_86227485',
  'file_dependency' => 
  array (
    '13a7c5527be1ad87098c381b9b3ef04a32fcd3f3' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/member.tpl',
      1 => 1456113116,
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
function content_56ca860b3be643_86227485 ($_smarty_tpl) {
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
				<h1>My Account</h1>
			</div>
		</header>
<main>
	<div class="container">
		<h2>Welcome Joey Shakespeare</h2>
		<h2>Previous Orders</h2>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Order Date</th>
					<th>Event</th>
					<th>Event Venue</th>
					<th>Event Time</th>
					<th>Row</th>
					<th>Section</th>
					<th>Seats</th>
					<th>Total</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
									<tr>
						<td>42794-143359</td>
						<td>02/21/2016</td>
						<td>San Antonio Spurs at Golden State Warriors</td>
						<td>
							Oracle Arena<br />
							, 
						</td>
						<td>
							Thu Apr 7th<br />
							03:30 PM
						</td>
						<td>10</td>
						<td>100</td>
						<td>3, 4</td>
						<td>59.85</td>
						<td>pending</td>
						<td>View Full Details</td>
					</tr>
							</tbody>
		</table>
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
