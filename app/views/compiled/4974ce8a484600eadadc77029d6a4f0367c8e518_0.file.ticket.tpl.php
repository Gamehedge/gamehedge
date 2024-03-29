<?php
/* Smarty version 3.1.29, created on 2016-04-23 00:46:14
  from "/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/ticket.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_571aa9b63a6224_27629200',
  'file_dependency' => 
  array (
    '4974ce8a484600eadadc77029d6a4f0367c8e518' => 
    array (
      0 => '/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/ticket.tpl',
      1 => 1461336404,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_571aa9b63a6224_27629200 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="game-header" style="margin-bottom: 0 !important;">
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
<main>
	<div class="Filters">
		<div class="container">
			<div>
				<div class="filter-item">
					<span class="filter-label">Quantity:</span><br />
					<select id="TicketQuantity">
						<option value="" selected="selected">All</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5+">5 Or More</option>
					</select>
				</div>
				<div class="filter-item">
					<span class="filter-label">Sort By:</span><br />
					<select id="TicketSortBy">
						<option data-sorttype="integer" data-sortorder="ASC" value="price" selected="selected">Price: low to high</option>
						<option data-sorttype="integer" data-sortorder="DESC" value="price">Price: high to low</option>
						<option data-sorttype="string" data-sortorder="ASC" value="section">Sections: Ascending</option>
						<option data-sorttype="string" data-sortorder="DESC" value="section">Sections: Descending</option>
						<option data-sorttype="string" data-sortorder="ASC" value="row">Rows: Ascending</option>
						<option data-sorttype="string" data-sortorder="DESC" value="row">Rows: Descending</option>
					</select>
				</div>
				<div class="filter-item">
					<span class="filter-label">Show Only:</span><br />
					<label for="Parking"><input type="checkbox" id="Parking" class="Custom" /> Parking Only</label>
					<label for="ETicket"><input type="checkbox" id="ETicket" class="Custom" /> eTickets Only</label>
				</div>
				<div class="filter-item">
					<span class="filter-label">Price Filter:</span><br />
					<div id="PriceRange"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div id="ChartListContainer">
			<div class="row">
				<div class="col-md-6">
					<section id="game-guarantee">
						<h2>Good Game Guarantee&trade;</h2>
						<hr />
						<p>All GameHedge tickets come with our exclusive Good Game Guarantee at no additional cost to you. So, if the home team loses by 5 runs or more, we will refund 50% of the cost of your ticket. No gimmicks. No catches.</p>
					</section>
					<!-- List Container -->
					<div class="TicketListContainer" id="ListContainer">
						<!-- Required Container to load Ticket List -->
						<div id="InventoryContainer"></div>
					</div>
				</div>
				<div class="col-md-6">
					<!-- Map Container -->
					<div id="TuMap">
						<!-- Required Container to load Interactive Map -->
						<div id="MapContainer" class="MapContainer"></div>
						<!-- Required Container to Interactive Map's Section Groups/Legends List -->
						<div id="GroupsContainer" class="GroupsContainer"></div>
					</div>
					<div class="flC"></div>
				</div>
			</div>
		</div>
		<!--
		<div class="row">
			<div class="col-sm-6">
				<section id="tickets">
					<ul class="ticket-list" ng-if="num_tickets > 0">
						<li ng-repeat="t in tickets">
							<form>
								<div class="clearfix">
									<div class="location">
										<div class="section">Section <span class="section-value" ng-bind="t.section"></span></div>
										<div class="lrow">Row <span class="row-value" ng-bind="t.row"></span></div>
									</div>
									<div class="seats">
										<div class="seat">-!t.seat!- Seats</div>
									</div>
									<div class="guarantee">Good Game Guarantee&trade;</div>
									<div class="seat-link"><a ng-click="buy(t.tgroup_id, t.price)"><span class="price-value" ng-bind="t.price|currency"></span>/ea</a></div>
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
		-->
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;?>

<?php }
}
