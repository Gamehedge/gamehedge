<?php
/* Smarty version 3.1.29, created on 2016-04-21 10:12:59
  from "/home/gamehedg/app/views/order.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_5718fc0b8e85c3_57527730',
  'file_dependency' => 
  array (
    '55929fcf95da8c0c64d4688424f32d2b4000926b' => 
    array (
      0 => '/home/gamehedg/app/views/order.tpl',
      1 => 1461255168,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5718fc0b8e85c3_57527730 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

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
						<div class="event"><?php echo $_smarty_tpl->tpl_vars['event_name']->value;?>
</div>
						<div class="date"><?php echo $_smarty_tpl->tpl_vars['event_date']->value;?>
</div>
						<div class="location"><?php echo $_smarty_tpl->tpl_vars['venue_name']->value;?>
, <?php echo $_smarty_tpl->tpl_vars['venue_location']->value;?>
</div>
						<div class="seats">Section <?php echo $_smarty_tpl->tpl_vars['ticket_section']->value;?>
, Row <?php echo $_smarty_tpl->tpl_vars['ticket_row']->value;?>
</div>
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
										<label for="email2">Confirm Email <span>*</span></label>
										<input type="email" id="email2" name="email2" class="form-control" ng-model="data.email2" ng-required="true" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="password">Create Password <span>*</span></label>
										<input type="password" id="password" name="password" class="form-control" ng-model="data.password" ng-required="true" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="password2">Confirm Password <span>*</span></label>
										<input type="password" id="password2" name="password2" class="form-control" ng-model="data.password2" ng-required="true" />
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
					</section>
					<section id="existing-customer" ng-if="existing == 1">
						<h2 class="no-margin underlined big">Shipping Information</h2>
						<div id="shipping_holder" ng-show="!toggle_edit.shipping">
							<div class="clearfix">
								<div class="pull-right"><a class="button medium gray" ng-click="toggleEdit('shipping')">Edit</a></div>
								-!shipping_address.name!-<br />
								-!shipping_address.street_address!-<br />
								-!shipping_address.locality!-, -!shipping_address.region!- -!shipping_address.postal_code!-
							</div>
						</div>
						<div id="shipping_edit" ng-show="toggle_edit.shipping && !toggle_add.shipping">
							<h3>Your Stored Addresses</h3>
							<ul>
								<li ng-repeat="a in addresses"><label><input type="radio" id="shipping_address_id--!a.id!-" name="shipping_address_id" value="-!a.id!-" ng-model="data.shipping_address_id" /> <strong>-!a.name!-</strong>, -!a.street_address!-, -!a.locality!-, -!a.region!- -!a.postal_code!- -!a.country_code!-</label></li>
								<li><a ng-click="toggleAdd('shipping')"><i class="fa fa-plus"></i> Add a new address</a></li>
							</ul>
							<div class="change_buttons"><a class="button orange medium" ng-click="setShippingAddress()">Update</a> <a ng-click="toggleEdit('shipping')">Cancel</a></div>
						</div>
						<div id="add_shipping_address" ng-show="toggle_add.shipping">
							<h3>Add a New Address</h3>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="sfirstname">First Name <span>*</span></label>
										<input type="text" id="sfirstname" name="sfirstname" class="form-control" ng-model="sdata.firstname" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="slastname">Last Name <span>*</span></label>
										<input type="text" id="slastname" name="slastname" class="form-control" ng-model="sdata.lastname" />
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="saddress1">Address <span>*</span></label>
								<input type="text" id="saddress1" name="saddress1" class="form-control" ng-model="sdata.address1" />
							</div>
							<div class="form-group">
								<label for="saddress2" class="optional">Address Line 2</label>
								<input type="text" id="saddress2" name="saddress2" class="form-control" ng-model="sdata.address2" />
							</div>
							<div class="row">
								<div class="col-md-5">
									<div class="form-group">
										<label for="scity">City <span>*</span></label>
										<input type="text" id="scity" name="scity" class="form-control" ng-model="sdata.city" />
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label for="sstate">State <span>*</span></label>
										<select id="sstate" name="sstate" class="form-control" ng-model="sdata.state">
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
										<label for="szipcode">Zip Code <span>*</span></label>
										<input type="text" id="szipcode" name="szipcode" class="form-control" ng-model="sdata.zipcode" />
									</div>
								</div>
							</div>
							<div class="change_buttons"><a class="button orange medium" ng-click="addShippingAddress()">Submit</a> <a ng-click="toggleAdd('shipping')">Cancel</a></div>
						</div>
						<h2 class="underlined big">Payment Method</h2>
						<div ng-if="!has_card">
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
						</div>
						<div ng-if="has_card">
							<div class="clearfix" ng-show="!toggle_edit.credit">
								<div class="pull-right"><a class="button medium gray" ng-click="toggleEdit('credit')">Edit</a></div>
								<img src="/assets/img/icon--!credit_card.card_company|lowercase!-.png" alt="-!credit_card.card_company!-" /> -!credit_card.card_company!- ending in -!credit_card.last_digits!-
							</div>
							<div id="card_options" ng-show="toggle_edit.credit && !toggle_add.credit">
								<h3>Your Stored Credit Cards</h3>
								<ul>
									<li class="header">
										<div class="row">
											<div class="col-md-6">Credit Card</div>
											<div class="col-md-4">Name on Card</div>
											<div class="col-md-2">Exp. Date</div>
										</div>
									</li>
									<li class="item" ng-repeat="cc in credit_cards">
										<div class="row">
											<div class="col-md-6"><label><input type="radio" id="card_id-!cc.id!-" name="card_id" value="-!cc.id!-" ng-model="data.card_id" /> <img src="/assets/img/icon--!cc.card_company|lowercase!-.png" alt="-!cc.card_company!-" /> -!cc.card_company!- ending in -!cc.last_digits!-</div>
											<div class="col-md-4">-!cc.name!-</div>
											<div class="col-md-2">-!cc.expiration_month!-/-!cc.expiration_year!-</div>
										</div>
									</li>
									<li class="item">
										<div class="row">
											<div class="col-md-6"><a ng-click="toggleAdd('credit')"><i class="fa fa-plus"></i> Add a new credit card</a></div>
											<div class="col-md-4"></div>
											<div class="col-md-2"></div>
										</div>
									</li>
								</ul>
								<div class="change_buttons"><a class="button orange medium" ng-click="setCreditCard()">Update</a> <a ng-click="toggleEdit('credit')">Cancel</a></div>
							</div>
							<div id="add_new_card" ng-show="toggle_add.credit">
								<h3>Add New Credit Card</h3>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="card_number">Credit Card Number <span>*</span></label>
											<input type="text" id="card_number" name="card_number" class="form-control" ng-model="cdata.card_number" />
										</div>
									</div>
									<div class="col-md-2">
										<div class="form-group">
											<label for="card_exp_month">Exp. Month <span>*</span></label>
											<select id="card_exp_month" name="card_exp_month" class="form-control" ng-model="cdata.card_exp_month">
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
											<select id="card_exp_year" name="card_exp_year" class="form-control" ng-model="cdata.card_exp_year">
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
											<input type="text" id="card_cvv2" name="card_cvv2" class="form-control" ng-model="cdata.card_cvv2" />
										</div>
									</div>
								</div>
								<div class="change_buttons"><a class="button orange medium" ng-click="addCreditCard()">Submit</a> <a ng-click="toggleAdd('credit')">Cancel</a></div>
							</div>
						</div>
						<div id="billing_address">
							<div id="billing_holder" ng-show="!toggle_edit.billing">
								<strong>Billing Address:</strong> -!billing_address.name!-</strong>, -!billing_address.street_address!-, -!billing_address.locality!-, -!billing_address.region!- -!billing_address.postal_code!- -!billing_address.country_code!- <a ng-click="toggleEdit('billing')">Change</a>
							</div>
							<div id="billing_edit" ng-show="toggle_edit.billing && !toggle_add.billing">
								<h3>Your Stored Addresses</h3>
								<ul>
									<li ng-repeat="a in addresses"><label><input type="radio" id="billing_address_id--!a.id!-" name="billing_address_id" value="-!a.id!-" ng-model="data.billing_address_id" /> <strong>-!a.name!-</strong>, -!a.street_address!-, -!a.locality!-, -!a.region!- -!a.postal_code!- -!a.country_code!-</label></li>
									<li><a ng-click="toggleAdd('billing')"><i class="fa fa-plus"></i> Add a new address</a></li>
								</ul>
								<div class="change_buttons"><a class="button orange medium" ng-click="setBillingAddress()">Update</a> <a ng-click="toggleEdit('billing')">Cancel</a></div>
							</div>
						</div>
						<div id="add_billing_address" ng-show="toggle_add.billing">
							<h3>Add a New Address</h3>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="bfirstname">First Name <span>*</span></label>
										<input type="text" id="bfirstname" name="bfirstname" class="form-control" ng-model="bdata.firstname" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="blastname">Last Name <span>*</span></label>
										<input type="text" id="blastname" name="blastname" class="form-control" ng-model="bdata.lastname" />
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="baddress1">Address <span>*</span></label>
								<input type="text" id="baddress1" name="baddress1" class="form-control" ng-model="bdata.address1" />
							</div>
							<div class="form-group">
								<label for="baddress2" class="optional">Address Line 2</label>
								<input type="text" id="baddress2" name="baddress2" class="form-control" ng-model="bdata.address2" />
							</div>
							<div class="row">
								<div class="col-md-5">
									<div class="form-group">
										<label for="bcity">City <span>*</span></label>
										<input type="text" id="bcity" name="bcity" class="form-control" ng-model="bdata.city" />
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label for="bstate">State <span>*</span></label>
										<select id="bstate" name="bstate" class="form-control" ng-model="bdata.state">
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
										<input type="text" id="szipcode" name="bzipcode" class="form-control" ng-model="bdata.zipcode" />
									</div>
								</div>
							</div>
							<div class="change_buttons"><a class="button orange medium" ng-click="addBillingAddress()">Submit</a> <a ng-click="toggleAdd('billing')">Cancel</a></div>
						</div>
					</section>
					<h2 class="underlined big">Tickets Ordered</h2>
					<div class="row">
						<div class="col-md-6">
							<strong><?php echo $_smarty_tpl->tpl_vars['event_name']->value;?>
</strong><br />
							<?php echo $_smarty_tpl->tpl_vars['event_date']->value;?>
<br />
							<p>Section <?php echo $_smarty_tpl->tpl_vars['ticket_section']->value;?>
, Row <?php echo $_smarty_tpl->tpl_vars['ticket_row']->value;?>
</p>
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
								<p><input type="checkbox" ng-model="data.optin" ng-true-value="1" ng-false-value="0" /> Please send me promotional emails</p>
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
<iframe frameborder="0" height="1" scrolling="no" src="/order/ks" width="1"></iframe>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;?>

<?php }
}
