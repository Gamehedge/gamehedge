{$header}
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
{$footer}