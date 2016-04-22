<?php
/* Smarty version 3.1.29, created on 2016-02-21 01:25:39
  from "/srv/www/Dropbox/gamehedge/app/views/order_payment.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56c95863ee0fe9_87292892',
  'file_dependency' => 
  array (
    '5ad960c7f7cb988e718d3a1a947810fbca7640bf' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/order_payment.tpl',
      1 => 1455621659,
      2 => 'file',
    ),
    '33498fee86d803cb843252afce911b57507ea35f' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/shared/header.tpl',
      1 => 1455490330,
      2 => 'file',
    ),
    '51c8896fa6047397ac3448dc738f6279f0d94047' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/shared/footer.tpl',
      1 => 1455489660,
      2 => 'file',
    ),
  ),
  'cache_lifetime' => 120,
),true)) {
function content_56c95863ee0fe9_87292892 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html lang="en-US" >
	<head>
		<title>GameHedge</title>
		<base href="/">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<meta http-equiv="x-ua-compatible" content="IE=edge" />
		<meta name="robots" content="NOINDEX, NOFOLLOW" />
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" />
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css" />
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="/assets/css/style.css" />
		
		
	</head>
	<body>
		<header>
			<div class="container">
				<h1>Order - Payment Step 3</h1>
			</div>
		</header>
<main>
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<h2>New York Knicks at Golden State Warriors</h2>
				<p>
					Oracle Arena, Oakland, CA<br />
					Wed, Mar 16, 2016 07:30 PM
				</p>
			</div>
			<div class="col-md-4">
				<table class="table">
					<tbody>
						<tr>
							<td>Section</td>
							<td>100</td>
						</tr>
						<tr>
							<td>Row</td>
							<td>1</td>
						</tr>
						<tr>
							<td>Seats</td>
							<td>1, 2</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td>Ticket Price</td>
							<td>$20.00 x 2</td>
					</tfoot>
				</table>
			</div>
		</div>
		<p><strong>Please enter your credit card information and then click on Submit Order button to complete your purchase.</strong></p>
		<p>* Required Field</p>
		<form method="POST" action="/order/process">
			<div class="row">
				<div class="col-md-6">
					<p><strong>Credit / Debit Card</strong> <a href="#">(Use stored credit / debit card)</a></p>
					<div class="row">
						<div class="col-md-8">
							<div class="form-group">
								<label for="card_type">Credit / Debit Card Type <span>*</span></label>
								<select id="card_type" name="card_type" class="form-control">
									<option value="visa">Visa</option>
									<option value="mastercard">Mastercard</option>
									<option value="discover">Discover</option>
									<option value="amex">American Express</option>
								</select>
							</div>
						</div>
						<div class="col-md-4"></div>
					</div>
					<div class="row">
						<div class="col-md-8">
							<div class="form-group">
								<label for="card_name">Name on Card <span>*</span></label>
								<input type="text" id="card_name" name="card_name" class="form-control" />
							</div>
						</div>
						<div class="col-md-4"></div>
					</div>
					<div class="row">
						<div class="col-md-8">
							<div class="form-group">
								<label for="card_number">Credit / Debit Card Number <span>*</span></label>
								<input type="text" id="card_number" name="card_number" class="form-control" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label for="card_cvv2">Security Code <span>*</span></label>
								<input type="text" id="card_cvv2" name="card_cvv2" class="form-control" />
							</div>
						</div>
					</div>
					Expires
					<div class="row">
						<div class="col-md-8">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="card_exp_month">Month <span>*</span></label>
										<select id="card_exp_month" name="card_exp_month" class="form-control">
											<option value="01">01 - January</option>
											<option value="02">02 - February</option>
											<option value="03">03 - March</option>
											<option value="04">04 - April</option>
											<option value="05">05 - May</option>
											<option value="06">06 - June</option>
											<option value="07">07 - July</option>
											<option value="08">08 - August</option>
											<option value="09">09 - September</option>
											<option value="10">10 - October</option>
											<option value="11">11 - November</option>
											<option value="12">12 - December</option>
										</select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="card_exp_year">Year <span>*</span></label>
										<select id="card_exp_year" name="card_exp_year" class="form-control">
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
							</div>
						</div>
						<div class="col-md-4"></div>
					</div>
					<input type="checkbox" id="store_card" name="store_card" value="1" checked="checked" /> Store my credit card and billing information in our secure system for future purchases.
				</div>
				<div class="col-md-6">
					<p><strong>Billing Address</strong></p>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="firstname">First Name <span>*</span></label>
								<input type="text" id="firstname" name="firstname" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="lastname">Last Name <span>*</span></label>
								<input type="text" id="lastname" name="lastname" class="form-control" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="address1">Address <span>*</span></label>
						<input type="text" id="address1" name="address1" class="form-control" />
					</div>
					<div class="form-group">
						<label for="address2" class="optional">Address Line 2</label>
						<input type="text" id="address2" name="address2" class="form-control" />
					</div>
					<div class="form-group">
						<label for="city">City <span>*</span></label>
						<input type="text" id="city" name="city" class="form-control" />
					</div>
					<div class="form-group">
						<label for="state">State <span>*</span></label>
						<select id="state" name="state" class="form-control">
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
					<div class="form-group">
						<label for="zipcode">Zip Code <span>*</span></label>
						<input type="text" id="zipcode" name="zipcode" class="form-control" />
					</div>
					Phone
					<div class="row">
						<div class="col-md-3">
							<div class="form-group">
								<label for="phone_cc">Country Code <span>*</span></label>
								<input type="text" id="phone_cc" name="phone_cc" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="phone">Number <span>*</span></label>
								<input type="text" id="phone" name="phone" class="form-control" />
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<label for="phone_ext" class="optional">Extension</label>
								<input type="text" id="phone_ext" name="phone_ext" class="form-control" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<input type="hidden" name="country" value="US" />
			<input type="submit" value="Submit Order" />
		</form>
	</div>
</main>
		<footer>
			<div class="container">
				&copy; 2016 GameHedge. All Rights Reserved
			</div>
		</footer>
		<div growl></div>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
		<!--[if lt IE 9]>
			<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		
		<script src="/assets/js/site.js"></script>
	</body>
</html><?php }
}
