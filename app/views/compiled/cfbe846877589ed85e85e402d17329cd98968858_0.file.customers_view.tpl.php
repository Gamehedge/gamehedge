<?php
/* Smarty version 3.1.29, created on 2016-04-14 00:49:20
  from "/home/gamehedg/app/views/admin/customers_view.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_570f3d70134673_87850351',
  'file_dependency' => 
  array (
    'cfbe846877589ed85e85e402d17329cd98968858' => 
    array (
      0 => '/home/gamehedg/app/views/admin/customers_view.tpl',
      1 => 1460616556,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_570f3d70134673_87850351 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/home/gamehedg/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="customer-view">
	<h2><?php echo $_smarty_tpl->tpl_vars['customer']->value['name'];?>
</h2>
	<section id="client-data">
		<h3>Client Information</h3>
		<?php if ($_smarty_tpl->tpl_vars['ordered']->value) {?>
		<div class="row">
			<div class="col-md-4">
				<h4>Contact Information</h4>
				<?php echo $_smarty_tpl->tpl_vars['customer']->value['name'];?>
<br />
				Email: <?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_email_address']['address'];?>
<br />
				Phone: <?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_phone_number']['number'];?>

			</div>
			<div class="col-md-4">
				<h4>Shipping Information</h4>
				<?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_shipping_address']['name'];?>
<br />
				<?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_shipping_address']['street_address'];?>
<br />
				<?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_shipping_address']['locality'];?>
, <?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_shipping_address']['region'];?>
 <?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_shipping_address']['postal_code'];?>

			</div>
			<div class="col-md-4">
				<h4>Billing Information</h4>
				<?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_billing_address']['name'];?>
<br />
				<?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_billing_address']['street_address'];?>
<br />
				<?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_billing_address']['locality'];?>
, <?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_billing_address']['region'];?>
 <?php echo $_smarty_tpl->tpl_vars['customer']->value['primary_billing_address']['postal_code'];?>

			</div>
		</div>
		<?php } else { ?>
			<h4>Contact Information</h4>
			<?php echo $_smarty_tpl->tpl_vars['customer']->value['name'];?>
<br />
			Email: <?php echo $_smarty_tpl->tpl_vars['customer']->value['email'];?>

		<?php }?>
		<h3>Subscription Status</h3>
		<?php if ($_smarty_tpl->tpl_vars['optin']->value == 1) {?>
		<p>Customer Opted into Emails</p>
		<?php } else { ?>
		<p>Customer Opted out of Emails</p>
		<?php }?>
		<h3>Reset Password</h3>
		<form id="formResetPassword" action="/admin/customers/reset" method="POST">
			<div class="row">
				<div class="col-md-5">
					<div class="form-group">
						<label for="password">New Password</label>
						<input type="password" id="password" name="password" class="form-control" />
					</div>
				</div>
				<div class="col-md-5">
					<div class="form-group">
						<label for="cpassword">Confirm Password</label>
						<input type="password" id="cpassword" name="cpassword" class="form-control" />
					</div>
				</div>
				<div class="col-md-2">
					<div style="height: 20px">&nbsp;</div>
					<input type="submit" value="Reset Password" class="button orange" />
				</div>
			</div>
			<input type="hidden" name="cid" value="<?php echo $_smarty_tpl->tpl_vars['cid']->value;?>
" />
		</form>
	</section>
	<?php if ($_smarty_tpl->tpl_vars['ordered']->value) {?>
	<section id="order-data">
		<h3>Order History</h3>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Order Date</th>
					<th>Event</th>
					<th>Tickets</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<?php
$_from = $_smarty_tpl->tpl_vars['orders']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_order_0_saved_item = isset($_smarty_tpl->tpl_vars['order']) ? $_smarty_tpl->tpl_vars['order'] : false;
$_smarty_tpl->tpl_vars['order'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['order']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['order']->value) {
$_smarty_tpl->tpl_vars['order']->_loop = true;
$__foreach_order_0_saved_local_item = $_smarty_tpl->tpl_vars['order'];
?>
				<tr>
					<td><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['order']->value['create_date'],'m-d-Y h:iA');?>
</td>
					<td>
						<?php echo $_smarty_tpl->tpl_vars['order']->value['event_name'];?>
<br />
						<?php echo $_smarty_tpl->tpl_vars['order']->value['event_venue'];?>
, <?php echo $_smarty_tpl->tpl_vars['order']->value['event_location'];?>
<br />
						<?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['order']->value['event_date'],'m-d-Y h:iA');?>

					</td>
					<td>
						Section <?php echo $_smarty_tpl->tpl_vars['order']->value['ticket_section'];?>
<br />
						Row <?php echo $_smarty_tpl->tpl_vars['order']->value['ticket_row'];?>
<br />
						Seats <?php echo $_smarty_tpl->tpl_vars['order']->value['ticket_seats'];?>
<br />
						Ticket Format <?php echo $_smarty_tpl->tpl_vars['order']->value['ticket_format'];?>

					</td>
					<td>$<?php echo number_format($_smarty_tpl->tpl_vars['order']->value['total'],2);?>
</td>
				</tr>
				<?php
$_smarty_tpl->tpl_vars['order'] = $__foreach_order_0_saved_local_item;
}
if ($__foreach_order_0_saved_item) {
$_smarty_tpl->tpl_vars['order'] = $__foreach_order_0_saved_item;
}
?>
			</tbody>
		</table>
	</section>
	<?php }?>
</section>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;?>

<?php }
}
