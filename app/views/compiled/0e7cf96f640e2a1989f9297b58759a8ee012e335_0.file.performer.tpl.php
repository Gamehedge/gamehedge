<?php
/* Smarty version 3.1.29, created on 2016-03-23 10:23:35
  from "/srv/www/Dropbox/gamehedge/app/views/performer.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f2a6e7752c74_61316980',
  'file_dependency' => 
  array (
    '0e7cf96f640e2a1989f9297b58759a8ee012e335' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/performer.tpl',
      1 => 1458423067,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f2a6e7752c74_61316980 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/srv/www/Dropbox/gamehedge/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="team-header">
	<div class="container">
		<div id="team-news"><a href="<?php echo $_smarty_tpl->tpl_vars['team']->value['newslink'];?>
" class="btn-green-gradient" target="_blank">Follow <?php echo $_smarty_tpl->tpl_vars['name']->value;?>
 News</a></div>
		<h1><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
		<div id="team-division">MLB > Divisions > <?php echo $_smarty_tpl->tpl_vars['division']->value;?>
 > <?php echo $_smarty_tpl->tpl_vars['name']->value;?>
</div>
	</div>
</section>
<main>
	<div class="container">
		<div class="row">
			<div class="col-md-9">
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
				<section id="games">
					<?php if (count($_smarty_tpl->tpl_vars['events']->value) > 0) {?>
					<ul>
						<?php
$_from = $_smarty_tpl->tpl_vars['events']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_edata_0_saved_item = isset($_smarty_tpl->tpl_vars['edata']) ? $_smarty_tpl->tpl_vars['edata'] : false;
$_smarty_tpl->tpl_vars['edata'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['edata']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['edata']->value) {
$_smarty_tpl->tpl_vars['edata']->_loop = true;
$__foreach_edata_0_saved_local_item = $_smarty_tpl->tpl_vars['edata'];
?>
						<li class="clearfix">
							<div class="date">
								<div class="month"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['edata']->value['occurs_at'],"F");?>
</div>
								<div class="day"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['edata']->value['occurs_at'],"j");?>
</div>
								<div class="time"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['edata']->value['occurs_at'],"D. h:i A");?>
</div>
							</div>
							<div class="event">
								<div class="name"><?php echo $_smarty_tpl->tpl_vars['edata']->value['name'];?>
</div>
								<div class="location"><a href="/venue/<?php echo $_smarty_tpl->tpl_vars['edata']->value['venue']['id'];?>
/<?php echo $_smarty_tpl->tpl_vars['edata']->value['venue']['slug'];?>
"><?php echo $_smarty_tpl->tpl_vars['edata']->value['venue']['name'];?>
</a> - <?php echo $_smarty_tpl->tpl_vars['edata']->value['venue']['location'];?>
</div>
							</div>
							<div class="tickets-link">
								<a href="/ticket/<?php echo $_smarty_tpl->tpl_vars['edata']->value['id'];?>
" class="btn-green-gradient">from <span>$<?php echo $_smarty_tpl->tpl_vars['edata']->value['low_price'];?>
 <i class="fa fa-angle-right"></i></a>
								<?php if ($_smarty_tpl->tpl_vars['edata']->value['available_count'] < 20) {?>
									<div class="text-center alert-text">NOT MANY LEFT</div>
								<?php }?>
							</div>
						</li>
						<?php
$_smarty_tpl->tpl_vars['edata'] = $__foreach_edata_0_saved_local_item;
}
if ($__foreach_edata_0_saved_item) {
$_smarty_tpl->tpl_vars['edata'] = $__foreach_edata_0_saved_item;
}
?>
					</ul>
					<?php } else { ?>
					<p>There are no games available at this time.</p>
					<?php }?>
				</section>
				<?php if ($_smarty_tpl->tpl_vars['pages']->value > 1) {?>
				<nav role="navigation" class="clearfix">
					<ul class="pagination pull-right">
						<?php
$_smarty_tpl->tpl_vars['i'] = new Smarty_Variable;$_smarty_tpl->tpl_vars['i']->step = 1;$_smarty_tpl->tpl_vars['i']->total = (int) ceil(($_smarty_tpl->tpl_vars['i']->step > 0 ? $_smarty_tpl->tpl_vars['pages']->value+1 - (1) : 1-($_smarty_tpl->tpl_vars['pages']->value)+1)/abs($_smarty_tpl->tpl_vars['i']->step));
if ($_smarty_tpl->tpl_vars['i']->total > 0) {
for ($_smarty_tpl->tpl_vars['i']->value = 1, $_smarty_tpl->tpl_vars['i']->iteration = 1;$_smarty_tpl->tpl_vars['i']->iteration <= $_smarty_tpl->tpl_vars['i']->total;$_smarty_tpl->tpl_vars['i']->value += $_smarty_tpl->tpl_vars['i']->step, $_smarty_tpl->tpl_vars['i']->iteration++) {
$_smarty_tpl->tpl_vars['i']->first = $_smarty_tpl->tpl_vars['i']->iteration == 1;$_smarty_tpl->tpl_vars['i']->last = $_smarty_tpl->tpl_vars['i']->iteration == $_smarty_tpl->tpl_vars['i']->total;?>
						<li<?php if ($_smarty_tpl->tpl_vars['i']->value == $_smarty_tpl->tpl_vars['page']->value) {?> class="active"<?php }?>><a href="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
?page=<?php echo $_smarty_tpl->tpl_vars['i']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['i']->value;?>
</a></li>
						<?php }
}
?>

					</ul>
				</nav>
				<?php }?>
			</div>
			<div class="col-md-3">
				<aside id="gamehedge-about">
					<p>Your Team. Your Tickets.</p>
					<img src="/assets/img/logo.png" alt="GameHedge" />
					<div class="sub-text"><?php echo $_smarty_tpl->tpl_vars['team']->value['subtext'];?>
</div>
					<h2>Here's How it Works</h2>
					<ul>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-tickets.png" alt="Tickets" /></div>
							<p>Find your game &amp; purchase your tickets from GameHedge. Every ticket comes with our Good Game Guarantee!</p>
						</li>
						<li><i class="fa fa-angle-down"></i></li>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-stadium.png" alt="Stadium" /></div>
							<p>Attend the game &amp; enjoy your team with no worries.</p>
						</li>
						<li><i class="fa fa-angle-down"></i></li>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-scoreboard.png" alt="Scoreboard" /></div>
							<p>If the home team loses by five or more runs, you get 50% of the ticket price back.</p>
						</li>
						<li><i class="fa fa-angle-down"></i></li>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-handshake.png" alt="Handshake" /></div>
							<p>Just come back to GameHedge.com for your refund!</p>
						</li>
					</ul>
				</aside>
			</div>
		</div>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
