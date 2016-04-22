<?php
/* Smarty version 3.1.29, created on 2016-03-23 06:54:14
  from "/srv/www/Dropbox/gamehedge/app/views/admin/login.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f275d6aaf675_69076023',
  'file_dependency' => 
  array (
    '7d75f0dd183cf85738c0c81b30e876eb2e2879bb' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/admin/login.tpl',
      1 => 1458447090,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f275d6aaf675_69076023 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<div class="container">
	<h1>Login</h1>
	<section id="login-panel">
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
			<a href="/admin/login/forgot">Forgot Password</a>
		</form>
	</section>
</div>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
