{$header}
<section id="order-stats">
	<h2>Profile</h2>
	<div class="row">
		<div class="col-md-2">Name</div>
		<div class="col-md-10">{$fullname}</div>
	</div>
	<div class="row">
		<div class="col-md-2">Email</div>
		<div class="col-md-10">{$email}</div>
	</div>
	<div class="row">
		<div class="col-md-2">Username</div>
		<div class="col-md-10">{$username}</div>
	</div>
	<div class="row">
		<div class="col-md-2">Last Login Date</div>
		<div class="col-md-10">{$last_date}</div>
	</div>
	<div class="row">
		<div class="col-md-2">Last Login IP</div>
		<div class="col-md-10">{$last_ip}</div>
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
{$footer}