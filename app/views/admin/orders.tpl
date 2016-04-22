{$header}
<section id="order-list">
	<h2>Order List</h2>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Order ID</th>
				<th>Order Date</th>
				<th>Customer</th>
				<th>Event</th>
				<th>Refund Status</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{foreach $orders as $order}
			<tr>
				<td>{$order.te_order_id}</td>
				<td>{$order.create_date|date_format:"m-d-Y"}</td>
				<td>
					{$order.name}<br />
					{$order.email}
				</td>
				<td>
					{$order.event_name}<br />
					{$order.event_date|date_format:"m-d-Y h:i A"}
				</td>
				<td>
					<select id="refund_status{$order.id}">
					{foreach $refund as $k => $v}
					<option value="{$k}" {if $k eq $order.refund_status}selected="selected"{/if}>{$v}</option>
					{/foreach}
					</select><br />
					<button class="change_refund" data-rel="{$order.id}">Update</button>
				</td>
				<td><a href="/admin/orders/view/{$order.id}">View</a></td>
			</tr>
			{/foreach}
		</tbody>
	</table>
	{if $pages > 1}
	<nav role="navigation" class="clearfix">
		<ul class="pagination pull-right">
			{for $i = 1 to $pages}
			<li{if $i eq $page} class="active"{/if}><a href="{$url}?page={$i}">{$i}</a></li>
			{/for}
		</ul>
	</nav>
	{/if}
</section>
{$footer}
