<?php
use \TicketEvolution\Client as TEvoClient;

// Handle Header
$smarty->assign('body_tag', ' id="home"');
$smarty->assign('head_tags', '');
$smarty->assign('css', '');
$smarty->assign('hscripts', '');
$header = $smarty->fetch('shared/header.tpl');
$menu = $smarty->fetch('shared/menu2.tpl');
// Handle Footer
$smarty->assign('fscripts', '<script src="/assets/js/moment.min.js"></script><script src="/assets/js/home.js?v2"></script>');
$footer = $smarty->fetch('shared/footer.tpl');
switch($verb) {
  case '';
    $events = array();
  	$smarty->assign('header', $header);
    $smarty->assign('menu', $menu);
  	$smarty->assign('footer', $footer);
  	$smarty->assign('title', 'Welcome to GameHedge');
  	$smarty->assign('events', $events);
  	$smarty->display('press.tpl');
  	break;
  }
?>