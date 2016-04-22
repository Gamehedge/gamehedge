<?php
/* Smarty version 3.1.29, created on 2016-02-25 05:29:37
  from "/srv/www/Dropbox/gamehedge/app/views/home.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56ced7913938d2_06063006',
  'file_dependency' => 
  array (
    'a6c3f944a296d0251956c3f68b40a101175d31c6' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/home.tpl',
      1 => 1456394691,
      2 => 'file',
    ),
  ),
  'cache_lifetime' => 3600,
),true)) {
function content_56ced7913938d2_06063006 ($_smarty_tpl) {
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
										<a href="https://www.facebook.com/v2.5/dialog/oauth?client_id=788859334580166&state=b9901ac1ea4407ddc3b121fb25a3a3c6&response_type=code&sdk=php-sdk-5.1.2&redirect_uri=http%3A%2F%2Fgamehedge.jxw3.com%2Flogin_redirect&scope=email%2Cuser_likes">Login</a>
				</div>
				<div>GameHedge | <a href="/search">Search</a></div>
			</div>
		</header>
<main>
	<div class="container">
		<h1>Welcome to GameHedge</h1>
		<form id="form-search" name="formSearch" method="POST" action="/search">
			<input type="hidden" name="type" value="full" />
			<div class="form-group">
				<label for="query" class="sr-only">Search Team, Venue or Location</label>
				<div class="input-group">
					<input type="text" id="query" name="query" class="form-control" placeholder="Search Team, Venue or Location" />
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" onclick="$('#form-search').submit();"><i class="fa fa-search"></i></button>
					</span>
				</div>
			</div>
		</form>
		<div id="results" ng-if="events.length > 0">
			<h2>Upcoming Games in Your Area</h2>
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Location</th>
						<th>Date</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
											<tr>
							<td>Cleveland Cavaliers at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Sun Feb 28th<br />
								08:00 AM
							</td>
							<td>
								<a href="/ticket/894209">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Philadelphia 76ers at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Mon Feb 29th<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/894210">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Indiana Pacers at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Sat Mar 5th<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/894211">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Detroit Pistons at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Mon Mar 14th<br />
								03:00 PM
							</td>
							<td>
								<a href="/ticket/894212">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Chicago Bulls at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Wed Mar 16th<br />
								03:00 PM
							</td>
							<td>
								<a href="/ticket/894213">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>New York Knicks at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Sat Mar 19th<br />
								03:00 PM
							</td>
							<td>
								<a href="/ticket/894214">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Atlanta Hawks at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Wed Mar 23rd<br />
								03:00 PM
							</td>
							<td>
								<a href="/ticket/894215">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Minnesota Timberwolves at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Fri Mar 25th<br />
								03:00 PM
							</td>
							<td>
								<a href="/ticket/894216">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Brooklyn Nets at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Wed Apr 6th<br />
								03:00 PM
							</td>
							<td>
								<a href="/ticket/894217">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Charlotte Hornets at Washington Wizards</td>
							<td>
								<a href="/venue/955/verizon-center">Verizon Center</a><br />
								Washington, DC
							</td>
							<td>
								Sun Apr 10th<br />
								09:00 AM
							</td>
							<td>
								<a href="/ticket/894218">See Tickets</a>
															</td>
						</tr>
									</tbody>
			</table>
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
