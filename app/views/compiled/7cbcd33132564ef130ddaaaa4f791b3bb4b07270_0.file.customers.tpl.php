<?php
/* Smarty version 3.1.29, created on 2016-04-04 23:33:46
  from "/home/gamehedg/app/views/admin/customers.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_57034e3a6222e3_38046009',
  'file_dependency' => 
  array (
    '7cbcd33132564ef130ddaaaa4f791b3bb4b07270' => 
    array (
      0 => '/home/gamehedg/app/views/admin/customers.tpl',
      1 => 1459217520,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_57034e3a6222e3_38046009 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once '/home/gamehedg/app/libs/smarty/libs/plugins/modifier.date_format.php';
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="customer-list">
	<h2>Search Customers</h2>
	<section id="customer-search">
		<form action="/admin/customers/search" method="GET">
			<div class="input-group">
				<input id="q" name="q" type="text" class="form-control" placeholder="Search by name or email...">
				<span class="input-group-btn"><input type="submit" class="btn btn-default" value="Search" /></span>
			</div>
		</form>
	</section>
	<h2>Customer List</h2>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Register Date</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<?php
$_from = $_smarty_tpl->tpl_vars['clients']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_client_0_saved_item = isset($_smarty_tpl->tpl_vars['client']) ? $_smarty_tpl->tpl_vars['client'] : false;
$_smarty_tpl->tpl_vars['client'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['client']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['client']->value) {
$_smarty_tpl->tpl_vars['client']->_loop = true;
$__foreach_client_0_saved_local_item = $_smarty_tpl->tpl_vars['client'];
?>
			<tr>
				<td><?php echo $_smarty_tpl->tpl_vars['client']->value['name'];?>
</td>
				<td><?php echo $_smarty_tpl->tpl_vars['client']->value['email'];?>
</td>
				<td><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['client']->value['create_date'],"m-d-Y");?>
</td>
				<td><a href="/admin/customers/view/<?php echo $_smarty_tpl->tpl_vars['client']->value['id'];?>
">View</a></td>
			</tr>
			<?php
$_smarty_tpl->tpl_vars['client'] = $__foreach_client_0_saved_local_item;
}
if ($__foreach_client_0_saved_item) {
$_smarty_tpl->tpl_vars['client'] = $__foreach_client_0_saved_item;
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
