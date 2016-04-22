<?php
/* Smarty version 3.1.29, created on 2016-03-23 07:21:37
  from "/srv/www/Dropbox/gamehedge/app/views/admin/orders_view.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f27c41b083e5_22570915',
  'file_dependency' => 
  array (
    '8af56b0d1c4147aa5500264219fec393a2e4049c' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/admin/orders_view.tpl',
      1 => 1458498711,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f27c41b083e5_22570915 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/srv/www/Dropbox/gamehedge/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="order-view">
	<h2>Order #<?php echo $_smarty_tpl->tpl_vars['te_orderid']->value;?>
 (<?php echo $_smarty_tpl->tpl_vars['order_status']->value;?>
)</h2>
	<section id="client-data">
		<h3>Client Information</h3>
		<div class="row">
			<div class="col-md-6">
				<h4>Contact Information</h4>
				<?php echo $_smarty_tpl->tpl_vars['client_name']->value;?>
<br />
				Email: <?php echo $_smarty_tpl->tpl_vars['client_email']->value;?>
<br />
				Phone: <?php echo $_smarty_tpl->tpl_vars['client_phone']->value;?>

			</div>
			<div class="col-md-6">
				<h4>Shipping Information</h4>
				<?php if ($_smarty_tpl->tpl_vars['ticket_type']->value == 'Eticket') {?>
				ETicket emailed to <?php echo $_smarty_tpl->tpl_vars['ship_email']->value;?>

				<?php } else { ?>
				Shipping Method: <?php echo $_smarty_tpl->tpl_vars['ship_method']->value;?>
<br />
				<?php echo $_smarty_tpl->tpl_vars['ship_name']->value;?>
<br />
				<?php echo $_smarty_tpl->tpl_vars['ship_address']->value;?>
<br />
				<?php echo $_smarty_tpl->tpl_vars['ship_city']->value;?>
, <?php echo $_smarty_tpl->tpl_vars['ship_state']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['ship_zipcode']->value;?>

				<?php }?>
			</div>
		</div>
	</section>
	<section id="order-data">
		<h3>Order Information</h3>
		<div class="row">
			<div class="col-md-6">
				<h4>Event Information</h4>
				<strong><?php echo $_smarty_tpl->tpl_vars['event_name']->value;?>
</strong><br />
				<?php echo $_smarty_tpl->tpl_vars['event_venue']->value;?>
, <?php echo $_smarty_tpl->tpl_vars['event_location']->value;?>
 at <?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['event_date']->value,"m-d-Y h:iA");?>
<br />
				Section <?php echo $_smarty_tpl->tpl_vars['ticket_section']->value;?>
, Row <?php echo $_smarty_tpl->tpl_vars['ticket_row']->value;?>
, Seats <?php echo $_smarty_tpl->tpl_vars['ticket_seats']->value;?>
<br />
				Ticket Type: <?php echo $_smarty_tpl->tpl_vars['ticket_type']->value;?>

			</div>
			<div class="col-md-6">
				<h4>Order Information</h4>
				Subtotal: $<?php echo number_format($_smarty_tpl->tpl_vars['order_subtotal']->value,2);?>
<br />
				Shipping Fee: $<?php echo number_format($_smarty_tpl->tpl_vars['order_shipping']->value,2);?>
<br />
				Service Fee: $<?php echo number_format($_smarty_tpl->tpl_vars['order_service']->value,2);?>
<br />
				Total: $<?php echo number_format($_smarty_tpl->tpl_vars['order_total']->value,2);?>

			</div>
		</div>
	</section>
	<section id="transaction-data">
		<h3>Transaction History</h3>
		<table class="table striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Status</th>
					<th>Amount</th>
					<th>Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<?php
$_from = $_smarty_tpl->tpl_vars['transactions']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_pt_0_saved_item = isset($_smarty_tpl->tpl_vars['pt']) ? $_smarty_tpl->tpl_vars['pt'] : false;
$_smarty_tpl->tpl_vars['pt'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['pt']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['pt']->value) {
$_smarty_tpl->tpl_vars['pt']->_loop = true;
$__foreach_pt_0_saved_local_item = $_smarty_tpl->tpl_vars['pt'];
?>
				<tr>
					<td><?php if ($_smarty_tpl->tpl_vars['pt']->value['is_refund'] == 1) {?>Credit<?php } else { ?>Charge<?php }?></td>
					<td><?php echo $_smarty_tpl->tpl_vars['pt']->value['state'];?>
</td>
					<td>$<?php echo number_format($_smarty_tpl->tpl_vars['pt']->value['amount'],2);?>
</td>
					<td><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['pt']->value['created_at'],"m-d-Y h:iA");?>
</td>
					<td><?php if ($_smarty_tpl->tpl_vars['pt']->value['is_refund'] != 1) {?><a href="/admin/orders/refund/<?php echo $_smarty_tpl->tpl_vars['pt']->value['id'];?>
/full" onclick="return confirm('Are you sure you want to refund this payment?');">Refund</a> | <a href="/admin/orders/refund/<?php echo $_smarty_tpl->tpl_vars['pt']->value['id'];?>
/half" onclick="return confirm('Are you sure you want to GameHedge this transaction?');">GameHedge</a><?php }?></td>
				</tr>
				<?php
$_smarty_tpl->tpl_vars['pt'] = $__foreach_pt_0_saved_local_item;
}
if ($__foreach_pt_0_saved_item) {
$_smarty_tpl->tpl_vars['pt'] = $__foreach_pt_0_saved_item;
}
?>
			</tbody>
		</table>
	</section>
</section>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
