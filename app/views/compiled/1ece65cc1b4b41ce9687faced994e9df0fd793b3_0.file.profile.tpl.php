<?php
/* Smarty version 3.1.29, created on 2016-03-23 07:28:50
  from "/srv/www/Dropbox/gamehedge/app/views/admin/profile.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f27df2392ca2_30484181',
  'file_dependency' => 
  array (
    '1ece65cc1b4b41ce9687faced994e9df0fd793b3' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/admin/profile.tpl',
      1 => 1458450565,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f27df2392ca2_30484181 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="order-stats">
	<h2>Profile</h2>
	<div class="row">
		<div class="col-md-2">Name</div>
		<div class="col-md-10"><?php echo $_smarty_tpl->tpl_vars['fullname']->value;?>
</div>
	</div>
	<div class="row">
		<div class="col-md-2">Email</div>
		<div class="col-md-10"><?php echo $_smarty_tpl->tpl_vars['email']->value;?>
</div>
	</div>
	<div class="row">
		<div class="col-md-2">Username</div>
		<div class="col-md-10"><?php echo $_smarty_tpl->tpl_vars['username']->value;?>
</div>
	</div>
	<div class="row">
		<div class="col-md-2">Last Login Date</div>
		<div class="col-md-10"><?php echo $_smarty_tpl->tpl_vars['last_date']->value;?>
</div>
	</div>
	<div class="row">
		<div class="col-md-2">Last Login IP</div>
		<div class="col-md-10"><?php echo $_smarty_tpl->tpl_vars['last_ip']->value;?>
</div>
	</div>
	<h2>Update Password</h2>
	<div class="form-wrapper clearfix">
		<form id="formUpdatePassword" action="/admin/profile/password_update" method="POST">
			<div class="form-group">
				<label for="current_password">Current Password</label>
				<input type="password" id="current_password" name="current_password" class="form-control" />
			</div>
			<div class="form-group">
				<label for="new_password">New Password</label>
				<input type="password" id="new_password" name="new_password" class="form-control" />
			</div>
			<div class="form-group">
				<label for="confirm_password">Confirm Password</label>
				<input type="password" id="confirm_password" name="confirm_password" class="form-control" />
			</div>
			<div class="pull-right"><input type="submit" value="Update Password" class="btn btn-default" /></div>
		</form>
	</div>
</section>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
