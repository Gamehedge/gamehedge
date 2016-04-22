<?php
/* Smarty version 3.1.29, created on 2016-04-04 23:30:16
  from "/home/gamehedg/app/views/admin/home.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_57034d68131c96_11494294',
  'file_dependency' => 
  array (
    '09d7e451800eb311f362cf9943757a0bf4f9038e' => 
    array (
      0 => '/home/gamehedg/app/views/admin/home.tpl',
      1 => 1459217522,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_57034d68131c96_11494294 ($_smarty_tpl) {
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
