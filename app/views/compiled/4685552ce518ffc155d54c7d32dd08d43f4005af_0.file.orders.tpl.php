<?php
/* Smarty version 3.1.29, created on 2016-03-23 06:54:28
  from "/srv/www/Dropbox/gamehedge/app/views/admin/orders.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f275e44f5e62_01453821',
  'file_dependency' => 
  array (
    '4685552ce518ffc155d54c7d32dd08d43f4005af' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/admin/orders.tpl',
      1 => 1458703852,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f275e44f5e62_01453821 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/srv/www/Dropbox/gamehedge/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="order-list">
	<h2>Order List</h2>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Order ID</th>
				<th>Order Date</th>
				<th>Customer</th>
				<th>Event</th>
				<th></th>
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
				<td><?php echo $_smarty_tpl->tpl_vars['order']->value['te_order_id'];?>
</td>
				<td><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['order']->value['create_date'],"m-d-Y");?>
</td>
				<td>
					<?php echo $_smarty_tpl->tpl_vars['order']->value['name'];?>
<br />
					<?php echo $_smarty_tpl->tpl_vars['order']->value['email'];?>

				</td>
				<td>
					<?php echo $_smarty_tpl->tpl_vars['order']->value['event_name'];?>
<br />
					<?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['order']->value['event_date'],"m-d-Y h:i A");?>

				</td>
				<td><a href="/admin/orders/view/<?php echo $_smarty_tpl->tpl_vars['order']->value['id'];?>
">View</a></td>
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
</section>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;?>

<?php }
}
