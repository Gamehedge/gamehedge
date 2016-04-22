<?php
/* Smarty version 3.1.29, created on 2016-03-22 23:36:33
  from "/srv/www/Dropbox/gamehedge/app/views/shared/header.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f20f4167e187_94906372',
  'file_dependency' => 
  array (
    '33498fee86d803cb843252afce911b57507ea35f' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/shared/header.tpl',
      1 => 1458703966,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f20f4167e187_94906372 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html lang="en-US" <?php echo $_smarty_tpl->tpl_vars['head_tags']->value;?>
>
	<head>
		<title>GameHedge</title>
		<base href="/">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<meta http-equiv="x-ua-compatible" content="IE=edge" />
		<meta name="robots" content="NOINDEX, NOFOLLOW" />
		<link rel="stylesheet" href="/assets/css/bundle.min.css" />
		<link rel="stylesheet" href="/assets/css/style.css" />
		<?php echo $_smarty_tpl->tpl_vars['css']->value;?>

		<?php echo $_smarty_tpl->tpl_vars['hscripts']->value;?>

	</head>
	<body<?php echo $_smarty_tpl->tpl_vars['body_tag']->value;?>
>
		<header>
			<div class="container-fluid">
				<div id="logo" class="pull-left"><a href="/"><img src="/assets/img/logo.png" alt="GameHedge" /></a></div>
				<div id="header-nav" class="clearfix">
					<nav role="navigation">
						<ul>
							<li id="header-login"><?php if ($_smarty_tpl->tpl_vars['fname']->value != '') {?><a href="/member"><?php echo $_smarty_tpl->tpl_vars['fname']->value;?>
</a> &nbsp; <a href="/member/logout">Logout</a><?php } else { ?><a href="/member/login">Login</a><?php }?></li>
							<li id="header-help"><a href="/support">Help</a></li>
							<li><a href="/faq">FAQ</a></li>
							<li><a href="/member">Get Refund</a></li>
							<li id="sports-dropdown">
								<a href="/sports">Sports+</a>
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
<?php }
}
