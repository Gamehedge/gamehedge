{$header}
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
				{if $ordered}
				<div class="row">
					<div class="col-md-4">
						<section id="customer-billing">
							<h2>Default Billing Method</h2>
							<img src="/assets/img/icon-{$cdata.primary_credit_card.card_company|lower}.png" alt="{$cdata.primary_credit_card.card_company}" /> {$cdata.primary_credit_card.card_company} ending in {$cdata.primary_credit_card.last_digits} Exp {$cdata.primary_credit_card.expiration_month}/{$cdata.primary_credit_card.expiration_year}
							<address>
								{$cdata.primary_credit_card.address.name}<br />
								{$cdata.primary_credit_card.address.street_address}<br />
								{$cdata.primary_credit_card.address.locality}, {$cdata.primary_credit_card.address.region} {$cdata.primary_credit_card.address.postal_code}
							</address>
						</section>
					</div>
					<div class="col-md-4">
						<section id="customer-shipping">
							<h2>Default Shipping Address</h2>
							<address>
								{$cdata.primary_shipping_address.name}<br />
								{$cdata.primary_shipping_address.street_address}<br />
								{$cdata.primary_shipping_address.locality}, {$cdata.primary_shipping_address.region} {$cdata.primary_shipping_address.postal_code}
							</address>
						</section>
					</div>
					<div class="col-md-4">
						<section id="customer-contact">
							<h2>Contact Information</h2>
							<p><strong>Phone Number: </strong> {$cdata.primary_phone_number.number}</p>
							<p><strong>Email Address: </strong> {$cdata.primary_email_address.address}</p>
						</section>
					</div>
				</div>
				{else}
				<p>You haven't placed an order yet.</p>
				{/if}
			</div>
		</div>
	</div>
</main>
{$footer}
