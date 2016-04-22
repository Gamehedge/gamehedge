<?php
/* Smarty version 3.1.29, created on 2016-03-22 23:36:33
  from "/srv/www/Dropbox/gamehedge/app/views/shared/footer.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f20f41695391_65338442',
  'file_dependency' => 
  array (
    '51c8896fa6047397ac3448dc738f6279f0d94047' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/shared/footer.tpl',
      1 => 1458359566,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f20f41695391_65338442 ($_smarty_tpl) {
?>
		<footer>
			<div class="container">
				<div class="row">
					<div class="col-md-4">
						<div class="footer-nav">
							<h2>What to Know</h2>
							<nav role="navigation">
								<ul>
									<li><a href="/our-terms">Our Terms</a></li>
									<li><a href="/faq">Frequently Asked</a></li>
									<li><a href="mailto:stephenkane@gamehedge.com">Contact Us</a></li>
								</ul>
							</nav>
						</div>
					</div>
					<div class="col-md-4">
						<div class="footer-nav">
							<h2>Important Links</h2>
							<nav role="navigation">
								<ul>
									<li><a href="/blog">GameHedge Blog</a></li>
									<li><a href="/how-it-works">How it Works</a></li>
									<li><a href="/member">My Account</a></li>
								</ul>
							</nav>
						</div>
					</div>
					<div class="col-md-4">
						<div class="footer-nav">
							<h2>Social Media</h2>
							<nav role="navigation">
								<ul>
									<li><a href="http://www.facebook.com/gamehedge">Facebook</a></li>
									<li><a href="http://www.twitter.com/gamehedge">Twitter</a></li>
									<li><a href="http://www.instagram.com/gamehedge">Instagram</a></li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
				<hr />
				<div class="footer-bottom clearfix">
					Copyright <?php echo $_smarty_tpl->tpl_vars['year']->value;?>
: GameHedge, LLC &middot; All Rights Reserved.
					<div class="pull-right">
						<nav role="navigation">
							<a href="/privacy-policy">Privacy Policy</a> | <a href="/our-terms">Terms</a>
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
 src="/assets/js/site.js"><?php echo '</script'; ?>
>
	</body>
</html><?php }
}
