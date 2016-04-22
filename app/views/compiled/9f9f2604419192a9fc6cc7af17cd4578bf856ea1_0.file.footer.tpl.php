<?php
/* Smarty version 3.1.29, created on 2016-04-01 18:48:03
  from "/home/gamehedg/app/views/admin/shared/footer.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56ff16c3a78849_05958240',
  'file_dependency' => 
  array (
    '9f9f2604419192a9fc6cc7af17cd4578bf856ea1' => 
    array (
      0 => '/home/gamehedg/app/views/admin/shared/footer.tpl',
      1 => 1459217524,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56ff16c3a78849_05958240 ($_smarty_tpl) {
?>
			<?php if ($_smarty_tpl->tpl_vars['loggedin']->value == 1) {?>
						</section>
					</div>
				</div>
			</div>
			<?php }?>
		</main>
		<footer>
			<div class="container">
				<div class="footer-bottom clearfix">
					Copyright <?php echo $_smarty_tpl->tpl_vars['year']->value;?>
: GameHedge, LLC &middot; All Rights Reserved.
					<div class="pull-right">
						<nav role="navigation">
							<a href="/privacy-policy">Privacy Policy</a> | <a href="/our-terms">Terms</a> | <a href="/site-map">Site Map</a>
						</nav>
					</div>
				</div>
			</div>
		</footer>
		<div growl></div>
		<?php echo '<script'; ?>
 src="/assets/js/bundle.min.js"><?php echo '</script'; ?>
>
		<?php echo $_smarty_tpl->tpl_vars['fscripts']->value;?>

		<?php echo '<script'; ?>
 src="/assets/js/site-admin.js"><?php echo '</script'; ?>
>
	</body>
</html><?php }
}
