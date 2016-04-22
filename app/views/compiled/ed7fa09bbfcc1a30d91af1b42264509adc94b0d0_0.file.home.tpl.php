<?php
/* Smarty version 3.1.29, created on 2016-03-23 06:54:19
  from "/srv/www/Dropbox/gamehedge/app/views/admin/home.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f275db411c18_52228364',
  'file_dependency' => 
  array (
    'ed7fa09bbfcc1a30d91af1b42264509adc94b0d0' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/admin/home.tpl',
      1 => 1458540977,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f275db411c18_52228364 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="order-stats">
	<h2>Order Stats</h2>
	<div class="row">
		<div class="col-md-3">
			<div class="stat-item">
				<h3>Today</h3>
				<span><?php echo $_smarty_tpl->tpl_vars['stats']->value['today'];?>
</span>
			</div>
		</div>
		<div class="col-md-3">
			<div class="stat-item">
				<h3>This Week</h3>
				<span><?php echo $_smarty_tpl->tpl_vars['stats']->value['week'];?>
</span>
			</div>
		</div>
		<div class="col-md-3">
			<div class="stat-item">
				<h3>This Month</h3>
				<span><?php echo $_smarty_tpl->tpl_vars['stats']->value['month'];?>
</span>
			</div>
		</div>
		<div class="col-md-3">
			<div class="stat-item">
				<h3>This Year</h3>
				<span><?php echo $_smarty_tpl->tpl_vars['stats']->value['year'];?>
</span>
			</div>
		</div>
	</div>
</section>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
