<?php
$smarty->caching = false;
switch($verb) {
case '';
	if(isset($request) && !empty($request['query'])) {
		$hscripts = '
			<script type="text/javascript">
				var api_key      = \'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuZ2FtZWhlZGdlLmNvbSIsImlhdCI6MTQ1OTU0ODQ5MSwiZXhwIjoxNDkxMDg0NDkxLCJkYXRhIjp7Imhvc3RuYW1lIjoid3d3LmdhbWVoZWRnZS5jb20ifX0.sr5aSFIe9cgbipqIZ2t3yX_jBL1XvYygffneLLRLCOg\';
				var search_query = \'' . $request['query'] . '\';
			</script>
		';
	} else {
		$hscripts = '
			<script type="text/javascript">
				var api_key = \'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuZ2FtZWhlZGdlLmNvbSIsImlhdCI6MTQ1OTU0ODQ5MSwiZXhwIjoxNDkxMDg0NDkxLCJkYXRhIjp7Imhvc3RuYW1lIjoid3d3LmdhbWVoZWRnZS5jb20ifX0.sr5aSFIe9cgbipqIZ2t3yX_jBL1XvYygffneLLRLCOg\';
			</script>
		';
	}
	$fscripts = '<link rel="stylesheet" href="/assets/css/sweetalert.css"><link rel="stylesheet" href="/assets/ladda/ladda-themeless.min.css"><script src="/assets/ladda/spin.min.js"></script><script src="/assets/ladda/ladda.min.js"></script><script src="/assets/angular-ladda/angular-ladda.min.js"></script><script src="/assets/js/app/app.js?v111"></script><script src="/assets/js/sweetalert.min.js"></script>';
	// Handle Header
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', 'ng-app="gamehedge"');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', $hscripts);
	$header = $smarty->fetch('shared/header.tpl');
	// Handle Footer
	$smarty->assign('fscripts', $fscripts);
	$footer = $smarty->fetch('shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('title', 'Search Tickets');
	$smarty->display('search.tpl');
	break;
}
?>