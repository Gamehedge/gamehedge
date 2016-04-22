<!DOCTYPE html>
<html lang="en-US" {$head_tags}>
	<head>
		<title>GameHedge</title>
		<base href="/">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<meta http-equiv="x-ua-compatible" content="IE=edge" />
		<meta name="robots" content="NOINDEX, NOFOLLOW" />
		<link rel="stylesheet" href="/assets/css/bundle.min.css" />
		<link rel="stylesheet" href="/assets/css/style.css" />
		{$css}
		{$hscripts}
	</head>
	<body{$body_tag}>
		<header>
			<div class="container-fluid">
				<div id="logo" class="pull-left"><a href="/"><img src="/assets/img/logo.png" alt="GameHedge" /></a></div>
				<div id="header-nav" class="clearfix">
					<nav role="navigation">
						<ul>
							<li id="header-login">{if $loggedin == 1}<a href="/admin/logout">Logout</a>{/if}</li>
							<li id="header-profile">{if $loggedin == 1}<a href="/admin/profile">Profile</a>{/if}</li>
							<li><a href="/admin/users">Users</a></li>
							<li><a href="/admin/reports">Reports</a></li>
							<li><a href="/admin/orders">Orders</a></li>
							<li><a href="/admin/customers">Customers</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
		<main id="admin">
			{if $loggedin == 1}
			<div class="container">
				<h1>GameHedge Administration</h1>
				<div class="row">
					<div class="col-md-3">
						<p>Welcome {$name}</p>
						<nav id="admin-options" role="navigation">
							<ul>
								<li><a href="/admin">Dashboard</a></li>
								<li><a href="/admin/customers">Customers</a></li>
								<li><a href="/admin/orders">Orders</a></li>
								<li><a href="/admin/reports">Reports</a></li>
								<li><a href="/admin/users">Users</a></li>
							</ul>
						</nav>
					</div>
					<div class="col-md-9">
						<section id="admin-content">
			{/if}