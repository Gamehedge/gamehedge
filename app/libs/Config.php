<?php
class Config {
	public function __construct() {
	}
	public static function get_db_login() {
		if(MODE == 'dev') {
			return array('db_host' => '127.0.0.1',
                   'db_name' => 'gamehedg_game',
                   'db_user' => 'root',
                   'db_pass' => 'root');
		} else {
			return array('db_host' => 'us-cdbr-iron-east-03.cleardb.net',
                   'db_name' => 'heroku_301a92ea312e126',
                   'db_user' => 'bd9a5a15117087',
                   'db_pass' => '656b96be');
		}
	}
	public static function get_team_data($team = '') {
		$teams = array('Arizona Diamondbacks'  => array('name'     => 'Diamondbacks',
                                                    'location' => 'Arizona',
                                                    'stadium'  => 'Chase Field',
                                                    'mapid'    => '7AFFD65B-32DD-47DF-82CE-B8627BD2B121',
                                                    'division' => 'National League West',
                                                    'subtext'  => '
																																	<h3>Arizona Diamondbacks</h3>
																																	<p>The Arizona Diamondbacks seem to be the sexy pick by many experts as the team to make a run at the postseason this year.  With the blockbuster signing of Zack Greinke coming over from the <a href="https://www.gamehedge.com/performer/15558/los-angeles-dodgers-tickets">Los Angeles Dodgers</a>, along with slugger’s Paul Goldschmidt and David Peralta the Diamondbacks will pose a challenge to many in the division. Shelby Miller, arriving in a trade with the Atlanta Braves will make Miller and Greinke a great 1-2 punch at the front of rotation. Brad Ziegler is penciled in at closer after taking over the role last May. Nick Ahmed, one of the top defensive shortstops will defend the middle with first base manned by the versatile Paul GoldSchmidt. Unfortunately, the team suffered a setback with an elbow injury to budding star A.J. Pollack.  Manager Tony La Russa and GM Dave Stewart will be hard pressed to find someone to fill the void. Nonetheless, the Diamondbacks are set to take a significant leap forward in the National League West, while giving fans something to cheer for.</p>
																																	<h3>Chase Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Arizona Diamondbacks at Chase Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Atlanta Braves'        => array('name'     => 'Braves',
                                                    'location' => 'Atlanta',
                                                    'stadium'  => 'Turner Field',
                                                    'mapid'    => '618A1AF2-A3CE-43FD-9ACE-EFEBF765A382',
                                                    'division' => 'National League East',
                                                    'subtext'  => '
																																	<h3>Atlanta Braves</h3>
																																	<p>A former perennial playoff team, the Braves have reached the postseason only once in the last 10 years.  A team in full rebuild mode struggles with one of the worst pitching rotations in all of baseball.  In fact Atlanta had a 151 starts by pitchers 25 years or younger, consequently the most in history.  A far cry of the glory years some 20 seasons ago.  Nonetheless there is hope and optimism illustrated by a team reportedly with excellent attitudes and a strong work ethic.  Also, 30 year old rookie prospect Hector Olivera from Cuba promises to bring some new excitement for a club short on star power.  Reports also indicate the team is healthier than it has been in quite some time.  With very little expectation the Atlanta Braves may surprise teams this year since many clubs may overlook them..</p>
																																	<h3>Turner Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Atlanta Braves at Turner Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund 50% of the price of the ticket, no gimmicks no hassle.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Baltimore Orioles'     => array('name'     => 'Orioles',
                                                    'location' => 'Baltimore',
                                                    'stadium'  => 'Oriole Park',
                                                    'mapid'    => '7439712D-486C-41B6-BA8A-14C27A38CAC3',
                                                    'division' => 'American League East',
                                                    'subtext'  => '
																																	<h3>Baltimore Orioles</h3>
																																	<p></p>
																																	<p>The Orioles have been competitive over the last few years. Last year they took a step back from their 96 win season in 2014. Starting pitching is still a struggle for them. With the O’s among the least improved AL teams this offseason they will need to rely on Buck Showalter’s managing experience to combat the likes of Boston, New York and Toronto. Even the Tampa Bay Rays have improved so it will be a tall task to stay above .500.</p>
																																	<h3>Oriole Park at Camden Yards and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Baltimore Orioles at Oriole Park at Camden Yards at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Boston Red Sox'        => array('name'     => 'Red Sox',
                                                    'location' => 'Boston',
                                                    'stadium'  => 'Fenway Park',
                                                    'mapid'    => '30C04C8B-6BDC-4E8C-B1A8-5E2772DE3FC3',
                                                    'division' => 'American League East',
                                                    'subtext'  => '
																																	<h3>Boston Red Sox</h3>
																																	<p></p>
																																	<p>David Price will pitch for the Sox this year and will no doubt raise the Sox from their 78-84 record in 2015. This year will mark final season for David Ortiz as he announced that 2016 will be his last.  Last year’s signings of Pablo Sandoval and Hanley Ramirez did not produce for Boston but 2016 is a new year and new expectations. The Red Sox have many budding stars in Mookie Betts and Jackie Bradley Jr will have breakout seasons. John Farrell will manage with a renewed view on life and baseball determination after last year’s leave of absence due to his cancer treatment. 2016 might bring a return to the post season if they can chip away at Toronto and New York. </p>
																																	<h3>Fenway Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Boston Red Sox at Fenway Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Chicago White Sox'     => array('name'     => 'White Sox',
                                                    'location' => 'Chicago',
                                                    'stadium'  => 'U.S. Cellular Field',
                                                    'mapid'    => '8DB89F8F-8B45-4EE7-8F9F-5E4FCA69EC37',
                                                    'division' => 'American League Central',
                                                    'subtext'  => '
																																	<h3>Chicago White Sox</h3>
																																	<p>Chicago’s off season additions to the roster have gained excitement within the organization and fans as well. Adding Todd Frazier and Brett Lawrie should lift their 3.8 runs per game average, the lowest in the AL last year. Should be a good battle for the shortstop position with both Tyler Saladino and Carlos Sanchez vying for the starting position. Alex Avila and Dioner Navarro will platoon at catcher with Tyler Flowers leaving for the Atlanta Braves. Right hander Mat Latos is added to the solid starting pitching staff and the bullpen should remain solid lead by closer David Robinson. It will be about keeping everyone healthy in the re-vamped offense to battle Kansas City and Detroit.</p>
																																	<h3>US Cellular Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see The Chicago White Sox at US Cellular Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Chicago Cubs'          => array('name'     => 'Cubs',
                                                    'location' => 'Chicago',
                                                    'stadium'  => 'Wrigley Field',
                                                    'mapid'    => '2718625D-CEC3-4AE7-8992-19968A596AC3',
                                                    'division' => 'National League Central',
                                                    'subtext'  => '
																																	<h3>Chicago Cubs</h3>
																																	<p>Fans are expecting big things this year from their Cubs. In fact Las Vegas odds maker’s have the Chicago Cubs winning it all this year.  The ivory is expected to be green all the way to November while Wrigley Field is gearing to host a long awaited World Series. Cy Young winner Jake Arrieta leads the rotation with Jon Lester and John Lackey in the two and three spots respectively. The bullpen will be strong with a host of situational arms ready to close out a win. Ken Zobrist is yet another player to join the team with a champion pedigree, coming over from the World Series Champions <a href="https://www.gamehedge.com/performer/15539/kansas-city-royals-tickets">Kansas City Royals</a> via free agency.  The Cubs also made a splash in the offseason signing centerfield stalwart Jason Heyward.  With Kris Bryant at third, and Anthony Rizzo at first, the Cubs possess one of the most dynamic corner infielders both of whom are only 26, and 24 respectively. Joe Maddon and Theo Epstein have garnered nothing but praise for turning around a franchise long mired in mediocrity at best.  With expectations at an all time high, Wrigley Field is sure to be must see TV in 2016. </p>
																																	<h3>Wrigley Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Chicago Cubs at Wrigley Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Cincinnati Reds'       => array('name'     => 'Reds',
                                                    'location' => 'Cincinnati',
                                                    'stadium'  => 'Great American Ball Park',
                                                    'mapid'    => 'C9ABC4AA-08B5-4E86-80CC-FDD18E9F6CB2',
                                                    'division' => 'National League Central',
                                                    'subtext'  => '
																																	<h3>Cincinnati Reds</h3>
																																	<p>Having rolled out an all rookie starting rotation in the second half of last year, it’s apparent that the Cincinnati Reds are in somewhat of a rebuild mode. In fact, the only guarantees to start the year are Anthony Desclafani and Rasiel Iglesias, however, there are top prospects waiting for the call to “The Bigs” if needed. The bullpen is wide open with Aroldis Chapman being traded to the <a href="https://www.gamehedge.com/performer/15533/new-york-yankees-tickets">New York Yankees</a> in the offseason. Returning for a 10th year will be veteran Joey Votto anchoring the lineup along with outfielder Jay Bruce. The Reds will need an injury free seasons from Zack Cozart and Devin Mesoraco as well as strong pitching from their young staff to compete and keep the fans in engaged at Great American Ball Park.</p>
																																	<h3>Great American Ball Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Cincinnati Reds at Great American Ball Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Cleveland Indians'     => array('name'     => 'Indians',
                                                    'location' => 'Cleveland',
                                                    'stadium'  => 'Progressive Field',
                                                    'mapid'    => 'D5A0FA4A-AA94-49DB-AB1F-AA16054068D9',
                                                    'division' => 'American League Central',
                                                    'subtext'  => '
																																	<h3>Cleveland Indians</h3>
																																	<p>Manager Terry Francona will have to work some magic to keep the Indians near the Top. The offense will need to be better to keep up with a division that includes the Detroit Tigers, Minnesota Twins and of course the Kansas City Royals. Adding Mike Napoli and Carlos Gonzalez should give them a boost while their best hitter Michael Brantley is still in recovery and will miss the early part of the season. Pitchers Josh Tomlin and Cody Anderson and the rest of the staff will fight to be in the starting rotation, or join the bullpen with the likes of Joba Chamberlain, Cody Allen, and Zach Mcallister. The crowded outfield will sort itself out with Abraham Almonte and Lonnie Chisenhall most likely securing two of the three spots.</p>
																																	<h3>Progressive Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see The Cleveland Indians at Progressive Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Colorado Rockies'      => array('name'     => 'Rockies',
                                                    'location' => 'Colorado',
                                                    'stadium'  => 'Coors Field',
                                                    'mapid'    => 'BB10B76E-657E-411F-9661-EC521A42464B',
                                                    'division' => 'National League West',
                                                    'subtext'  => '
																																	<h3>Colorado Rockies</h3>
																																	<p>With Troy Tulowitzki gone, the Rockies are looking for a new face of the franchise and a team that will bring cheers to Coors Field. It will be a tall task to move up and compete with the likes of the <a href="https://www.gamehedge.com/performer/15556/arizona-diamondbacks-tickets">Diamondbacks</a>, <a href="https://www.gamehedge.com/performer/15558/los-angeles-dodgers-tickets">Dodgers</a>, and <a href="https://www.gamehedge.com/performer/15560/san-francisco-giants-tickets">Giants</a>. The rotation is filled with capable arms but no clear number 1. Chad Bettis is gunning to be the ace with Boon Logan slated as the lead closer. The infield is solid with All-Star D. LeMahieu at second and Nolan Arenado at third base. Arenado is at the heart of the lineup with a league leading 42 home runs in 2015 to go along with 130 rbi.  Arenado appears to be picking up where he left off while boasting a .605 batting average in preseason.  With shortstop Jose Reyes off field issues, the team most do their best to focus in a highly competitive division.  The Colorado Rockies must use Coors Field as an asset and leverage their home filed advantage up the ladder in a highly contested National League West.</p>
																																	<h3>Coors Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Colorado Rockies at Coors Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Detroit Tigers'        => array('name'     => 'Tigers',
                                                    'location' => 'Detroit',
                                                    'stadium'  => 'Comerica Park',
                                                    'mapid'    => '0F4C8F1E-174C-4B8A-877E-F75398E025EA',
                                                    'division' => 'American League Central',
                                                    'subtext'  => '
																																	<h3>Detroit Tigers</h3>
																																	<p>New General Manager Al Avila is in familiar position for a GM, retool the Tigers while contending for the postseason. The deals made last year and the offseason landed some hot prospects which should move Detroit closer to the top of the AL Central. Pitchers Daniel Norris and Michael Fuller will slot right into the rotation along with Justin Verlander, southpaw Matthew Boyd and free agent signee Jordan Zimmerman. Miguel Cabrera is ready to resume his triple crown offense after an injury plagued 2015.</p>
																																	<h3>Comerica Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Detroit Tigers at Comerica Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Houston Astros'        => array('name'     => 'Astros',
                                                    'location' => 'Houston',
                                                    'stadium'  => 'Minute Maid Park',
                                                    'mapid'    => '2C0991B6-F87C-4EFE-938D-4C5CCF37E31F',
                                                    'division' => 'American League West',
                                                    'subtext'  => '
																																	<h3>Houston Astros</h3>
																																	<p>The Houston Astros secured their first winning season since 2008 and their first playoff appearance since 2005. Now the Astros want to make a play for the AL West Division Title. AL Rookie of the Year Carlos Correa broke out in 2015 and hopes to improve on his 22 home runs. Letting Chris Carter and his 24 home runs go leaves a whole at first base. Third baseman Luis Valbuena and right fielder George Spinger are coming off powerful numbers that will continue this year. The biggest addition is 25-year-old closer Ken Giles. He brings his 100 mph fastball to Astros with a trade with the Philadelphia Phillies. Starting pitching is the overall strength of the Astros. Cy Young winner Dallas Keuchel will need to repeat his dominance on the mound. 22-year-old Lance McCullers will continue to improve and Collin McHugh is solid in the middle of the rotation. </p>
																																	<h3>Minute Maid Park in Arlington and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Houston Astros at Minute Maid Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Kansas City Royals'    => array('name'     => 'Royals',
                                                    'location' => 'Kansas City',
                                                    'stadium'  => 'Kauffman Stadium',
                                                    'mapid'    => '029FE6C2-5CE9-4F3D-A358-82AAD932ECC8',
                                                    'division' => 'American League Central',
                                                    'subtext'  => '
																																	<h3>Kansas City Royals</h3>
																																	<p>The Kansas City Royals will try and accomplish something that has not been done since the 2000 New York Yankees, repeat as World Series Champions. The Royals have won the past two AL Titles the team is hoping to win it again this year. The Royals retain their core players, including Eric Hosmer, Alcides Escobar and Alex Gordon. Second base will be up for grabs losing Ben Zobrist in free agency to the Chicago Cubs. Manager Ned Yost signed an extension and is set to manage the team through 2018. Yost and the Royals players are having fun out there and seem to be motivated to get to the Series for a third straight year.</p>
																																	<h3>Kauffman Stadium and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Kansas City Royals at Kauffman Stadium at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>																										',
                                                    'newslink' => ''),
                   'Los Angeles Angels'    => array('name'     => 'Angels',
                                                    'location' => 'Los Angeles',
                                                    'stadium'  => 'Angel Stadium',
                                                    'mapid'    => '89B9EA7A-985F-4B6F-9252-07EB5CF45E83',
                                                    'division' => 'American League West',
                                                    'subtext'  => '
																																	<h3>Los Angeles Angels</h3>
																																	<p>With all world talent Mike Trout and a sound pitching staff The Los Angeles Angels will contend. The pitching rotation is young and can throw hard. Ace Garret Richards leads that group. Joining him are Matt Shoemaker, Andrew Heaney and Tyler Skaggs. The bullpen is led by closer Houston Street converting 40 of 45 saves. The trade for Yunel Escobar is a win now move giving up young arms. Andrelton Simmons at short shores up the middle defensively and should lift the play of Johnny Giavotella at second. Albert Pujols is back to form hitting 40 homes runs and will preserve his playing time by spotting him at DH at times. Mike Trout continues to be a future hall of famer with his .991 OPS and 41 homes runs while making dazzling plays in the outfield. Kole Calhoun hit 26 home runs and earned a Gold Glove. Trout and Calhoun make up a powerful 2/3s of the outfield with the third spot up for grabs. Carlos Perez is the anchor at catcher who became one of the best at throwing out basestealers in the AL.</p>
																																	<h3>Angel Stadium of Anaheim and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Los Angeles Angels at Angel Stadium of Anaheim at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Los Angeles Dodgers'   => array('name'     => 'Dodgers',
                                                    'location' => 'Los Angeles',
                                                    'stadium'  => 'Dodger Stadium',
                                                    'mapid'    => '39EF1661-8CF3-4CC9-A8FB-EC73CDA0601F',
                                                    'division' => 'National League West',
                                                    'subtext'  => '
																																	<h3>Los Angeles Dodgers</h3>
																																	<p>After falling short of expectations once again, the Dodgers enter the 2016 season with rookie manager Dave Roberts, after Don Mattingly and top brass agreed to mutually part ways. The Dodgers have lead the NL West for three straight seasons and are the favorites once again to win their division. It will be a challenge this year with aggressive offseason moves by the <a href="https://www.gamehedge.com/performer/15560/san-francisco-giants-tickets" >San Francisco Giants</a> along with the rival <a href="https://www.gamehedge.com/performer/15556/arizona-diamondbacks-tickets">Arizona Diamondbacks</a> signing ace Zack Greinke away from the team. The Dodgers will try to fill that spot with free agent Scott Kazmir. The rest of the rotation will be filled with Kenta Maeda, Brett Anderson and Alex Wood. The trade for Aroldis Chapman did not pan out as Chapman ended up with the Yankees. That means Kenley Janson returns as closer with Chris Hatcher in the setup role. Howie Kendrick will be the everyday second baseman and Corey Seager will be brought up from the minors to take over at shortstop. Justin Turner and Adrian Gonzalez are the pillars at first and third. The outfield is overloaded with good talent with Joc Peterson and Trayce Thompson platooning throughout the season. The wild card is the wildly inconsistent Yasiel Puig. Can Puig return to his potential last seen in his 2014 All Star season? With the Dodgers getting younger while cutting some payroll, can the fans attending Dodger Stadium see their Dodgers streak “Dodger Blue” to the top?</p>
																																	<h3>Dodger Stadium and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Los Angeles Dodgers at Dodgers Stadium at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Miami Marlins'         => array('name'     => 'Marlins',
                                                    'location' => 'Miami',
                                                    'stadium'  => 'Marlins Park',
                                                    'mapid'    => '38838035-A074-43D1-988E-9FE252E3E472',
                                                    'division' => 'National League East',
                                                    'subtext'  => '
																																	<h3>Miami Marlins</h3>
																																	<p>No team in baseball has a one two pitcher batter combination to wow the imagination than the Marlins Jose Fernandez and Giancarlo Stanton.  Unfortunately for Miami fans the 2 have only played a combined 28 games together over the last 2 seasons.  With new manager Don Mattingly, new hitting coach Barry Bonds, and 2 healthy budding superstars there is a renewed buzz around the clubhouse.  The starting rotation boast power arms with the likes of Edwin Jackson, David Phelps, and Wei-Yin Chen, all quality starters that will allow the Marlins to be competitive in the National League East.  The lineup also features solid major leaguers with the likes of Martin Prado, Dee Gordon, Adeiny Hechavarria, and Christian Yelich.  MLB pundits regard Miami as one of the sleeper teams in the NL, yet many voice concerns about their lack of depth.  As one major league manager put it, the Marlins have very little room for error.  Marlin fans will be keeping their fingers crossed in hopes that the team turns the corner and makes some noise in a competitive NL East.</p>
																																	<h3>Marlins Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Miami Marlins at Marlins Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund 50% of the price of the ticket, no gimmicks no hassle.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Milwaukee Brewers'     => array('name'     => 'Brewers',
                                                    'location' => 'Milwaukee',
                                                    'stadium'  => 'Miller Park',
                                                    'mapid'    => '26675C05-BDA3-46A3-9E63-A7CABC73CF71',
                                                    'division' => 'National League Central',
                                                    'subtext'  => '
																																	<h3>Milwaukee Brewers</h3>
																																	<p>The Brewers are hoping for “One Step Back-Two Steps Forward” approach to what many are referring to as an inspired rebuild. Matt Garza leads a staff of unproven arms with a healthy Wily Peralta looking to rebound to become the ace of the staff. The closer position is a two-man race between Will Smith and Jeremy Jeffress. Free agent Chris Carter will bring his slugging prowess to the hitter friendly Miller Park. Ryan Braun is coming off his best season in a while with 25 homers, 84 RBI’s and an All Star appearance. More importantly experts have the Brewers farm system as a top 5 outfit.  Fans must be patient, with the <a href="https://www.gamehedge.com/performer/15550/chicago-cubs-tickets">Cubs</a>, <a href="https://www.gamehedge.com/performer/15555/st-louis-cardinals-tickets">Cardinals</a>, and <a href="https://www.gamehedge.com/performer/15554/pittsburgh-pirates-tickets">Pirates</a> in their division the Brewers are on the right path for the long game.</p>
																																	<h3>Miller Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Milwaukee Brewers at Miller Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Minnesota Twins'       => array('name'     => 'Twins',
                                                    'location' => 'Minnesota',
                                                    'stadium'  => 'Target Field',
                                                    'mapid'    => 'FBA039FE-9B1F-49B5-9231-5C9F6F344515',
                                                    'division' => 'American League Central',
                                                    'subtext'  => '
																																	<h3>Minnesota Twins</h3>
																																	<p>The Twins were a big surprise in the 2015 season, winning 83 games and finishing second in the AL Central. Coming off four straight 90 loss seasons, the team sees the win total trending up. The Twins top pitching prospects are ready to make an impact this year. Miquel Sano and Eddie Rosario are ready to contribute daily and catcher Kurt Suzuki is poised to return to All-Star Status. Center Fielder Bryon Buxton will try to match his hype as a top prospect in 2016, maintaining his rookie status. Pitcher Ervin Santana is expected to build upon his 2015 finish after being suspended in the first half of last year.</p>
																																	<h3>Target Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Minnesota Twins at Target Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'New York Mets'         => array('name'     => 'Mets',
                                                    'location' => 'New York',
                                                    'stadium'  => 'Citi Field',
                                                    'mapid'    => 'FC82879C-CA96-47E5-9887-78C588A09854',
                                                    'division' => 'National League East',
                                                    'subtext'  => '
																																	<h3>New York Mets</h3>
																																	<p>Not since 2006 have the New York Mets entered a season with greater expectations than this year’s 2016 MLB season.  Coming off a disappointing loss to the <a href="https://www.gamehedge.com/performer/15539/kansas-city-royals-tickets">Kansas City Royals</a> in the 2015 World Series, the Amazin’s are locked and reloaded to make another run at the title.  The Mets boast arguably the best starting rotation in all of baseball with the likes of Matt Harvey, Jacob de Grom, Noah Syndergaard, Steven Matz, and Zack Wheeler who is coming back from Tommy John surgery.  Returning from last year is right handed slugger and centerfielder Yoenis Cespedes who single handedly jumped started the Mets offense and catapulted the Mets into the playoffs.  With a healthy David Wright, budding star Michael Conforto, and newly acquired second baseman Neil Walker, Citifield is sure to be one of the more electrifying stadiums in all of baseball.  With New York Met fans thirsty for another World Series title, this season may be nothing short of Amazin!</p>
																																	<h3>Citi Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the New York Mets at Citifield at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund 50% of the price of the ticket, no gimmicks no hassle.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'New York Yankees'      => array('name'     => 'Yankees',
                                                    'location' => 'New York',
                                                    'stadium'  => 'Yankee Stadium',
                                                    'mapid'    => 'B561B786-C193-4A3B-81A2-0E7D846D8827',
                                                    'division' => 'American League East',
                                                    'subtext'  => '
																																	<h3>New York Yankees</h3>
																																	<p>The Yankees and their fans are accustomed to finishing first in the AL East but have not done so 2012. Believed to have the most potent relief staff with the addition of the controversial Aroldis Chapman as a result of a trade in the Cincinnati Reds, will that be enough for them to rise to the top.  The healthiness of Mark Teixeira and Alex Rodriquez will affect NY’s run production in the long season. Their poor defense can result in too many extended at-bats for their opponents.  With the New York Mets coming on strong last season can the Yankees keep their fan base happy and battle Boston and Toronto to a first place finish?</p>
																																	<h3>Yankee Stadium and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the New York Yankees at Yankee Stadium at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Oakland Athletics'     => array('name'     => 'Athletics',
                                                    'location' => 'Oakland',
                                                    'stadium'  => 'O.co Coliseum',
                                                    'mapid'    => '0CFD60B7-6059-456A-A0E8-EFAACA9FAC70',
                                                    'division' => 'American League West',
                                                    'subtext'  => '
																																	<h3>Oakland Athletics</h3>
																																	<p>Continuing to make the roster younger is Billy Beane’s agenda. After finishing with AL worst record last year the team can only go up. Marcus Semien will start at shortstop and is expected to improve defensively. Jed Lowrie, in his second stint with the A’s will play second. Both Danny Valencia and Yonder Alonso are new to the A’s and will anchor third and first respectively. Billy Burns will remain at leadoff. He stole 26 bases and homered five times and ran out 38 infield hits. Khris David will open at left and Josh Reddick at right. All-Star Stephen Vogt plans to dominate at catcher. Sonny Gray is the ace in the rotation, while the other four spots will be made up of promising young pitchers. The bullpen is stocked with experience, as Beane brought in Ryan Madison, Liam Hendricks and Marc Rzepczynski.</p>
																																	<h3>O.co Coliseum and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Oakland Athletics at O.co Coliseum at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Philadelphia Phillies' => array('name'     => 'Phillies',
                                                    'location' => 'Philadelphia',
                                                    'stadium'  => 'Citizens Bank Park',
                                                    'mapid'    => '530A8213-DD6F-4C95-AE1C-9A82280B5B05',
                                                    'division' => 'National League East',
                                                    'subtext'  => '
																																	<h3>Philadelphia Phillies</h3>
																																	<p>In the not so distant past the Philadelphia Phillies were one of the perennial powerhouses in all of baseball. Fast forward to 2016 and the former World Series Champs are in full rebuild mode.  On the bright side they avoided a 100 loss season. At the tender age of 23 Maikel Franco looks like a keeper both at 3rd base and in the cleanup spot.  Pitcher Aaron Nola is solid and Jerad Eickhoff (part of the Cole Hamels deal) appears to be a keeper with a 3-3 record 2.65 era and 49 K’s in 51 innings last year.  With so many holes to fill defensively (the worst in baseball) and offensively (the worst in the NL) the team does claim the #1 pick. Also, the team plans on bringing top prospect and hard hitting shortstop J.P. Crawford into the fold at some point in the season.  Manager Larry Bowa has had nothing but praise for the presumptive face of the infield both on and off the field.  With Phillies fans eager to reclaim the top of the division, patience will definitely be a virtue that could pay off in the not so distant future.</p>
																																	<h3>Citizens Bank Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Philadelphia Phillies at Citizens Bank Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund 50% of the price of the ticket, no gimmicks no hassle.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Pittsburgh Pirates'    => array('name'     => 'Pirates',
                                                    'location' => 'Pittsburgh',
                                                    'stadium'  => 'PNC Park',
                                                    'mapid'    => '91658D8C-FB3A-43F9-B5A5-4B8395209D81',
                                                    'division' => 'National League Central',
                                                    'subtext'  => '
																																	<h3>Pittsburgh Pirates</h3>
																																	<p>A perennial playoff team for the past 3 years, only one other team (the rival <a href="https://www.gamehedge.com/performer/15555/st-louis-cardinals-tickets">St. Louis Cardinals</a>) has won more games over the same timespan. The Pirates boast one of the best outfields in all the game, featuring All Star centerfielder Andrew McCutchen, Gold Glover and budding star Starling Marte, and a young and talented Gregory Polanco.  Gerrit Cole will lead the front end of the rotation with Francisco Liriano in tow. After Liriano the rest of the rotation has more questions than answers with pitcher’s Jon Niese, Ryan Vogelsong and Jeff Locke rounding out the staff.  However, the slightest hint of trouble could usher in top MLB pitching prospect RHP Tyler Glasnow by mid season.  After that the Pirates add in the NL’s best bullpen. Clint Hurdle and the rest of the staff looked poised to make yet another run at the postseason. PNC Park will be filled with fans cheering their Bucs for another “Buctober” and beyond.</p>
																																	<h3>PNC Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Pittsburgh Pirates at PNC Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'San Diego Padres'      => array('name'     => 'Padres',
                                                    'location' => 'San Diego',
                                                    'stadium'  => 'Petco Park',
                                                    'mapid'    => 'DE48770A-CAEA-4519-AEC7-89074643501B',
                                                    'division' => 'National League West',
                                                    'subtext'  => '
																																	<h3>San Diego Padres</h3
																																	<p>The San Diego Padres stayed quiet this offseason stating a commitment to build through their farm system. It all starts with hiring 38 year-old Andy Green, who previously was the <a href="https://www.gamehedge.com/performer/15556/arizona-diamondbacks-tickets">Arizona Diamondbacks </a> third base coach, as their new manager. The starting rotation will consist of workhorses James Shields and Tyson Ross, along with an inconsistent Andrew Cashner and a group of lessor known youngsters. The closer and setup positions will see new faces this year after the team traded Craig Kimbrel to Boston and Jaoquin Benoit to Seattle. The shortstop has a new face as well, with the signing Alexei Ramirez from the <a href="https://www.gamehedge.com/performer/15536/chicago-white-sox-tickets">Chicago White Sox</a>. Yangervis Solarte will return to 3rd base while Matt Kemp roams right field and Jon Jay takes over left field with the departure of Justin Upton. With the San Diego Padres projected to finish in last place in the National League West and the team in full rebuild mode, fans can only look up from here.</p>
																																	<h3>Petco Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the San Diego Padres at Petco Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'San Francisco Giants'  => array('name'     => 'Giants',
                                                    'location' => 'San Francisco',
                                                    'stadium'  => 'AT&T Park',
                                                    'mapid'    => 'DD17F96D-2FA4-42B3-B032-47548ECC2925',
                                                    'division' => 'National League West',
                                                    'subtext'  => '
																																	<h3>San Francisco Giants</h3>
																																	<p>2016 is an even year, which means the San Francisco Giants will win the world series, right? Hard to imagine but the virtual face of the franchise since 2007 is most likely not returning to the Bay Area. In lieu of the circumstances, the Giants know pitching is key to battle the <a href="https://www.gamehedge.com/performer/15558/los-angeles-dodgers-tickets">Los Angeles Dodgers</a> and <a href="https://www.gamehedge.com/performer/15556/arizona-diamondbacks-tickets">Arizona Diamondbacks</a> so the team opened up their wallets this offseason and brought in Jeff Samardzija and Johnny Cueto. Santiago Casilla will command the closer position with the tandem of Sergio Romo and Javier Lopez setting up. All-Stars Brandon Crawford and Joe Panik will defend the middle. Matt Duffy will build upon his impressive rookie season having batted .295 with 77 RBI’s. Buster Posey will again manage the pitching from behind the plate. Many predict the NL West will come down to the wire, with Bruce Bochy steering the ship, the Giants might have the edge for a team that’s been there done that.  Giant fans can surely expect a wild ride to the top of the NL West and with AT&T Park looking to rock out into the postseason.</p>
																																	<h3>AT&T Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the San Francisco Giants at AT&T Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Seattle Mariners'      => array('name'     => 'Mariners',
                                                    'location' => 'Seattle',
                                                    'stadium'  => 'Safeco Field',
                                                    'mapid'    => 'E56E7717-A6DB-4CCF-B324-901652A2C903',
                                                    'division' => 'American League West',
                                                    'subtext'  => '
																																	<h3>Seattle Mariners</h3>
																																	<p>The Seattle Mariners went through a winter cleaning, with changed to half the roster. Robinson Cano is the leader of the infield, Cano ended the year with great numbers after getting off to a slow star, mostly due to injuries. Ketel Marte will be the regular shortstop after taking full control of the job last year. Newly acquired Adam Lind will manage first base and killing right-handed pitching. For that reason, a platoon situation will be needed to take on the lefties, which could be Jesus Montero. Kyle Seager continues his great defense and offensive production at third.  All-Star outfielder Nelson Cruz also stays a Mariner after the roster shuffle. Filling out the outfield are Leonys Martin and Nori Aoki. Felix Hernandez will lead the starting rotation going 18-9 last year. The rest of the rotation will need to stay healthy to be consistent. The bullpen is restructured as well, acquiring Joaquin Benoit from the Padres and signing Steve Cishek, Evan Scribner and Justin De Fratus. Cishek will take over the closer role.</p>
																																	<h3>Safeco Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Seattle Mariners at Safeco Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'St. Louis Cardinals'   => array('name'     => 'Cardinals',
                                                    'location' => 'St. Louis',
                                                    'stadium'  => 'Busch Stadium',
                                                    'mapid'    => '60F0ABE6-811B-4A5F-A0D7-49B77737EAE6',
                                                    'division' => 'National League Central',
                                                    'subtext'  => '
																																	<h3>St. Louis Cardinals</h3>
																																	<p>The Cardinals face their toughest challenge in 2016 despite coming off a 100 win season in 2015.  First and foremost the must fend off the <a href="https://www.gamehedge.com/performer/15550/chicago-cubs-tickets">Cubs</a> and <a href="https://www.gamehedge.com/performer/15554/pittsburgh-pirates-tickets">Pirates</a> for the top of the NL Central.  Secondly, turning over an aging lineup to compete in the future. With Adam Wainwright anchoring the staff the Cardinals look to Michael Wacha and Carlos Martinez to usher in a new crop of aces to the rotation. Trevor Rosenthal emerged as a shutdown closer with 48 saves. Third baseman Matt Carpenter powers the offense while Matt Holiday will debut at 1st base for the first time in his career. Outfielders Stephen Piscotty, Randal Grichuk, and Tommy Pham bring a mix of experience and youth. Perennial All Star catcher Yadier Molina will call the game behind the plate after dealing with offseason surgery on his thumb.  Despite questions for lack of consistent power in the lineup skipper Mike Matheny believes the team will surprise many with their ability to go long.  Busch Stadium and the fans are used to being on top while playing well into the postseason. They expect the Cards winning ways to continue once again.</p>
																																	<h3>Busch Stadium and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the St Louis Cardinals at Busch Stadium at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Tampa Bay Rays'        => array('name'     => 'Rays',
                                                    'location' => 'Tampa Bay',
                                                    'stadium'  => 'Tropicana Field',
                                                    'mapid'    => '5B1981D8-4F98-4FE6-9263-489A84E1EBA7',
                                                    'division' => 'American League East',
                                                    'subtext'  => '
																																	<h3>Tampa Bay Rays</h3>
																																	<p>Will the Rays be a sleeper this year or lay near the bottom in the AL East? Evan Longoria and Logan Forsythe must be productive and creative platooning at key positions can hopefully keep the Rays in the hunt. Since the Rays are not spenders when it comes to free agency, they will need to rely on hungry young talent to compete, a recipe Tampa Bay Rays had used in the past for success.  Do they have enough to climb above Baltimore and Boston?</p>
																																	<h3>Tropicana Field and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Tampa Bay Rays at Tropicana Field at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Texas Rangers'         => array('name'     => 'Rangers',
                                                    'location' => 'Texas',
                                                    'stadium'  => 'Globe Life Park in Arlington',
                                                    'mapid'    => 'DF755A04-674D-4AEC-95BF-738DD64CBA77',
                                                    'division' => 'American League West',
                                                    'subtext'  => '
																																	<h3>Texas Rangers</h3>
																																	<p>The Rangers got back to their winning ways in 2015, finishing first in the AL West. Cole Hamels will continue to be the ace of the staff and Yu Darvish should return to the rotation in May of June. A stable of capable starters will fill out the rest of the rotation. The lineup is hinged on Josh Hamilton, can Hamilton return to All Star form and stay healthy for the long season. If not The Rangers brought in LF Justin Ruggiano to sub in. Third baseman Joey Gallo who spent time in left last year should be able to stay at third for the season. Rookies Nomar Mazara and Lewis Brinson are ready to make a play in the big leagues. First baseman Mitch Moreland expects to break his totals of 23 home runs and 85 RBIs, both career highs last year.</p>
																																	<h3>Globe Life Park in Arlington and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Texas Rangers at Globe Life Park in Arlington at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Toronto Blue Jays'     => array('name'     => 'Blue Jays',
                                                    'location' => 'Toronto',
                                                    'stadium'  => 'Rogers Centre',
                                                    'mapid'    => '5C3516FA-253F-4879-A290-9D66E9B5686D',
                                                    'division' => 'American League East',
                                                    'subtext'  => '
																																	<h3>Toronto Blue Jays</h3>
																																	<p></p>
																																	<p>After finishing in 1st place in the AL East in 2015, the Blue Jays are planning to return to the top using baseball’s best run offense. But can they do that without David Price who is now pitching for the Boston Red Sox? How will the Blue Jays offense, led by Jose Bautista and Josh Donaldson do against the revamped New York Yankees relievers? The addition of a new dirt infield at Rogers Centre can play the hero or goat for the Blue Jays on base average and ultimately their win total.</p>
																																	<h3>Rogers Centre and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Toronto Blue Jays at Rogers Centre at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund half the cost of your ticket.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''),
                   'Washington Nationals'  => array('name'     => 'Nationals',
                                                    'location' => 'Washington',
                                                    'stadium'  => 'Nationals Park',
                                                    'mapid'    => '243812C9-BF2D-4FC2-A5F7-FA43CA8B65C4',
                                                    'division' => 'National League East',
                                                    'subtext'  => '
																																	<h3>Washington Nationals</h3>
																																	<p>My my my what a difference a year makes.  Exactly one year ago today the Nationals were a sure fire team to win the NL East and challenge the top teams in all the National League.  Fortunately or unfortunately, depending on your perspective, the <a href="https://www.gamehedge.com/performer/15547/new-york-mets-tickets">New York Mets</a> have stolen all the spotlight.  Perhaps new manager Dusty Baker thinks it’s a good thing, now the Nationals can play baseball with less expectations and pressure than previous years past. Returning this season is reigning MVP Bryce Harper with a lineup bolstered by newly acquired 2nd baseman and <a href="https://www.gamehedge.com/performer/15547/new-york-mets-tickets">NLDS MVP</a> Daniel Murphy while Ryan Zimmerman fills in at the clean up spot.  Aces Max Scherzer and Stephen Strasburg create a formidable one two punch at the top of the rotation.  That said, the Washington Nationals might surprise or not surprise many, as contenders come October.</p>
																																	<h3>Nationals Park and Gamehedge</h3>
																																	<p>At Gamehedge you can find and buy the best game tickets to see the Washington Nationals at Nationals Park at the best prices.  With an interactive seating chart and seat map you can pick exactly where you want to sit.  Not only are Gamehedge tickets cheap but all purchases come with the Good Game Guarantee at no additional cost to you.  So, if the home team loses by 5 runs or more we will refund 50% of the price of the ticket, no gimmicks no hassle.  No matter what, Gamehedge has your back.  No other ticket site guarantees that you enjoy yourself quite like this!!!</p>
																										',
                                                    'newslink' => ''));
		return isset($teams[$team]) ? $teams[$team] : $teams;
	}

	public static function get_server() {
		if(MODE == 'dev')
			return 'gamehedge.jxw3.com';
		else
			return 'www.gamehedge.com';
	}
	public static function te_brokerageid() {
		if(MODE == 'dev') {
			return 1946;
		} else {
			return 1946;
		}
	}
	public static function te_officeid() {
		if(MODE == 'dev') {
			return 1981;
		} else {
			return 3100;
		}
	}
	public static function te_categoryid() {
		if(MODE == 'dev') {
			return 8; // Basketball
		} else {
			return 3; // Baseball
		}
	}
	public static function te_url() {
		if(MODE == 'dev') {
			return 'https://api.sandbox.ticketevolution.com';
		} else {
			return 'https://api.ticketevolution.com';
		}
	}
	public static function te_version() {
		return 'v9';
	}
	public static function te_api_token() {
		if(MODE == 'dev') {
			return '406b18f4601486c895089196e17c7a46';
		} else {
			return '5bfd4b6110681d224a8c1fa6333f375f';
		}
	}
	public static function te_api_secret() {
		if(MODE == 'dev') {
			return 'JTLH1feGznivv7rt3qk5/0wJwRksig5b9YMxLmjn';
		} else {
			return 'g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi';
		}
	}
	public static function get_signature() {
		return 'GHxTD!800)gameHedge%^12*21!15#';
	}
	public static function get_crypt_key() {
		return 'GHxTDX*^$#^!gameHedge!@@%!(*)';
	}
}
