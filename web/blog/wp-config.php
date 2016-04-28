<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'heroku_301a92ea312e126');

/** MySQL database username */
define('DB_USER', 'bd9a5a15117087');

/** MySQL database password */
define('DB_PASSWORD', '656b96be');

/** MySQL hostname */
define('DB_HOST', 'us-cdbr-iron-east-03.cleardb.net');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'l!I)ndIPNURMInA==xP^U)Ga;UBGLT@kyF_vM/-[s)FGF}vk&dt^U($DuUiOP*|f;Pvfg<[]qMO$N=MNCQ^^uRa&>ShkX|xKBC+=IuMHtm^H*e@?bXrqGyikekT;%(CY');
define('SECURE_AUTH_KEY', 'ib@uBp$g>Ak|N>Lf%U(o;^|MVrlT&rdjqKYj;{jcjDfWDieNy%Z){wvuXP|R+AFl[+?a(B^/GrePOTj_O;ku}vf;Yy+w$F/TvVyoUFx]LbZQBPdaPLqQFcM/-IDsJIFS');
define('LOGGED_IN_KEY', 'XI+YyohMQ|}X]d)cfRD$Xrh+IKZD!RtDa*cH=w^zXG@]QOsW{p^C?s]OmgSS-CxsmY!XbEJ_lC}AeL+@yC@xfaxb!R*b[fCuF{SMaRRoHU*Zgi{PX<][;!cS!d+kGFjE');
define('NONCE_KEY', '$x*VGFWzUWFM_|;s!PkZGSEd$ttsTE*s+NN[S@HKPeUWj^R@+SZIScMWRT-KHr$K&D+Q!N%pDcynioC_q+F=XULKU@$iq?FZvXH{ARj;ab-^h[|KpwVeG]X**&TNgbDs');
define('AUTH_SALT', 'XfJyqF<@[/{!Co/yEZ;y(ZI%Dnz}()r-@y)$d-o)D_oc<@VS%M)*jW!$uua|<YF^[RO?dJV|&sakBFGSwfq_&bgpX^ia|XlLcw};sfSDbIEJvG$/thP-*X]zj%xdV*s[');
define('SECURE_AUTH_SALT', 'e!p^vXTi)Fzp+Qly-&G?^abx[{GB+FYp%NjWDd_JFvpv*]Tmw!sA}|<]RIhLxcYP&lZXFCc_M(KVo|t$vdK[Z-(e{JX|Ju]*gOIwrp(qmS|}%$lN&^]$SQgCI)qv%]bb');
define('LOGGED_IN_SALT', 'jte+nLJA(B@qv|jX?Mr>YCN$vlqqped)!qnAT/Asgd%dH(;PYvz%xh!LwT!/!>M<F]qI_XK%@?D+[D*>IOBd]$Yw{yotzeX+KB%id)p;&uLP;zZk!dhaB|R_(KWIr!$G');
define('NONCE_SALT', 'k&}h?Dfb;LPK!;tIBp@?Rjiy$nZ]e<afmjWGv]+BaQ[/U^T+X-y[=wehBvKX-Pv+K-&qeZ@w!-*q(DT&AETv=)dmP]iaPAAdpDg;m*aKy}L%(JGTGPEzr>%%]mT|Qe)I');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_kegp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

/**
 * Include tweaks requested by hosting providers.  You can safely
 * remove either the file or comment out the lines below to get
 * to a vanilla state.
 
if (file_exists(ABSPATH . 'hosting_provider_filters.php')) {
	include('hosting_provider_filters.php');
} */
