<?php
/* Smarty version 3.1.29, created on 2016-02-25 05:28:41
  from "/srv/www/Dropbox/gamehedge/app/views/performer.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56ced759437073_30101213',
  'file_dependency' => 
  array (
    '0e7cf96f640e2a1989f9297b58759a8ee012e335' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/performer.tpl',
      1 => 1456394773,
      2 => 'file',
    ),
  ),
  'cache_lifetime' => 3600,
),true)) {
function content_56ced759437073_30101213 ($_smarty_tpl) {
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
<main>
	<div class="container">
		<h1>Team Information</h1>
		<div class="row">
			<div class="col-sm-2"><img src="/images/original/missing.png" alt="Chicago Bulls" /></div>
			<div class="col-sm-10">
				<p><strong>Basketball</strong></p>
				<h2>Chicago Bulls</h2>
			</div>
		</div>
		<div id="results" ng-if="events.length > 0">
			<h2>Upcoming Games</h2>
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
							<td>Washington Wizards at Chicago Bulls</td>
							<td>
								<a href="/venue/1633/united-center">United Center</a><br />
								Chicago, IL
							</td>
							<td>
								Wed Feb 24th<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/893734">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Chicago Bulls at Atlanta Hawks</td>
							<td>
								<a href="/venue/1228/philips-arena">Philips Arena</a><br />
								Atlanta, GA
							</td>
							<td>
								Fri Feb 26th<br />
								03:00 PM
							</td>
							<td>
								<a href="/ticket/894350">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Portland Trail Blazers at Chicago Bulls</td>
							<td>
								<a href="/venue/1633/united-center">United Center</a><br />
								Chicago, IL
							</td>
							<td>
								Sat Feb 27th<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/893735">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Chicago Bulls at Miami Heat</td>
							<td>
								<a href="/venue/44/american-airlines-arena">American Airlines Arena</a><br />
								Miami, FL
							</td>
							<td>
								Tue Mar 1st<br />
								02:30 PM
							</td>
							<td>
								<a href="/ticket/894168">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Chicago Bulls at Orlando Magic</td>
							<td>
								<a href="/venue/1537/amway-center">Amway Center</a><br />
								Orlando, FL
							</td>
							<td>
								Wed Mar 2nd<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/894455">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Houston Rockets at Chicago Bulls</td>
							<td>
								<a href="/venue/1633/united-center">United Center</a><br />
								Chicago, IL
							</td>
							<td>
								Sat Mar 5th<br />
								02:30 PM
							</td>
							<td>
								<a href="/ticket/893716">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Milwaukee Bucks at Chicago Bulls</td>
							<td>
								<a href="/venue/1633/united-center">United Center</a><br />
								Chicago, IL
							</td>
							<td>
								Mon Mar 7th<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/893717">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Chicago Bulls at San Antonio Spurs</td>
							<td>
								<a href="/venue/2259/at-t-center">AT&T Center</a><br />
								San Antonio, TX
							</td>
							<td>
								Thu Mar 10th<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/893881">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Miami Heat at Chicago Bulls</td>
							<td>
								<a href="/venue/1633/united-center">United Center</a><br />
								Chicago, IL
							</td>
							<td>
								Fri Mar 11th<br />
								02:00 PM
							</td>
							<td>
								<a href="/ticket/893718">See Tickets</a>
															</td>
						</tr>
											<tr>
							<td>Chicago Bulls at Toronto Raptors</td>
							<td>
								<a href="/venue/17/air-canada-centre">Air Canada Centre</a><br />
								Toronto, ON
							</td>
							<td>
								Mon Mar 14th<br />
								03:30 PM
							</td>
							<td>
								<a href="/ticket/893802">See Tickets</a>
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
