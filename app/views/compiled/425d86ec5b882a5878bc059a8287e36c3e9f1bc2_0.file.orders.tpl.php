<?php
/* Smarty version 3.1.29, created on 2016-04-14 01:14:35
  from "/home/gamehedg/app/views/admin/orders.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_570f435b76bce0_76231790',
  'file_dependency' => 
  array (
    '425d86ec5b882a5878bc059a8287e36c3e9f1bc2' => 
    array (
      0 => '/home/gamehedg/app/views/admin/orders.tpl',
      1 => 1460617990,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_570f435b76bce0_76231790 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/home/gamehedg/app/libs/smarty/libs/plugins/modifier.date_format.php';
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
				<th>Refund Status</th>
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
				<td>
					<select id="refund_status<?php echo $_smarty_tpl->tpl_vars['order']->value['id'];?>
">
					<?php
$_from = $_smarty_tpl->tpl_vars['refund']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_v_1_saved_item = isset($_smarty_tpl->tpl_vars['v']) ? $_smarty_tpl->tpl_vars['v'] : false;
$__foreach_v_1_saved_key = isset($_smarty_tpl->tpl_vars['k']) ? $_smarty_tpl->tpl_vars['k'] : false;
$_smarty_tpl->tpl_vars['v'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['k'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['v']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
$__foreach_v_1_saved_local_item = $_smarty_tpl->tpl_vars['v'];
?>
					<option value="<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
" <?php if ($_smarty_tpl->tpl_vars['k']->value == $_smarty_tpl->tpl_vars['order']->value['refund_status']) {?>selected="selected"<?php }?>><?php echo $_smarty_tpl->tpl_vars['v']->value;?>
</option>
					<?php
$_smarty_tpl->tpl_vars['v'] = $__foreach_v_1_saved_local_item;
}
if ($__foreach_v_1_saved_item) {
$_smarty_tpl->tpl_vars['v'] = $__foreach_v_1_saved_item;
}
if ($__foreach_v_1_saved_key) {
$_smarty_tpl->tpl_vars['k'] = $__foreach_v_1_saved_key;
}
?>
					</select><br />
					<button class="change_refund" data-rel="<?php echo $_smarty_tpl->tpl_vars['order']->value['id'];?>
">Update</button>
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
