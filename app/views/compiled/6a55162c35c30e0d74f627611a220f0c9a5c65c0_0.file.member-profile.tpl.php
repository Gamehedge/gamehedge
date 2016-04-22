<?php
/* Smarty version 3.1.29, created on 2016-04-22 17:12:44
  from "/Users/edgarforero/Documents/Projects/GameHedge_Site/app/views/member-profile.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_571a3f6c39f424_13874657',
  'file_dependency' => 
  array (
    '6a55162c35c30e0d74f627611a220f0c9a5c65c0' => 
    array (
      0 => '/Users/edgarforero/Documents/Projects/GameHedge_Site/app/views/member-profile.tpl',
      1 => 1461336407,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_571a3f6c39f424_13874657 ($_smarty_tpl) {
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
				<?php if ($_smarty_tpl->tpl_vars['ordered']->value) {?>
				<div class="row">
					<div class="col-md-4">
						<section id="customer-billing">
							<h2>Default Billing Method</h2>
							<img src="/assets/img/icon-<?php echo mb_strtolower($_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['card_company'], 'UTF-8');?>
.png" alt="<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['card_company'];?>
" /> <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['card_company'];?>
 ending in <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['last_digits'];?>
 Exp <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['expiration_month'];?>
/<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['expiration_year'];?>

							<address>
								<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['address']['name'];?>
<br />
								<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['address']['street_address'];?>
<br />
								<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['address']['locality'];?>
, <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['address']['region'];?>
 <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_credit_card']['address']['postal_code'];?>

							</address>
						</section>
					</div>
					<div class="col-md-4">
						<section id="customer-shipping">
							<h2>Default Shipping Address</h2>
							<address>
								<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_shipping_address']['name'];?>
<br />
								<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_shipping_address']['street_address'];?>
<br />
								<?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_shipping_address']['locality'];?>
, <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_shipping_address']['region'];?>
 <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_shipping_address']['postal_code'];?>

							</address>
						</section>
					</div>
					<div class="col-md-4">
						<section id="customer-contact">
							<h2>Contact Information</h2>
							<p><strong>Phone Number: </strong> <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_phone_number']['number'];?>
</p>
							<p><strong>Email Address: </strong> <?php echo $_smarty_tpl->tpl_vars['cdata']->value['primary_email_address']['address'];?>
</p>
						</section>
					</div>
				</div>
				<?php } else { ?>
				<p>You haven't placed an order yet.</p>
				<?php }?>
			</div>
		</div>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;?>

<?php }
}
