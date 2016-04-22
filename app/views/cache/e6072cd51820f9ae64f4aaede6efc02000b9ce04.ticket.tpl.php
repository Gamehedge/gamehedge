<?php
/* Smarty version 3.1.29, created on 2016-02-25 05:28:38
  from "/srv/www/Dropbox/gamehedge/app/views/ticket.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56ced7563b1480_80579613',
  'file_dependency' => 
  array (
    'e6072cd51820f9ae64f4aaede6efc02000b9ce04' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/ticket.tpl',
      1 => 1456394809,
      2 => 'file',
    ),
  ),
  'cache_lifetime' => 3600,
),true)) {
function content_56ced7563b1480_80579613 ($_smarty_tpl) {
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
			<div class="container clearfix">
				<div class="pull-right">
										<a href="https://www.facebook.com/v2.5/dialog/oauth?client_id=788859334580166&state=575bda4b174256e8964f9dc59ba09b3b&response_type=code&sdk=php-sdk-5.1.2&redirect_uri=http%3A%2F%2Fgamehedge.jxw3.com%2Flogin_redirect&scope=email%2Cuser_likes">Login</a>
				</div>
				<div><a href="/search">Search</a></div>
			</div>
		</header>
<main ng-controller="TicketCtrl">
	<div class="container">
		<h1>Tickets</h1>
		<div class="row">
			<div class="col-md-2">Team Logo</div>
			<div class="col-md-10">
				<h2><a href="/performer/16306/chicago-bulls">Washington Wizards at Chicago Bulls</a></h2>
				<p>
					United Center, Chicago, IL<br />
					Wed, Feb 24, 2016 07:00 PM
				</p>
			</div>
		</div>
	</div>
	<div class="container">
		<h2>Find Tickets</h2>
		<form name="ticketFilter" class="form-inline" ng-submit="filterTickets()">
			<div class="form-group">
				<label for="qty" class="control-label">QTY</label>
				<select name="qty" class="form-control" ng-model="qty" ng-options="n for n in [] | range:1:9"></select>
			</div>
			<input type="submit" class="btn btn-default" value="Find Tickets" />
		</form>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<table class="table">
					<thead>
						<tr>
							<th>Section</th>
							<th>Row</th>
							<th>Seat</th>
							<th>Price</th>
							<th>Total Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="t in tickets">
							<td ng-bind="t.section"></td>
							<td ng-bind="t.row"></td>
							<td ng-bind="t.seat"></td>
							<td ng-bind="t.price | currency"></td>
							<td ng-bind="t.total_price | currency"></td>
							<td>
								<form method="POST" action="/order">
									<input type="hidden" name="event_id" ng-value="event_id" />
									<input type="hidden" name="tgroup_id" ng-value="t.tgroup_id" />
									<input type="hidden" name="ticket_id" ng-value="t.ticket_id" />
									<input type="hidden" name="seat" ng-value="t.seat" />
									<input type="hidden" name="price" ng-value="t.price" />
									<input type="hidden" name="total" ng-value="t.total_price" />
									<input type="submit" value="Buy" />
								</form>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm-6">
				<img src="https://s3.amazonaws.com/media.ticketevolution.com/configurations/static_maps/5516/medium.jpg?1424365808" alt="Basketball" />
			</div>
		</div>
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
