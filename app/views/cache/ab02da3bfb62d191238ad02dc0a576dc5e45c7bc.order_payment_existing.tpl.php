<?php
/* Smarty version 3.1.29, created on 2016-02-21 03:28:10
  from "/srv/www/Dropbox/gamehedge/app/views/order_payment_existing.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56c9751a28e2e9_13874287',
  'file_dependency' => 
  array (
    'ab02da3bfb62d191238ad02dc0a576dc5e45c7bc' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/order_payment_existing.tpl',
      1 => 1456043286,
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
function content_56c9751a28e2e9_13874287 ($_smarty_tpl) {
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
<!--
Array
(
    [0] => Array
        (
            [te_ccid] => 18828
            [card_name] => Joey Tester
            [card_company] => Visa
            [card_number] => 1111
            [card_expm] => 03
            [card_expy] => 2020
            [card_address] => Array
                (
                    [street_address] => 123 Main Street
                    [region] => MD
                    [country_code] => US
                    [extended_address] => 
                    [label] => Home
                    [locality] => Bethesda
                    [longitude] => 
                    [name] => Joey Tester
                    [po_box] => 
                    [id] => 624888
                    [postal_code] => 20814
                    [latitude] => 
                    [primary] => 1
                )
            [card_phone] => Array
                (
                    [phone_number] => Array
                        (
                            [raw_num] => 1231234
                            [imported_at] => 
                            [imported_filename] => 
                            [updated_at] => 2016-02-21T06:26:37Z
                            [deleted_at] => 
                            [legacy_id] => 
                            [callable_id] => 158494
                            [callable_type] => Client
                            [label] => Mobile
                            [country_code] => 1
                            [number] => 3011231234
                            [created_at] => 2016-02-21T06:26:37Z
                            [id] => 283720
                            [area_code] => 301
                            [extension] => 
                        )
                )
        )
)
-->
<main>
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<h2>San Antonio Spurs at Golden State Warriors</h2>
				<p>
					Oracle Arena, Oakland, CA<br />
					Thu, Apr 7, 2016 07:30 PM
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
							<td>10</td>
						</tr>
						<tr>
							<td>Seats</td>
							<td>3, 4</td>
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
		<h2>Choose an Existing Card on File <a href="#">Add new Card</a></h2>
		<form method="POST" action="/order/process">
			<input type="hidden" name="existing" value="1" />
							<input type="hidden" name="phone" value="283720" />
				<input type="hidden" name="email" value="192134" />
				<input type="hidden" name="billing_address" value="624888" />
				<div class="row">
					<div class="col-md-6">
						<div class="row">
							<div class="col-xs-1"><input type="radio" id="card_id18828" name="card_id" value="18828" /></div>
							<div class="col-xs-6">Visa ending in 1111</div>
							<div class="col-xs-5">Expires 03 / 2020</div>
						</div>
					</div>
					<div class="col-md-6">
						<h3>Billing Address</h3>
						<strong>Joey Tester</strong><br />
						123 Main Street<br />
						Bethesda, MD 20814 US<br />
						(301) 123-1234
					</div>
				</div>
						<p><input type="submit" value="Place Order" /></p>
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
