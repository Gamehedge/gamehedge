<?php
/* Smarty version 3.1.29, created on 2016-03-26 05:52:06
  from "/srv/www/Dropbox/gamehedge/app/views/order_confirm.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f65bc6440ae3_08992089',
  'file_dependency' => 
  array (
    '2244041edd323daca1fb54cd87dd3bdac1b63bd2' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/order_confirm.tpl',
      1 => 1458178924,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f65bc6440ae3_08992089 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/srv/www/Dropbox/gamehedge/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<main>
	<div class="container">
		<h1>Thank you for your order</h1>
		<h2>Order Number is: <?php echo $_smarty_tpl->tpl_vars['order_id']->value;?>
</h2>
		<div class="row">
			<div class="col-md-6">
				<section id="order-header">
					<div class="container clearfix">
						<div class="date">
							<div class="month"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['event_date']->value,"F");?>
</div>
							<div class="day"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['event_date']->value,"j");?>
</div>
							<div class="time"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['event_date']->value,"D. h:i A");?>
</div>
						</div>
						<div class="event">
							<h1><?php echo $_smarty_tpl->tpl_vars['event_name']->value;?>
</h1>
							<div class="location"><?php echo $_smarty_tpl->tpl_vars['venue_name']->value;?>
 - <?php echo $_smarty_tpl->tpl_vars['venue_location']->value;?>
</div>
							<div class="ticket">Section <?php echo $_smarty_tpl->tpl_vars['ticket_section']->value;?>
, Row <?php echo $_smarty_tpl->tpl_vars['ticket_row']->value;?>
, Seats <?php echo $_smarty_tpl->tpl_vars['ticket_seats']->value;?>
</div>
						</div>
					</div>
				</section>
			</div>
			<div class="col-md-6">
			</div>
		</div>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
