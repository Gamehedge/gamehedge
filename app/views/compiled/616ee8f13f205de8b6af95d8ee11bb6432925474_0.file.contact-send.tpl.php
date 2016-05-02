<?php
/* Smarty version 3.1.29, created on 2016-05-03 00:13:07
  from "/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/contact-send.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_5727d0f3b7a9c0_00155148',
  'file_dependency' => 
  array (
    '616ee8f13f205de8b6af95d8ee11bb6432925474' => 
    array (
      0 => '/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/contact-send.tpl',
      1 => 1462227184,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5727d0f3b7a9c0_00155148 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<main>
    <div class="container">
        <h1 class="text-center"><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
        <section id="contact-us">
            <div class="row">
                <div class="col-md-12" style="min-height: 300px;">
                    <br />
                    <br />
                    <p class="text-center">Your message was sent. It will be answered as soon as possible.</p>
                    <p class="text-center"><a href="/">Return to the site.</a></p>
                </div>    
            </div>
        </section>
    </div>
</main>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
