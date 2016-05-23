{$header}
{$menu}
<main id="checkout" ng-controller="CheckoutCtrl">
	<div class="container">
		<h1>Secure Checkout</h1>
		<form name="frmCheckout" method="POST" ng-submit="process()">
			<div class="row">
				<div class="col-md-4">
					<section id="co-ticket-details">
						<input type="submit" class="button orange" value="Submit Order" />
						<small>By placing your order, you agree to GameHedge's <a href="/privacy-policy">privacy notice</a> and <a href="/our-terms">terms and conditions</a>.</small>
						<hr />
						<h3>Ticket Details</h3>
						<div class="event">{$event_name}</div>
						<div class="date">{$event_date}</div>
						<div class="location">{$venue_name}, {$venue_location}</div>
						<div class="seats">Section {$ticket_section}, Row {$ticket_row}</div>
						<h3>Order Summary</h3>
						<div class="row">
							<div class="col-md-6">Price</div>
							<div class="col-md-6 text-right"><span ng-bind="order_data.price|currency"></span> ea.</div>
						</div>
						<div class="row">
							<div class="col-md-6">Quantity</div>
							<div class="col-md-6 text-right" ng-bind="data.qty"></div>
						</div>
						<div class="row">
							<div class="col-md-6">Subtotal</div>
							<div class="col-md-6 text-right" ng-bind="subtotal|currency"></div>
						</div>
						<hr />
						<div class="row">
							<div class="col-md-6">Service Fee</div>
							<div class="col-md-6 text-right" ng-bind="data.fee|currency"></div>
						</div>
						<div class="row">
							<div class="col-md-6">Tax</div>
							<div class="col-md-6 text-right">--</div>
						</div>
						<div class="row">
							<div class="col-md-6">Shipping</div>
							<div class="col-md-6 text-right" ng-bind="shipping.price|currency"></div>
						</div>
						<hr />
						<div class="row">
							<div class="col-md-6">Total</div>
							<div class="col-md-6 text-right" ng-bind="total|currency"></div>
						</div>
					</section>
				</div>
				<div class="col-md-8">
					<section id="new-customer" ng-if="existing == 0">
						<div ng-if="!client">
							<h2 class="underlined big">How Many Tickets?</h2>
							<div class="form-group">
								<select id="qty" name="qty" class="form-control" ng-model="data.qty" ng-options="split for split in order_data.splits" ng-change="updateTotals()"></select>
							</div>
							<h2 class="underlined big">Register</h2>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="email">Email <span>*</span></label>
										<input type="email" id="email" name="email" class="form-control" ng-model="data.email" ng-required="true" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="password">Password <span>*</span></label>
										<input type="password" id="password" name="password" class="form-control" ng-model="data.password" ng-required="true" />
									</div>
								</div>
							</div>
							<p>Already have an account? Please <a href="/member/login">login</a> before proceeding.</p>
						</div>

						<h2 class="underlined big">Billing/Shipping Information</h2>
						<h3>Credit Card Information</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label for="card_number">Credit Card Number <span>*</span></label>
									<input type="text" id="card_number" name="card_number" class="form-control" ng-model="data.card_number" ng-required="true" />
								</div>
							</div>
							<div class="col-md-2">
								<div class="form-group">
									<label for="card_exp_month">Exp. Month <span>*</span></label>
									<select id="card_exp_month" name="card_exp_month" class="form-control" ng-model="data.card_exp_month" ng-required="true">
										<option value="01">01</option>
										<option value="02">02</option>
										<option value="03">03</option>
										<option value="04">04</option>
										<option value="05">05</option>
										<option value="06">06</option>
										<option value="07">07</option>
										<option value="08">08</option>
										<option value="09">09</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
									</select>
								</div>
							</div>
							<div class="col-md-2">
								<div class="form-group">
									<label for="card_exp_year">Exp. Year <span>*</span></label>
									<select id="card_exp_year" name="card_exp_year" class="form-control" ng-model="data.card_exp_year" ng-required="true">
										<option value="2016">2016</option>
										<option value="2017">2017</option>
										<option value="2018">2018</option>
										<option value="2019">2019</option>
										<option value="2020">2020</option>
										<option value="2021">2021</option>
										<option value="2022">2022</option>
										<option value="2023">2023</option>
										<option value="2024">2024</option>
										<option value="2025">2025</option>
										<option value="2026">2026</option>
										<option value="2027">2027</option>
										<option value="2028">2028</option>
									</select>
								</div>
							</div>
							<div class="col-md-2">
								<div class="form-group">
									<label for="card_cvv2">CVV2 Code <span>*</span></label>
									<input type="text" id="card_cvv2" name="card_cvv2" class="form-control" ng-model="data.card_cvv2" ng-required="true" />
								</div>
							</div>
						</div>
						<input type="checkbox" id="store_card" name="store_card" ng-model="data.store_card" ng-true-value="1" ng-false-value="0" /> Store my information in our secure system for future purchases.
						<h3>Billing Address</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label for="bfirstname">First Name <span>*</span></label>
									<input type="text" id="bfirstname" name="bfirstname" class="form-control" ng-model="data.bfirstname" ng-required="true" />
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="blastname">Last Name <span>*</span></label>
									<input type="text" id="blastname" name="blastname" class="form-control" ng-model="data.blastname" ng-required="true" />
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="baddress1">Address <span>*</span></label>
							<input type="text" id="baddress1" name="baddress1" class="form-control" ng-model="data.baddress1" ng-required="true" />
						</div>
						<div class="form-group">
							<label for="baddress2" class="optional">Address Line 2</label>
							<input type="text" id="baddress2" name="baddress2" class="form-control" ng-model="data.baddress2" />
						</div>
						<div class="row">
							<div class="col-md-5">
								<div class="form-group">
									<label for="bcity">City <span>*</span></label>
									<input type="text" id="bcity" name="bcity" class="form-control" ng-model="data.bcity" ng-required="true" />
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label for="bstate">State <span>*</span></label>
									<select id="bstate" name="bstate" class="form-control" ng-model="data.bstate" ng-required="true">
										<option value="AL">Alabama</option>
										<option value="AK">Alaska</option>
										<option value="AZ">Arizona</option>
										<option value="AR">Arkansas</option>
										<option value="CA">California</option>
										<option value="CO">Colorado</option>
										<option value="CT">Connecticut</option>
										<option value="DE">Delaware</option>
										<option value="DC">District Of Columbia</option>
										<option value="FL">Florida</option>
										<option value="GA">Georgia</option>
										<option value="HI">Hawaii</option>
										<option value="ID">Idaho</option>
										<option value="IL">Illinois</option>
										<option value="IN">Indiana</option>
										<option value="IA">Iowa</option>
										<option value="KS">Kansas</option>
										<option value="KY">Kentucky</option>
										<option value="LA">Louisiana</option>
										<option value="ME">Maine</option>
										<option value="MD">Maryland</option>
										<option value="MA">Massachusetts</option>
										<option value="MI">Michigan</option>
										<option value="MN">Minnesota</option>
										<option value="MS">Mississippi</option>
										<option value="MO">Missouri</option>
										<option value="MT">Montana</option>
										<option value="NE">Nebraska</option>
										<option value="NV">Nevada</option>
										<option value="NH">New Hampshire</option>
										<option value="NJ">New Jersey</option>
										<option value="NM">New Mexico</option>
										<option value="NY">New York</option>
										<option value="NC">North Carolina</option>
										<option value="ND">North Dakota</option>
										<option value="OH">Ohio</option>
										<option value="OK">Oklahoma</option>
										<option value="OR">Oregon</option>
										<option value="PA">Pennsylvania</option>
										<option value="RI">Rhode Island</option>
										<option value="SC">South Carolina</option>
										<option value="SD">South Dakota</option>
										<option value="TN">Tennessee</option>
										<option value="TX">Texas</option>
										<option value="UT">Utah</option>
										<option value="VT">Vermont</option>
										<option value="VA">Virginia</option>
										<option value="WA">Washington</option>
										<option value="WV">West Virginia</option>
										<option value="WI">Wisconsin</option>
										<option value="WY">Wyoming</option>
										<option value="AS">American Samoa</option>
										<option value="GU">Guam</option>
										<option value="MP">Northern Mariana Islands</option>
										<option value="PR">Puerto Rico</option>
										<option value="UM">United States Minor Outlying Islands</option>
										<option value="VI">Virgin Islands</option>
									</select>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="bzipcode">Zip Code <span>*</span></label>
									<input type="text" id="bzipcode" name="bzipcode" class="form-control" ng-model="data.bzipcode" ng-required="true" />
								</div>
							</div>
						</div>
						Phone
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label for="phone_cc">Country Code</label>
									<input type="text" id="phone_cc" name="phone_cc" class="form-control" ng-model="data.phone_cc" />
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="phone">Number <span>*</span></label>
									<input type="text" id="phone" name="phone" class="form-control" ng-model="data.phone" ng-required="true" />
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="phone_ext" class="optional">Extension</label>
									<input type="text" id="phone_ext" name="phone_ext" class="form-control" ng-model="data.phone_ext" />
								</div>
							</div>
						</div>

					<h2 class="underlined big">Tickets Ordered</h2>
					<div class="row">
						<div class="col-md-6">
							<strong>{$event_name}</strong><br />
							{$event_date}<br />
							<p>Section {$ticket_section}, Row {$ticket_row}</p>
						</div>
						<div class="col-md-6" ng-show="data.ticket_format == 'Physical'">
							<p><strong>Choose a Shipping Option</strong></p>
							<div id="shipping_options">
								<ul>
									<li ng-repeat="s in shipping_data"><label><input type="radio" id="shipping_option-!s.id!-" name="shipping_option" value="-!s.id!-" ng-model="data.shipping_option" ng-change="setShipping()" /> -!s.price|currency!- -!s.name!-</label></li>
								</ul>
							</div>
						</div>
					</div>
					<section id="co-order-submit">
						<div class="row">
							<div class="col-md-8">
								<p><input type="checkbox" ng-model="accept_terms" ng-true-value="1" ng-false-value="0" /> I agree to GameHedge's <a href="/privacy-policy">privacy policy</a> and <a href="/our-terms">terms and conditions</a>.</p>
								<p>Please verify your order details, and click &quot;Submit Order&quot; to complete the order process.</p>
							</div>
							<div class="col-md-4">
								<div class="text-right">
									<div class="final-total">
										Total
										<div ng-bind="total|currency"></div>
									</div>
									<input type="submit" class="button orange" value="Submit Order" />
								</div>
							</div>
						</div>
					</section>
					<br>
					<p><strong>Please Note: Gamehedge is a resale ticket marketplace, not the ticket seller. Prices are set by third-party sellers and may be above or below face value.</p>
				</div>
			</div>
		</form>
	</div>
</main>
{$footer}
