{$header}
<section id="customer-view">
	<h2>{$customer.name}</h2>
	<section id="client-data">
		<h3>Client Information</h3>
		{if $ordered}
		<div class="row">
			<div class="col-md-4">
				<h4>Contact Information</h4>
				{$customer.name}<br />
				Email: {$customer.primary_email_address.address}<br />
				Phone: {$customer.primary_phone_number.number}
			</div>
			<div class="col-md-4">
				<h4>Shipping Information</h4>
				{$customer.primary_shipping_address.name}<br />
				{$customer.primary_shipping_address.street_address}<br />
				{$customer.primary_shipping_address.locality}, {$customer.primary_shipping_address.region} {$customer.primary_shipping_address.postal_code}
			</div>
			<div class="col-md-4">
				<h4>Billing Information</h4>
				{$customer.primary_billing_address.name}<br />
				{$customer.primary_billing_address.street_address}<br />
				{$customer.primary_billing_address.locality}, {$customer.primary_billing_address.region} {$customer.primary_billing_address.postal_code}
			</div>
		</div>
		{else}
			<h4>Contact Information</h4>
			{$customer.name}<br />
			Email: {$customer.email}
		{/if}
		<h3>Subscription Status</h3>
		{if $optin eq 1}
		<p>Customer Opted into Emails</p>
		{else}
		<p>Customer Opted out of Emails</p>
		{/if}
		<h3>Reset Password</h3>
		<form id="formResetPassword" action="/admin/customers/reset" method="POST">
			<div class="row">
				<div class="col-md-5">
					<div class="form-group">
						<label for="password">New Password</label>
						<input type="password" id="password" name="password" class="form-control" />
					</div>
				</div>
				<div class="col-md-5">
					<div class="form-group">
						<label for="cpassword">Confirm Password</label>
						<input type="password" id="cpassword" name="cpassword" class="form-control" />
					</div>
				</div>
				<div class="col-md-2">
					<div style="height: 20px">&nbsp;</div>
					<input type="submit" value="Reset Password" class="button orange" />
				</div>
			</div>
			<input type="hidden" name="cid" value="{$cid}" />
		</form>
	</section>
	{if $ordered}
	<section id="order-data">
		<h3>Order History</h3>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Order Date</th>
					<th>Event</th>
					<th>Tickets</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{foreach $orders AS $order}
				<tr>
					<td>{$order.create_date|date_format:'m-d-Y h:iA'}</td>
					<td>
						{$order.event_name}<br />
						{$order.event_venue}, {$order.event_location}<br />
						{$order.event_date|date_format:'m-d-Y h:iA'}
					</td>
					<td>
						Section {$order.ticket_section}<br />
						Row {$order.ticket_row}<br />
						Seats {$order.ticket_seats}<br />
						Ticket Format {$order.ticket_format}
					</td>
					<td>${$order.total|number_format:2}</td>
				</tr>
				{/foreach}
			</tbody>
		</table>
	</section>
	{/if}
</section>
{$footer}
