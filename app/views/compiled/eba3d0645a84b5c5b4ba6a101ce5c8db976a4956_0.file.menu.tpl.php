<?php
/* Smarty version 3.1.29, created on 2016-05-23 22:30:35
  from "/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/shared/menu.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_5743686b8f43e9_91711911',
  'file_dependency' => 
  array (
    'eba3d0645a84b5c5b4ba6a101ce5c8db976a4956' => 
    array (
      0 => '/Users/edgarforero/Documents/Projects/GameHedge/gamehedge/app/views/shared/menu.tpl',
      1 => 1464034827,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5743686b8f43e9_91711911 ($_smarty_tpl) {
?>
<nav class="navbar navbar-default navbar-gamehedge">

        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed navbar-toggle-gamehedge" data-toggle="collapse" data-target="#bs-navbar-collapse-gamehedge" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <a class="navbar-brand" href="/">
                <img class="logo-image" alt="GameHedge" src="/assets/img/logo.png">
            </a>
        </div>

        <div class="collapse navbar-collapse" id="bs-navbar-collapse-gamehedge">

            <ul class="nav navbar-nav navbar-right nav-gamehedge">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">MLB <span class="caret"></span></a>
                    <ul class="dropdown-menu sports-dropdown-menu">
                        <div class="sports-dropdown-menu-container">
                            <div class="row">
                                <div class="col-md-4">
                                    <h2>American League: East</h2>
                                    <nav role="navigation">
                                        <ul>
                                            <li><a href="/performer/16425/baltimore-orioles-tickets">Baltimore Orioles</a></li>
                                            <li><a href="/performer/15532/boston-red-sox-tickets">Boston Red Sox</a></li>
                                            <li><a href="/performer/15533/new-york-yankees-tickets">New York Yankees</a></li>
                                            <li><a href="/performer/15534/tampa-bay-rays-tickets">Tampa Bay Rays</a></li>
                                            <li><a href="/performer/15535/toronto-blue-jays-tickets">Toronto Blue Jays</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="col-md-4">
                                    <h2>American League: Central</h2>
                                    <nav role="navigation">
                                        <ul>
                                            <li><a href="/performer/15536/chicago-white-sox-tickets">Chicago White Sox</a></li>
                                            <li><a href="/performer/15537/cleveland-indians-tickets">Cleveland Indians</a></li>
                                            <li><a href="/performer/15538/detroit-tigers-tickets">Detroit Tigers</a></li>
                                            <li><a href="/performer/15539/kansas-city-royals-tickets">Kansas City Royals</a></li>
                                            <li><a href="/performer/15540/minnesota-twins-tickets">Minnesota Twins</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="col-md-4">
                                    <h2>American League: West</h2>
                                    <nav role="navigation">
                                        <ul>
                                            <li><a href="/performer/15552/houston-astros-tickets">Houston Astros</a></li>
                                            <li><a href="/performer/15541/los-angeles-angels-tickets">Los Angeles Angels</a></li>
                                            <li><a href="/performer/15542/oakland-athletics-tickets">Oakland Athletics</a></li>
                                            <li><a href="/performer/15543/seattle-mariners-tickets">Seattle Mariners</a></li>
                                            <li><a href="/performer/15544/texas-rangers-tickets">Texas Rangers</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <h2>National League: East</h2>
                                    <nav role="navigation">
                                        <ul>
                                            <li><a href="/performer/15545/atlanta-braves-tickets">Atlanta Braves</a></li>
                                            <li><a href="/performer/15546/miami-marlins-tickets">Miami Marlins</a></li>
                                            <li><a href="/performer/15547/new-york-mets-tickets">New York Mets</a></li>
                                            <li><a href="/performer/15548/philadelphia-phillies-tickets">Philadelphia Phillies</a></li>
                                            <li><a href="/performer/15549/washington-nationals-tickets">Washington Nationals</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="col-md-4">
                                    <h2>National League: Central</h2>
                                    <nav role="navigation">
                                        <ul>
                                            <li><a href="/performer/15550/chicago-cubs-tickets">Chicago Cubs</a></li>
                                            <li><a href="/performer/15551/cincinnati-reds-tickets">Cincinnati Reds</a></li>
                                            <li><a href="/performer/15553/milwaukee-brewers-tickets">Milwaukee Brewers</a></li>
                                            <li><a href="/performer/15554/pittsburgh-pirates-tickets">Pittsburgh Pirates</a></li>
                                            <li><a href="/performer/15555/st-louis-cardinals-tickets">St. Louis Cardinals</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="col-md-4">
                                    <h2>National League: West</h2>
                                    <nav role="navigation">
                                        <ul>
                                            <li><a href="/performer/15556/arizona-diamondbacks-tickets">Arizona Diamondbacks</a></li>
                                            <li><a href="/performer/15557/colorado-rockies-tickets">Colorado Rockies</a></li>
                                            <li><a href="/performer/15558/los-angeles-dodgers-tickets">Los Angeles Dodgers</a></li>
                                            <li><a href="/performer/15559/san-diego-padres-tickets">San Diego Padres</a></li>
                                            <li><a href="/performer/15560/san-francisco-giants-tickets">San Francisco Giants</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </ul>
                </li>
                <li><a href="/member/login">My Account</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li id="nav-user"><?php if ($_smarty_tpl->tpl_vars['fname']->value != '') {?><a href="/member/logout"><?php echo $_smarty_tpl->tpl_vars['fname']->value;?>
 Logout</a><?php } else { ?><a href="/member/login">Login</a><?php }?></li>
            </ul>
            <form class="navbar-form navbar-right" id="header-search-nav" role="search" method="POST" action="/search">
                <div class="form-group">
                    <label for="query" class="sr-only">Search Team, Venue or Location</label>
                    <div class="input-group">
                        <input type="text" id="query" name="query" class="form-control" placeholder="Search For Tickets" />
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" onclick="$('#header-search-nav').submit();"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </div>
            </form>
        </div>



</nav><?php }
}
