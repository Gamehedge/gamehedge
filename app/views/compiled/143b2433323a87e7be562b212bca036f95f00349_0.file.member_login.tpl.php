<?php
/* Smarty version 3.1.29, created on 2016-04-01 16:31:19
  from "/home/gamehedg/app/views/member_login.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56fef6b701e9f7_63047401',
  'file_dependency' => 
  array (
    '143b2433323a87e7be562b212bca036f95f00349' => 
    array (
      0 => '/home/gamehedg/app/views/member_login.tpl',
      1 => 1459217546,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56fef6b701e9f7_63047401 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<main>
	<div class="container">
		<h1><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
		<div class="row">
			<div class="col-md-8">
				<div id="formLoginWrapper" class="form-wrapper clearfix">
					<form id="formLogin" class="ajax-form" action="/member/login_process" method="POST">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label for="username">Email Address</label>
									<input type="text" id="username" name="username" class="form-control" required="true" />
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="password">Password</label>
									<input type="password" id="password" name="password" class="form-control" required="true" />
								</div>
							</div>
						</div>
						<div class="pull-right"><input type="submit" class="button orange" value="Login" /></div>
						<a id="forgotLink" href="/member/forgot">Forgot Your Password?</a>
					</form>
				</div>
				<div id="formForgotWrapper" class="form-wrapper hidden">
					<p>Forgot your password? Enter your email address to retrieve it.</p>
					<form id="formForgot" class="ajax-form" action="/member/forgot_process" method="POST">
						<div class="form-group">
							<label for="email">Email Address</label>
							<input type="email" id="email" name="email" class="form-control" />
						</div>
						<div class="text-right"><input type="submit" value="Forgot Password" class="button orange" /></div>
					</form>
				</div>
			</div>
			<div class="col-md-4">
				<h2 class="no-margin">Not a Member?</h2>
				<p><a href="/register">Register now</a></p>
			</div>
		</div>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;?>

<?php }
}
