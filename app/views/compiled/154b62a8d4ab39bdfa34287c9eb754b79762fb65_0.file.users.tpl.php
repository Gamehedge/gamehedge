<?php
/* Smarty version 3.1.29, created on 2016-04-04 23:31:38
  from "/home/gamehedg/app/views/admin/users.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_57034dba6e7364_56129917',
  'file_dependency' => 
  array (
    '154b62a8d4ab39bdfa34287c9eb754b79762fb65' => 
    array (
      0 => '/home/gamehedg/app/views/admin/users.tpl',
      1 => 1459217526,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_57034dba6e7364_56129917 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="user-list">
	<h2>User List</h2>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Username</th>
				<th>Last Login</th>
				<th>Last Login IP</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<?php
$_from = $_smarty_tpl->tpl_vars['users']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_user_0_saved_item = isset($_smarty_tpl->tpl_vars['user']) ? $_smarty_tpl->tpl_vars['user'] : false;
$_smarty_tpl->tpl_vars['user'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['user']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['user']->value) {
$_smarty_tpl->tpl_vars['user']->_loop = true;
$__foreach_user_0_saved_local_item = $_smarty_tpl->tpl_vars['user'];
?>
			<tr>
				<td><?php echo $_smarty_tpl->tpl_vars['user']->value['firstname'];?>
</td>
				<td><?php echo $_smarty_tpl->tpl_vars['user']->value['lastname'];?>
</td>
				<td><?php echo $_smarty_tpl->tpl_vars['user']->value['email'];?>
</td>
				<td><?php echo $_smarty_tpl->tpl_vars['user']->value['username'];?>
</td>
				<td><?php echo $_smarty_tpl->tpl_vars['user']->value['last_login_date'];?>
</td>
				<td><?php echo $_smarty_tpl->tpl_vars['user']->value['last_login_ip'];?>
</td>
				<td><a href="/admin/users/delete/<?php echo $_smarty_tpl->tpl_vars['user']->value['id'];?>
" onclick="return confirm('Are you sure you want to delete this user?');"><i class="fa fa-times"></i></a></td>
			</tr>
			<?php
$_smarty_tpl->tpl_vars['user'] = $__foreach_user_0_saved_local_item;
}
if ($__foreach_user_0_saved_item) {
$_smarty_tpl->tpl_vars['user'] = $__foreach_user_0_saved_item;
}
?>
		</tbody>
	</table>
</section>
<section id="add-user">
	<h2>Add new User</h2>
	<div class="form-wrapper clearfix">
		<form id="formAddUser" action="/admin/users/add" method="POST">
			<p class="alert-text">All fields are required.</p>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="firstname">First Name</label>
						<input type="text" id="firstname" name="firstname" class="form-control" required="true" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="lastname">Last Name</label>
						<input type="text" id="lastname" name="lastname" class="form-control" required="true" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="email">Email Address</label>
						<input type="email" id="email" name="email" class="form-control" required="true" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="username">Username</label>
						<input type="text" id="username" name="username" class="form-control" required="true" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" id="password" name="password" class="form-control" required="true" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="confirm_password">Confirm Password</label>
						<input type="password" id="confirm_password" name="confirm_password" class="form-control" required="true" />
					</div>
				</div>
			</div>
			<div class="checkbox">
				<label><input type="checkbox" id="access-customers" name="access-customers" value="1" /> Access to Customers</label>
			</div>
			<div class="checkbox">
				<label><input type="checkbox" id="access-orders" name="access-orders" value="1" /> Access to Orders</label>
			</div>
			<div class="checkbox">
				<label><input type="checkbox" id="access-reports" name="access-reports" value="1" /> Access to Reports</label>
			</div>
			<div class="checkbox">
				<label><input type="checkbox" id="access-users" name="access-users" value="1" /> Access to Admin. Users</label>
			</div>
			<div class="pull-right"><input type="submit" value="Add User" class="btn btn-default" /></div>
		</form>
	</div>
</section>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
