<?php
// Handle Header
$smarty->assign('body_tag', '');
$smarty->assign('head_tags', '');
$smarty->assign('css', '');
$smarty->assign('hscripts', '');
$header = $smarty->fetch('shared/header.tpl');
// Handle Footer
$smarty->assign('fscripts', '');
$footer = $smarty->fetch('shared/footer.tpl');
$smarty->assign('header', $header);
$smarty->assign('footer', $footer);
switch($verb) {
case 'how-it-works':
	$smarty->assign('title', 'How Does the Good Game Guarantee Work?');
	$smarty->display('how-it-works.tpl');
	break;
case 'faq':
	$smarty->assign('title', 'GameHedge FAQ');
	$smarty->display('faq.tpl');
	break;
case 'our-terms':
	$smarty->assign('title', 'GameHedge Terms and Conditions');
	$smarty->display('our-terms.tpl');
	break;
case 'privacy-policy':
	$smarty->assign('title', 'GameHedge Privacy Policy');
	$smarty->display('privacy-policy.tpl');
	break;
case '';
	// 404
	break;
}
?>