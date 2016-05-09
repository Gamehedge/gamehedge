<!DOCTYPE html>
<html lang="en-US" {$head_tags}>
	<head>
		<title>GameHedge</title>
		<base href="/">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<meta http-equiv="x-ua-compatible" content="IE=edge" />
		<link rel="stylesheet" href="/assets/css/bundle.min.css" />
		<link rel="stylesheet" href="/assets/css/style.css?v117" />
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
		{$css}
		{$hscripts}
	</head>
    	{literal}
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-76054076-1', 'auto');
			ga('send', 'pageview');
		</script>
		{/literal}
	<body{$body_tag}>
		<header>
			<div class="container-fluid">
				<div id="logo" class="pull-left"><a href="/"><img src="/assets/img/logo.png" alt="GameHedge" /></a></div>
				<div id="header-nav" class="clearfix">
					<nav role="navigation">
						<ul>
							<li id="header-login">{if $fname ne ''}<a href="/member">{$fname}</a> &nbsp; <a href="/member/logout">Logout</a>{else}<a href="/member/login">Login</a>{/if}</li>
							<li><a href="/faq">FAQ</a></li>
							<li><a href="/member/login">My Account</a></li>
							<li id="sports-dropdown">
								<a href="#">Sports+</a>
								<div id="sports-dropdown-menu">
									<div id="sports-dropdown-menu-container">
										<div class="row">
											<div class="col-md-4">
												<h2>American League: East</h2>
												<nav role="navigation">
													<ul>
														<li><a href="/performer/16425/baltimore-orioles">Baltimore Orioles</a></li>
														<li><a href="/performer/15532/boston-red-sox">Boston Red Sox</a></li>
														<li><a href="/performer/15533/new-york-yankees">New York Yankees</a></li>
														<li><a href="/performer/15534/tampa-bay-rays">Tampa Bay Rays</a></li>
														<li><a href="/performer/15535/toronto-blue-jays">Toronto Blue Jays</a></li>
													</ul>
												</nav>
											</div>
											<div class="col-md-4">
												<h2>American League: Central</h2>
												<nav role="navigation">
													<ul>
														<li><a href="/performer/15536/chicago-white-sox">Chicago White Sox</a></li>
														<li><a href="/performer/15537/cleveland-indians">Cleveland Indians</a></li>
														<li><a href="/performer/15538/detroit-tigers">Detroit Tigers</a></li>
														<li><a href="/performer/15539/kansas-city-royals">Kansas City Royals</a></li>
														<li><a href="/performer/15540/minnesota-twins">Minnesota Twins</a></li>
													</ul>
												</nav>
											</div>
											<div class="col-md-4">
												<h2>American League: West</h2>
												<nav role="navigation">
													<ul>
														<li><a href="/performer/15552/houston-astros">Houston Astros</a></li>
														<li><a href="/performer/15541/los-angeles-angels">Los Angeles Angels</a></li>
														<li><a href="/performer/15542/oakland-athletics">Oakland Athletics</a></li>
														<li><a href="/performer/15543/seattle-mariners">Seattle Mariners</a></li>
														<li><a href="/performer/15544/texas-rangers">Texas Rangers</a></li>
													</ul>
												</nav>
											</div>
										</div>
										<div class="row">
											<div class="col-md-4">
												<h2>National League: East</h2>
												<nav role="navigation">
													<ul>
														<li><a href="/performer/15545/atlanta-braves">Atlanta Braves</a></li>
														<li><a href="/performer/15546/miami-marlins">Miami Marlins</a></li>
														<li><a href="/performer/15547/new-york-mets">New York Mets</a></li>
														<li><a href="/performer/15548/philadelphia-phillies">Philadelphia Phillies</a></li>
														<li><a href="/performer/15549/washington-nationals">Washington Nationals</a></li>
													</ul>
												</nav>
											</div>
											<div class="col-md-4">
												<h2>National League: Central</h2>
												<nav role="navigation">
													<ul>
														<li><a href="/performer/15550/chicago-cubs">Chicago Cubs</a></li>
														<li><a href="/performer/15551/cincinnati-reds">Cincinnati Reds</a></li>
														<li><a href="/performer/15553/milwaukee-brewers">Milwaukee Brewers</a></li>
														<li><a href="/performer/15554/pittsburgh-pirates">Pittsburgh Pirates</a></li>
														<li><a href="/performer/15555/st-louis-cardinals">St. Louis Cardinals</a></li>
													</ul>
												</nav>
											</div>
											<div class="col-md-4">
												<h2>National League: West</h2>
												<nav role="navigation">
													<ul>
														<li><a href="/performer/15556/arizona-diamondbacks">Arizona Diamondbacks</a></li>
														<li><a href="/performer/15557/colorado-rockies">Colorado Rockies</a></li>
														<li><a href="/performer/15558/los-angeles-dodgers">Los Angeles Dodgers</a></li>
														<li><a href="/performer/15559/san-diego-padres">San Diego Padres</a></li>
														<li><a href="/performer/15560/san-francisco-giants">San Francisco Giants</a></li>
													</ul>
												</nav>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li id="header-search">
								<form id="form-search" name="formSearch" method="POST" action="/search">
									<div class="form-group">
										<label for="query" class="sr-only">Search Team, Venue or Location</label>
										<div class="input-group">
											<input type="text" id="query" name="query" class="form-control" placeholder="Search For Tickets" />
											<span class="input-group-btn">
												<button class="btn btn-default" type="button" onclick="$('#form-search').submit();"><i class="fa fa-search"></i></button>
											</span>
										</div>
									</div>
								</form>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
