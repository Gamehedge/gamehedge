<?php
/* Smarty version 3.1.29, created on 2016-02-21 20:37:38
  from "/srv/www/Dropbox/gamehedge/app/views/search.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56ca6662887e56_16935349',
  'file_dependency' => 
  array (
    'e72dbbb432a673eb4eec0ee9d65c54661f1b3ff4' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/search.tpl',
      1 => 1456104712,
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
  'cache_lifetime' => 120,
),true)) {
function content_56ca6662887e56_16935349 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html lang="en-US" ng-app="gamehedge">
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
		
		
			<script type="text/javascript">
				var api_key = 'd55ab93fd692093f517cfb6effe9a5d5';
			</script>
		
	</head>
	<body>
		<header>
			<div class="container">
				<h1>Search Tickets</h1>
			</div>
		</header>
<main ng-controller="SearchCtrl">
	<div class="container">
		<div id="full-search">
			<form id="form-search" name="formSearch" novalidate>
				<div class="form-group">
					<label for="query" class="sr-only">Search Team, Venue or Location</label>
					<div class="input-group">
						<input type="text" id="query" name="query" ng-model="query" class="form-control" placeholder="Search Team, Venue or Location" ng-required="true" />
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" ng-click="search()"><i class="fa fa-search"></i></button>
						</span>
					</div>
				</div>
			</form>
		</div>
		<!--
		<div id="advanced-search" class="hidden">
			<form id="form-search" name="formSearch" class="form-inline" ng-submit="search();" novalidate>
				<div class="form-group">
					<label for="city">City</label><br />
					<input type="text" id="form-search-city" name="city" class="form-control" ng-model="city" ng-required="true" />
				</div>
				<div class="form-group">
					<label for="state">State</label><br />
					<select id="form-search-state" name="state" class="form-control" ng-model="state" ng-required="true">
						<option value="">Please Select a State</option>
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="DC">District Of Columbia</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
						<option value="AS">American Samoa</option>
						<option value="GU">Guam</option>
						<option value="MP">Northern Mariana Islands</option>
						<option value="PR">Puerto Rico</option>
						<option value="UM">United States Minor Outlying Islands</option>
						<option value="VI">Virgin Islands</option>
					</select>
				</div>
				<input type="submit" class="btn btn-default" value="Search" />
			</form>
		</div>
		-->
		<div id="results" ng-if="events.length > 0">
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
					<tr ng-repeat="e in events">
						<td ng-bind="e.name"></td>
						<td>
							<a href="/venue/-!e.venue.id!-/-!e.venue.slug!-">-!e.venue.name!-</a><br />
							-!e.venue.location!-
						</td>
						<td>
							-!e.occurs_at | date:'MM/dd/yyyy'!-<br />
							-!e.occurs_at | date:'hh:mm a'!-
						</td>
						<td>
							<a ng-click="view_tickets(e.id)">See Tickets</a>
							<div ng-show="e.available_count < 20">NOT MANY LEFT</div>
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
		
		<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-sanitize.min.js"></script>
		<script src="/assets/js/app/app.js"></script>
	
		<script src="/assets/js/site.js"></script>
	</body>
</html><?php }
}
