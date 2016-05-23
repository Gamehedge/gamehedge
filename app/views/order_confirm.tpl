{$header}
{$menu}
<main>
	<div class="container">
		<h1>Thank you for your order</h1>
		<h2>Order Number is: {$order_id}</h2>
		<div class="row">
			<div class="col-md-6">
				<section id="order-header">
					<div class="container clearfix">
						<div class="date">
							<div class="month">{$event_date|date_format:"F"}</div>
							<div class="day">{$event_date|date_format:"j"}</div>
							<div class="time">{$event_date|date_format:"D. h:i A"}</div>
						</div>
						<div class="event">
							<h1>{$event_name}</h1>
                            <div class="hidden" id="EventID">{$event_id}</div>
							<div class="location">{$venue_name} - {$venue_location}</div>
							<div class="ticket">Section {$ticket_section}, Row {$ticket_row}, Seats {$ticket_seats}</div>
                            <div class="hidden" id="TGroupID">{$ticket_id}</div>
                            <br />
                            <div class="ticket">DELIVERY TYPE: <strong>{$ticket_format}</strong></div>
                            <h2 style="margin-top:5px;">TOTAL: ${$order_balance}</h2>
						</div>
					</div>
				</section>
			</div>
			<div class="col-md-6">
			</div>
		</div>
	</div>
</main>
{$footer}