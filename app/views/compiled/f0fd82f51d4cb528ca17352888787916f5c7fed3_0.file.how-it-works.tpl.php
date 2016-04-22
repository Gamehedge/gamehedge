<?php
/* Smarty version 3.1.29, created on 2016-03-23 10:38:41
  from "/srv/www/Dropbox/gamehedge/app/views/how-it-works.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56f2aa712df305_88607612',
  'file_dependency' => 
  array (
    'f0fd82f51d4cb528ca17352888787916f5c7fed3' => 
    array (
      0 => '/srv/www/Dropbox/gamehedge/app/views/how-it-works.tpl',
      1 => 1458450965,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56f2aa712df305_88607612 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<main>
	<div class="container">
		<h1 class="text-center"><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
		<section id="how-it-works">
			<div class="row">
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-tickets.png" alt="Tickets" /></div>
						<p>Find your game &amp; purchase your tickets from GameHedge. Every ticket comes with our Good Game Guarantee!</p>
					</div>
				</div>
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-stadium.png" alt="Stadium" /></div>
						<p>Attend the game &amp; enjoy your team with no worries.</p>
					</div>
				</div>
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-scoreboard.png" alt="Scoreboard" /></div>
						<p>If the home team loses by five or more runs, you get 50% of the ticket price back.</p>
					</div>
				</div>
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-handshake.png" alt="Handshake" /></div>
						<p>Just come back to GameHedge.com for your refund!</p>
					</div>
				</div>
			</div>
			<hr />
			<div class="guarantee row">
				<div class="col-sm-2"><img src="/assets/img/badge-gamehedge.png" /></div>
				<div class="col-sm-10">
					<h2>Good Game Guarantee&trade;</h2>
					<p>All GameHedge tickets come with our exclusive Good Game Guarantee at no additional cost to you. So, if the home team loses by 5 runs or more, we will refund 50% of the ticket price. No gimmicks. No catches.</p>
				</div>
			</div>
		</section>
	</div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
