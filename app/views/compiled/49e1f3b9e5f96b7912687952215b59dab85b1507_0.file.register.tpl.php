<?php
/* Smarty version 3.1.29, created on 2016-04-01 18:48:55
  from "/home/gamehedg/app/views/register.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56ff16f76ec0d2_44476627',
  'file_dependency' => 
  array (
    '49e1f3b9e5f96b7912687952215b59dab85b1507' => 
    array (
      0 => '/home/gamehedg/app/views/register.tpl',
      1 => 1459217550,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56ff16f76ec0d2_44476627 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<main>
	<div class="container">
		<h1><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
		<div class="form-wrapper clearfix">
			<form id="formRegister" class="ajax-form" action="/register/process" method="POST">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label for="name">Full Name</label>
							<input type="text" id="name" name="name" class="form-control" required="true" />
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" id="email" name="email" class="form-control" required="true" />
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
							<label for="cpassword">Confirm Password</label>
							<input type="password" id="cpassword" name="cpassword" class="form-control" required="true" />
						</div>
					</div>
				</div>
				<div class="pull-right"><input type="submit" class="button orange" value="Register" /></div>
			</form>
		</div>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;?>

<?php }
}
