<?php
// Handle Header
$smarty->assign('body_tag', '');
$smarty->assign('head_tags', '');
$smarty->assign('css', '');
$smarty->assign('hscripts', '');
$header = $smarty->fetch('shared/header.tpl');
$menu = $smarty->fetch('shared/menu.tpl');
// Handle Footer
$smarty->assign('fscripts', '');
$footer = $smarty->fetch('shared/footer.tpl');
$smarty->assign('header', $header);
$smarty->assign('menu', $menu);
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
case 'contact':
    $value_1 = rand(1, 10);
    $value_2 = rand(1, 10);
    $answer = $value_1 + $value_2;
    $smarty->assign('title', 'Contact Us');
    $smarty->assign('value_1', $value_1);
    $smarty->assign('value_2', $value_2);
    $smarty->assign('answer', $answer);
    $smarty->assign('fscripts', '<script src="/assets/js/jquery.validate.js"></script><script src="/assets/js/contact.js"></script>');
    $footer = $smarty->fetch('shared/footer.tpl');
    $smarty->assign('footer', $footer);
	$smarty->display('contact.tpl');
    break;
case 'contact-send':
    if(isset($request['name'])){
        $smarty->assign('title', 'Thanks for contact us');
        
        $subject = "New message using the contact form of www.gamehedge.com from " . $request['email'];
        
        $message = '
        <html>
        <head>
          <title>New message of the contact section of www.gamehedge.com</title>
        </head>
        <body>
          <p><strong>Message details:</strong></p>
          <br/>
          <p><strong>Name:</strong> ' . $request['name'] . '</p>
          <p><strong>Email:</strong> ' . $request['email'] . '</p>
          <p><strong>Message:</strong> ' . $request['message'] . '</p>
        </body>
        </html>
        ';
        
        require_once 'vendor/autoload.php';
        
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->Debugoutput = 'html';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        #$mail->Username = "contact@gamehedge.com";
        #$mail->Password = "Gamehedge10036";
        $mail->Username = "edgarforerogranados@gmail.com";
        $mail->Password = "Granados1";
        $mail->setFrom('contact@gamehedge.com', 'Gamehedge contact system');
        $mail->addAddress('support@gamehedge.com', 'Gamehedge Support');
        
        $mail->Subject = $subject;
        $mail->msgHTML($message);
        
        if (!$mail->send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
            $smarty->display('contact-send.tpl');
        }
    }
    else {
        header('Location: /contact');
        exit;
    }
    break;
case '';
	// 404
	break;
}
?>