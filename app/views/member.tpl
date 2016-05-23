{$header}
{$menu}
<div class="pull-right" style="margin-top: 5px; padding-right: 10px">
	<p>Last login: {$last_date} from {$last_ip}</p>
</div>
<main id="account">
	<div class="container">
		<div class="row">
			<div class="col-md-3">
				<p>Welcome {$name}</p>
				<nav id="account-options" role="navigation">
					<ul>
						<li><a href="/member/profile">Your Profile</a></li>
						<li><a href="/member">Order History</a></li>
					</ul>
				</nav>
			</div>
			<div class="col-md-9">
				<h1>{$title}</h1>
				<section id="order-history">
					<h2>Previous Orders</h2>
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Order Date</th>
								<th>Event</th>
								<th>Total</th>
								<th>Status</th>
								<th>GameHedge Status</th>
							</tr>
						</thead>
						<tbody>
							{foreach $orders as $o}
								<tr>
									<td>{$o.id}</td>
									<td>{$o.date|date_format:"m/d/Y"}</td>
									<td>
										{$o.event}<br />
										{$o.event_venue}, {$o.event_location}<br />
										{$o.event_date|date_format:"D M jS"} {$o.event_date|date_format:"h:i A"}<br />
										Section {$o.event_section}, Row {$o.event_row}, Seats {$o.event_seats}
									</td>
									<td>${$o.total}</td>
									<td>{$o.status}</td>
									<td>
										{if $o.refund_status eq 'available'}
                                        <a href="javascript:void(0)" onclick="requestRefund('{$o.id}', '{$o.order_id}', '{$customer_id}', '{$customer_name}', '{$customer_email}')" class="fancybox">Refund Available</a>
										<!--a href="#refund_msg{$o.id}" class="fancybox">Refund Available</a-->
										<div id="refund_msg{$o.id}" style="display: none">
											<p>Sorry the game didn't work out as you may have hoped - but you are eligible for a Good Game Guarantee Refund!</p>
											<p>Simply click on REQUEST REFUND below and you will receive a refund of 50% of your ticket price within 5-10 business days.</p>
											<p>The refund will be credited to the credit card that you used to make your purchase.</p>
											<p>If you have any questions, please email us at support@gamehedge.com or give us a jingle at 908-312-FANS (3267).</p>
											<p>Hope your team wins next time!</p>
											<a class="request_refund button green" data-teoid="{$o.id}" data-oid="{$o.order_id}" data-cid="{$customer_id}" data-name="{$customer_name}" data-email="{$customer_email}">REQUEST REFUND</a>
										</div>
										{else}
										{$o.refund_text}
										{/if}
									</td>
								</tr>
							{foreachelse}
								<tr><td colspan="11">No previous Order History</td></tr>
							{/foreach}
						</tbody>
					</table>
				</section>
			</div>
		</div>
	</div>
</main>
{$footer}