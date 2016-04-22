<?php
/* Smarty version 3.1.29, created on 2016-03-23 07:25:30
  from "/srv/www/Dropbox/gamehedge/app/views/member.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f27d2ae2cc94_69626712',
  'file_dependency' => 
  array (
    '13a7c5527be1ad87098c381b9b3ef04a32fcd3f3' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/member.tpl',
      1 => 1458436589,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f27d2ae2cc94_69626712 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/srv/www/Dropbox/gamehedge/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<div class="pull-right" style="margin-top: 5px; padding-right: 10px">
	<p>Last login: <?php echo $_smarty_tpl->tpl_vars['last_date']->value;?>
 from <?php echo $_smarty_tpl->tpl_vars['last_ip']->value;?>
</p>
</div>
<main id="account">
	<div class="container">
		<div class="row">
			<div class="col-md-3">
				<p>Welcome <?php echo $_smarty_tpl->tpl_vars['name']->value;?>
</p>
				<nav id="account-options" role="navigation">
					<ul>
						<li><a href="/member/profile">Your Profile</a></li>
						<li><a href="/member">Order History</a></li>
					</ul>
				</nav>
			</div>
			<div class="col-md-9">
				<h1><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
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
								<th></th>
							</tr>
						</thead>
						<tbody>
							<?php
$_from = $_smarty_tpl->tpl_vars['orders']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_o_0_saved_item = isset($_smarty_tpl->tpl_vars['o']) ? $_smarty_tpl->tpl_vars['o'] : false;
$_smarty_tpl->tpl_vars['o'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['o']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['o']->value) {
$_smarty_tpl->tpl_vars['o']->_loop = true;
$__foreach_o_0_saved_local_item = $_smarty_tpl->tpl_vars['o'];
?>
								<tr>
									<td><?php echo $_smarty_tpl->tpl_vars['o']->value['id'];?>
</td>
									<td><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['o']->value['date'],"m/d/Y");?>
</td>
									<td>
										<?php echo $_smarty_tpl->tpl_vars['o']->value['event'];?>
<br />
										<?php echo $_smarty_tpl->tpl_vars['o']->value['event_venue'];?>
, <?php echo $_smarty_tpl->tpl_vars['o']->value['event_location'];?>
<br />
										<?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['o']->value['event_date'],"D M jS");?>
 <?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['o']->value['event_date'],"h:i A");?>
<br />
										Section <?php echo $_smarty_tpl->tpl_vars['o']->value['event_section'];?>
, Row <?php echo $_smarty_tpl->tpl_vars['o']->value['event_row'];?>
, Seats <?php echo $_smarty_tpl->tpl_vars['o']->value['event_seats'];?>

									</td>
									<td>$<?php echo $_smarty_tpl->tpl_vars['o']->value['total'];?>
</td>
									<td><?php echo $_smarty_tpl->tpl_vars['o']->value['status'];?>
</td>
									<td><a href="mailto:stephenkane@gamehedge.com?subject=Refund Request for Order <?php echo $_smarty_tpl->tpl_vars['o']->value['id'];?>
&body=Customer ID <?php echo $_smarty_tpl->tpl_vars['customer_id']->value;?>
, Customer Name: <?php echo $_smarty_tpl->tpl_vars['customer_name']->value;?>
, Customer Email: <?php echo $_smarty_tpl->tpl_vars['customer_email']->value;?>
">Request Your Game Hedge</a></td>
								</tr>
							<?php
$_smarty_tpl->tpl_vars['o'] = $__foreach_o_0_saved_local_item;
}
if (!$_smarty_tpl->tpl_vars['o']->_loop) {
?>
								<tr><td colspan="11">No previous Order History</td></tr>
							<?php
}
if ($__foreach_o_0_saved_item) {
$_smarty_tpl->tpl_vars['o'] = $__foreach_o_0_saved_item;
}
?>
						</tbody>
					</table>
				</section>
			</div>
		</div>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
