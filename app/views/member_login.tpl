{$header}
{$menu}
<main>
	<div class="container">
		<h1>{$title}</h1>
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
{$footer}
