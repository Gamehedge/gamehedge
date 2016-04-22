<?php
/* Smarty version 3.1.29, created on 2016-03-26 09:19:31
  from "/srv/www/Dropbox/gamehedge/app/views/ticket.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f68c631fab17_77507372',
  'file_dependency' => 
  array (
    'e6072cd51820f9ae64f4aaede6efc02000b9ce04' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/ticket.tpl',
      1 => 1458986268,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f68c631fab17_77507372 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/srv/www/Dropbox/gamehedge/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="game-header">
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
		</div>
	</div>
</section>
<main ng-controller="TicketCtrl">
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<section id="game-guarantee">
					<h2>Good Game Guarantee&trade;</h2>
					<hr />
					<p>All GameHedge tickets come with our exclusive Good Game Guarantee at no additional cost to you. So, if the home team loses by 5 runs or more, we will refund 50% of the cost of your ticket. No gimmicks. No catches.</p>
				</section>
				<!--
				<div class="filter">
					<form name="ticketFilter" class="form-inline" ng-submit="filterTickets()">
						<div class="form-group">
							<label for="qty" class="control-label">QTY</label>
							<select name="qty" class="form-control" ng-model="qty" ng-options="n for n in [] | range:1:9"></select>
						</div>
						<input type="submit" class="btn btn-default" value="Find Tickets" ng-show="!loading" /><span ng-show="loading"><i class="fa fa-circle-o-notch fa-lg fa-spin"></i> Finding best seats available...</span>
					</form>
				</div>
				-->
				<section id="tickets">
					<ul class="ticket-list" ng-if="num_tickets > 0">
						<li ng-repeat="t in tickets">
							<form>
								<div class="clearfix">
									<div class="location">
										<div class="section">Section -!t.section!-</div>
										<div class="lrow">Row -!t.row!-</div>
									</div>
									<div class="seats">
										<div class="seat">-!t.seat!- Seats</div>
										<div class="type" ng-bind="t.eticket ? 'Email Delivery' : 'Physical Delivery'"></div>
									</div>
									<div class="guarantee">Good Game Guarantee&trade;</div>
									<div class="seat-link"><a ng-click="buy(t.tgroup_id, t.price)">-!t.price|currency!-/ea</a></div>
								</div>
							</form>
						</li>
					</ul>
					<div ng-if="num_tickets < 1">Unable to find any tickets for this game.</div>
				</section>
			</div>
			<div class="col-sm-6">
				<a class="fancybox" href="<?php echo $_smarty_tpl->tpl_vars['configuration']->value['seating_chart_large'];?>
"><img src="<?php echo $_smarty_tpl->tpl_vars['configuration']->value['seating_chart'];?>
" alt="<?php echo $_smarty_tpl->tpl_vars['configuration']->value['name'];?>
" class="configuration" /></a>
				<div class="text-center"><small>Click Seating Chart to Enlarge</small></div>
			</div>
		</div>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
