{$header}
<section id="order-view">
	<h2>Order #{$te_orderid} ({$order_status})</h2>
	<section id="client-data">
		<h3>Client Information</h3>
		<div class="row">
			<div class="col-md-6">
				<h4>Contact Information</h4>
				{$client_name}<br />
				Email: {$client_email}<br />
				Phone: {$client_phone}
			</div>
			<div class="col-md-6">
				<h4>Shipping Information</h4>
				{if $ticket_type eq 'Eticket'}
				ETicket emailed to {$ship_email}
				{else}
				Shipping Method: {$ship_method}<br />
				{$ship_name}<br />
				{$ship_address}<br />
				{$ship_city}, {$ship_state} {$ship_zipcode}
				{/if}
			</div>
		</div>
	</section>
	<section id="order-data">
		<h3>Order Information</h3>
		<div class="row">
			<div class="col-md-6">
				<h4>Event Information</h4>
				<strong>{$event_name}</strong><br />
				{$event_venue}, {$event_location} at {$event_date|date_format:"m-d-Y h:iA"}<br />
				Section {$ticket_section}, Row {$ticket_row}, Seats {$ticket_seats}<br />
				Ticket Type: {$ticket_type}
			</div>
			<div class="col-md-6">
				<h4>Order Information</h4>
				Subtotal: ${$order_subtotal|number_format:2}<br />
				Shipping Fee: ${$order_shipping|number_format:2}<br />
				Service Fee: ${$order_service|number_format:2}<br />
				Total: ${$order_total|number_format:2}
			</div>
		</div>
	</section>
	<section id="transaction-data">
		<h3>Transaction History</h3>
		<table class="table striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Status</th>
					<th>Amount</th>
					<th>Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{foreach $transactions as $pt}
				<tr>
					<td>{if $pt.is_refund eq 1}Credit{else}Charge{/if}</td>
					<td>{$pt.state}</td>
					<td>${$pt.amount|number_format:2}</td>
					<td>{$pt.created_at|date_format:"m-d-Y h:iA"}</td>
					<td>{if $pt.is_refund ne 1}<a href="/admin/orders/refund/{$pt.id}/full" onclick="return confirm('Are you sure you want to refund this payment?');">Refund</a> | <a href="/admin/orders/refund/{$pt.id}/half" onclick="return confirm('Are you sure you want to GameHedge this transaction?');">GameHedge</a>{/if}</td>
				</tr>
				{/foreach}
			</tbody>
		</table>
	</section>
</section>
{$footer}