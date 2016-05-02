<?php
/* Smarty version 3.1.29, created on 2016-04-25 17:33:34
  from "/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/admin/login.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_571e38ceb3d941_22104865',
  'file_dependency' => 
  array (
    '016e862b9caeeab2b241396e4917b49854b8ff65' => 
    array (
      0 => '/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/admin/login.tpl',
      1 => 1461336409,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_571e38ceb3d941_22104865 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<div class="container">
	<h1>Login</h1>
	<section id="login-panel" class="form-wrapper clearfix">
		<form id="formLogin" action="/admin/login/process" method="POST">
			<div class="form-group">
				<label for="username">Username</label>
				<input type="text" class="form-control" id="username" name="username" />
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-control" id="password" name="password" />
			</div>
			<div class="pull-right"><input type="submit" class="btn btn-default" value="Login" /></div>
			<a id="forgotLink" href="/admin/login/forgot">Forgot Password</a>
		</form>
	</section>
	<section id="forgot-panel" class="form-wrapper hidden">
		<p>Forgot your password? Enter your email address to retrieve it.</p>
		<form id="formForgot" class="ajax-form" action="/admin/login/forgot_process" method="POST">
			<div class="form-group">
				<label for="email">Email Address</label>
				<input type="email" id="email" name="email" class="form-control" />
			</div>
			<div class="text-right"><input type="submit" value="Forgot Password" class="button orange" /></div>
		</form>
	</section>
</div>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
