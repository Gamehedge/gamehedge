<?php
/* Smarty version 3.1.29, created on 2016-04-25 17:33:34
  from "/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/admin/shared/footer.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_571e38ceb2d358_43880930',
  'file_dependency' => 
  array (
    '60dba8c4b324ff380eef71fdeaeb9a1885a03397' => 
    array (
      0 => '/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/admin/shared/footer.tpl',
      1 => 1461336411,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_571e38ceb2d358_43880930 ($_smarty_tpl) {
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
