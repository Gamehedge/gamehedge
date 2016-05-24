{$header}
{$menu}
<main ng-controller="ConfirmCtrl">
	<div class="container">
		<h1>Thank you for your order</h1>
		<h2>Order Number is: {$order_id}</h2>
		<div class="row">
			<div class="col-md-6">
				<section id="order-header">
					<div class="container clearfix">
                        <div class="row">
                            <div class="date col-xs-3">
                                <div class="month">{$event_date|date_format:"F"}</div>
                                <div class="day">{$event_date|date_format:"j"}</div>
                                <div class="time">{$event_date|date_format:"D. h:i A"}</div>
                            </div>
                            <div class="event col-xs-9">
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
					</div>
				</section>
			</div>
			<div class="col-md-6">
			</div>
		</div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 container-password-change">
                    <div class="row">
                        <div class="col-md-12">
                            <br/>
                            <p>To do a refund request, is necesary that you create a password. To do that, please fill the next field:</p>
                        </div> 
                    </div>

                    
                        <div>
                            <label for="password">Password <span>*</span></label>
                            <input type="password" id="password" name="password" class="form-control" ng-model="password" ng-required="true"/>
                        </div>
                        <div class="text-center" style="margin-top:15px; margin-bottom: 15px;">
                            <button ladda="isloading" type="submit" class="btn btn-default orange" ng-click="sendPassword()">Create password</button>
                        </div>
                    
                </div>
            </div>
        </div>
	</div>
</main>
{$footer}