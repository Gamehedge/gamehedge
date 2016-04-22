<?php
/* Smarty version 3.1.29, created on 2016-03-23 06:54:14
  from "/srv/www/Dropbox/gamehedge/app/views/admin/shared/footer.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f275d6aa7b20_17206556',
  'file_dependency' => 
  array (
    'c1cac513412188cfe3cd10a4aa5530935a8ccfbb' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/admin/shared/footer.tpl',
      1 => 1458279587,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f275d6aa7b20_17206556 ($_smarty_tpl) {
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
