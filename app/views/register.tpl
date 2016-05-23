{$header}
{$menu}
<main>
	<div class="container">
		<h1>{$title}</h1>
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
{$footer}
