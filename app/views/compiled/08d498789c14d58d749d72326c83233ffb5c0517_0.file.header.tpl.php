<?php
/* Smarty version 3.1.29, created on 2016-04-25 17:33:34
  from "/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/admin/shared/header.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_571e38ceb06390_30427799',
  'file_dependency' => 
  array (
    '08d498789c14d58d749d72326c83233ffb5c0517' => 
    array (
      0 => '/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/admin/shared/header.tpl',
      1 => 1461336411,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_571e38ceb06390_30427799 ($_smarty_tpl) {
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
							<li id="header-login"><?php if ($_smarty_tpl->tpl_vars['loggedin']->value == 1) {?><a href="/admin/logout">Logout</a><?php }?></li>
							<li id="header-profile"><?php if ($_smarty_tpl->tpl_vars['loggedin']->value == 1) {?><a href="/admin/profile">Profile</a><?php }?></li>
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
			<?php if ($_smarty_tpl->tpl_vars['loggedin']->value == 1) {?>
			<div class="container">
				<h1>GameHedge Administration</h1>
				<div class="row">
					<div class="col-md-3">
						<p>Welcome <?php echo $_smarty_tpl->tpl_vars['name']->value;?>
</p>
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
			<?php }
}
}
