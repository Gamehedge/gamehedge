{$header}
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
			{foreach $users as $user}
			<tr>
				<td>{$user.firstname}</td>
				<td>{$user.lastname}</td>
				<td>{$user.email}</td>
				<td>{$user.username}</td>
				<td>{$user.last_login_date}</td>
				<td>{$user.last_login_ip}</td>
				<td><a href="/admin/users/delete/{$user.id}" onclick="return confirm('Are you sure you want to delete this user?');"><i class="fa fa-times"></i></a></td>
			</tr>
			{/foreach}
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
{$footer}