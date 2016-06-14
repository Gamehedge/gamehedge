<?php
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);
switch($verb) {
case '';
	if(!isset($id) || !is_numeric($id)) {
		header('Location: /search');
		exit;
	}
	$event_data = $teClient->showEvent(['event_id' => (int)$id]);
	$date       = new DateTime($event_data['occurs_at'], new DateTimeZone($event_data['venue']['time_zone']));
	$config     = array('seating_chart'       => str_replace('sandbox.', '', $event_data['configuration']['seating_chart']['medium']),
                      'seating_chart_large' => str_replace('sandbox.', '', $event_data['configuration']['seating_chart']['large']),
                      'name'                => $event_data['configuration']['name']);
	foreach($event_data['performances'] AS $p) {
		if($p['primary']) {
			$performer_id   = $p['performer']['id'];
			$performer_slug = $p['performer']['slug'];
			$performer_name = $p['performer']['name'];
		}
	}
	$data        = array();
	$sc_data     = array();
	$num_tickets = 0;
	$tgroups     = $teClient->listTicketGroups(['event_id' => (int)$id, 'order_by' => 'retail_price ASC']);
	$lprice      = 0.00;
	$hprice      = 0.00;
	foreach($tgroups['ticket_groups'] AS $tgData) {
		if($tgData['type'] != 'event')
			continue;
		if($tgData['ticket_states']['available'] == 0)
			continue;
		if($lprice == 0.00) {
			$lprice = $tgData['retail_price'];
		} else {
			if($tgData['retail_price'] < $lprice)
				$lprice = $tgData['retail_price'];
		}
		if($hprice == 0.00) {
			$hprice = $tgData['retail_price'];
		} else {
			if($tgData['retail_price'] > $hprice)
				$hprice = $tgData['retail_price'];
		}
		$data[] = array('tgroup_id'   => $tgData['id'],
                    'row'         => $tgData['row'],
                    'section'     => $tgData['section'],
                    'seat'        => (min($tgData['splits']) != max($tgData['splits']) ? min($tgData['splits']) . ' - ' . max($tgData['splits']) : min($tgData['splits'])),
                    'eticket'     => ($tgData['eticket'] == 1 ? true : false),
                    'notes'       => $tgData['public_notes'],
                    'price'       => $tgData['retail_price'],
                    'total_price' => $tgData['retail_price'],
                    'ticket_id'   => 'range');
		$team_data = Config::get_team_data($performer_name);
        if(isset($team_data['mapid'])){
            $mapElement = 'MapId: "' . $team_data['mapid'] . '",';
        }
        else{
            $mapElement = 'EventInfo: {
                            Venue: "' . $event_data['venue']['name'] . '",
                            EventName: "' . $event_data['name'] . '",
                            EventDate: "' . $date->format('Y-m-d\TH:i') . '"
                        },';
        }
        
		$sc_data[] = array('id'        => $tgData['id'],
                       'section'   => $tgData['section'],
                       'row'       => $tgData['row'],
                       'price'     => '$' . number_format($tgData['retail_price'], 2),
                       'quantity'  => $tgData['splits'],
                       'eticket'   => $tgData['eticket'],
                       'notes'     => $tgData['public_notes'],
                       'ticket_id' => 'range',
                       'in_hand'   => $tgData['in_hand'],
                       'in_hand_on' => $tgData['in_hand_on']);
		$num_tickets += $tgData['ticket_states']['available'];
	}
	$sc_data = array('MinPrice' => '$' . number_format($lprice, 2), 'MaxPrice' => '$' . number_format($hprice, 2), 'TicketCounts' => $num_tickets, 'Tickets' => $sc_data);
	$hscripts = '
		<script type="text/javascript">
			var api_key     = \'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuZ2FtZWhlZGdlLmNvbSIsImlhdCI6MTQ1OTU0ODQ5MSwiZXhwIjoxNDkxMDg0NDkxLCJkYXRhIjp7Imhvc3RuYW1lIjoid3d3LmdhbWVoZWRnZS5jb20ifX0.sr5aSFIe9cgbipqIZ2t3yX_jBL1XvYygffneLLRLCOg\';
			var event_id    = ' . $id . ';
			var tickets     = ' . json_encode($data) . ';
			var sc_tickets  = ' . json_encode($sc_data) . ';
			var num_tickets = ' . $num_tickets . ';
		</script>
	';
	$fscripts = '
        <style>
            .tuMapPreferredFilter {
                display:none;
            }
        </style>
		<script src="/assets/js/app/app.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script>
		<!--*******************************************************
		**********************Required Includes********************
		********************************************************-->
		<link href="/assets/seatingchart/css/tuMap.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="/assets/seatingchart/Lib/jquery-1.10.2.min.js"></script>
		<!--[if lt IE 9]><script type="text/javascript" src="/assets/seatingchart/Lib/excanvas-min.js"></script><![endif]-->
		<script type="text/javascript" src="/assets/seatingchart/Lib/jquery.tuMap-min.js"></script>
		<script type="text/javascript" src="/assets/seatingchart/Lib/jquery.hammer.min.js"></script>
		<!--*******************************************************
		**********************Optional Includes********************
		********************************************************-->
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
		<!-- jQuery UI Style Sheet, Used for Price Slider -->
		<script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
		<!-- jQuery UI Library, Used for Price Slider -->
		<script type="text/javascript">
			$(document).ready(function() {
				/*****************************************************
				check date to hide physical Ticket
				********************************************************/
				var d = new Date();

				var month = d.getMonth()+1;
				var day = d.getDate();

				var output = d.getFullYear() + "/" +
				    (month<10 ? "0" : "") + month + "/" +
				    (day<10 ? "0" : "") + day;
				if("' . $date->format('Y/m/d') . '" == output){
					$("#ETicket").prop( "checked", true );
					$("#eticketsCont").hide();
				}
				
				$(document).tooltip();
                
                if($( window ).width() < 768){
                    $("#data_footer").css("display", "none");
                    $("#hr_footer").css("display", "none");
                }
                
				/************************************************************
				MapContainer Height to view complete chart
				************************************************************/
				//Generate Price Filter
				var PriceSlab = 100, Buttons = 4;
				if(sc_tickets.MaxPrice < (PriceSlab * Buttons)) {
					PriceSlab -= parseInt((sc_tickets.MaxPrice / Buttons));
					PriceSlab += 100 - (PriceSlab % 100);
				}
				var PriceStart = 0, PriceEnd = 0;
				for(var Limit = 1; Limit < Buttons; Limit++) {
					PriceEnd += PriceSlab;
					PriceStart = PriceEnd - PriceSlab + 1;
					$("#PriceRange").append($("<input type=\"checkbox\" id=\"PriceFilter_" + Limit + "\" data-min=\"" + PriceStart + "\" data-max=\"" + PriceEnd + "\">"));
					$("#PriceRange").append($("<label class=\"Custom\" for=\"PriceFilter_" + Limit + "\">$" + PriceStart + " - $" + PriceEnd + "</label>"));
				}
				$("#PriceRange").append($("<input type=\"checkbox\" id=\"PriceFilter_" + Buttons + "\" data-min=\"" + (PriceEnd + 1) + "\" data-max=\"" + sc_tickets.MaxPrice + "\">"));
				$("#PriceRange").append($("<label class=\"Custom\" for=\"PriceFilter_" + Buttons + "\">$" + PriceEnd + "+</label>"));
				$("#PriceRange").buttonset();
				$("#PriceRange > input:checkbox").change(function() {
					FilterTickets();
				});
				/************************************************************
				Initialize Ticket Utils Interactive Map
				************************************************************/
				$("#MapContainer").tuMap({
					' . $mapElement . '
					ControlsPosition: "Inside",
					FailoverMapUrl: "https://static.ticketutils.com/Charts/No-Seating-Chart.jpg",
					ColorScheme: 1,
					ZoomLevel: 2,
					ServiceUrl: "https://imap.ticketutils.net",
					DisplayListHeader: false,
					Columns: {
                        flag: {
                          Title:"",
                          Visible:false
                        },
						"section": {
							CSSClass: "TicketRow firstRow",
							Formatter: function(RowData, Key, CellValue, FormattedSection) {
								var Code = "<div>";
								Code += "<div class=\"location\">";
								Code += "<div class=\"section\">Section <span class=\"bolded_text\">" + RowData.section + "</span></div>";
								Code += "<div class=\"lrow\">Row <span class=\"bolded_text\">" + RowData.row + "</span></div>";
								Code += "</div>";
                                
                                Code += "<div class=\"seats seats-mobile\">";
								
								Code += "<div class=\"type\">" + (RowData.eticket ? "Email Delivery" : "Physical Delivery") + "</div>";
								Code += "<span class=\"smallIcon" + (RowData.notes != "" ? " Note\" title=\"" + RowData.notes : "") + "\"></span>";
								Code += "<span class=\"smallIcon" + (RowData.eticket ? " eTicket\" title=\"Email Delivery" : "") + "\"></span>";
								Code += "<span class=\"smallIcon" + (RowData.preferred ? " Preferred\" title=\"Preferred Ticket" : "") + "\"></span>";
								Code += "</div>";
                                
								Code += "</div>";
								return Code;
							}
						},
                        "notes": {
							CSSClass: "TicketRow",
							Formatter: function(RowData, Key, CellValue, FormattedSection) {
								var Code = "<div>";
								
								if(RowData.notes != null){
                                    Code += "<div class=\"ticket-cell note\" title=\"" + RowData.notes + "\"><img src=\"/assets/img/icon__info_1x.png\"></div>";
                                }
								else {
                                    Code += "<div class=\"ticket-cell note\">&nbsp;</div>";
                                }	
								Code += "</div>";
								return Code;
							}
						},
						"quantity": {
							CSSClass: "TicketRow",
							Formatter: function(RowData, Key, CellValue, FormattedSection) {
								var Code = "<div>";
								Code += "<div class=\"seats\">Qty ";
								if($.isArray(RowData.quantity)) {
									var Qnty = RowData.quantity.slice(0).sort(sortD);
									Code += "<select id=\"Qty" + RowData.id + "\">";
									for(var x = 0; x < Qnty.length; x++) {
										Code += "<option>" + Qnty[x] + "</option>";
									}
									Code += "</select>";
								} else {
									Code += "<span>" + RowData.quantity + "</span>";
									Code += "<input type=\"hidden\" id=\"Qty" + RowData.id + "\" lang=\"Quantity\" value=\"" + RowData.quantity + "\"/>";
								}
								Code += "<div class=\"type hidden-xs hidden-sm\">" + (RowData.eticket ? "Email Delivery" : "Physical Delivery") + "</div>";
								Code += "<span class=\"smallIcon" + (RowData.notes != "" ? " Note\" title=\"" + RowData.notes : "") + "\"></span>";
								Code += "<span class=\"smallIcon" + (RowData.eticket ? " eTicket\" title=\"Email Delivery" : "") + "\"></span>";
								Code += "<span class=\"smallIcon" + (RowData.preferred ? " Preferred\" title=\"Preferred Ticket" : "") + "\"></span>";
								Code += "</div>";
								Code += "</div>";
								return Code;
							}
						},
                        "guarantee": {
							CSSClass: "TicketRow TicketRowDesktop",
							Formatter: function(RowData, Key, CellValue, FormattedSection) {
								var Code = "<div>";
								Code += "<div class=\"ticket-cell guarantee\">Good Game<br />Guarantee&trade;</div>";
								Code += "</div>";
								return Code;
							}
						},
                        "price": {
							CSSClass: "TicketRow",
							Formatter: function(RowData, Key, CellValue, FormattedSection) {
								var Code = "<div>";
                                Code += "<div class=\"ticket-cell seat-link\"><button style=\"text-transform: none;\" class =\"button green\" type=\"button\" onclick=\"BuyNow(\'" + RowData.id + "\',\'" + RowData.price + "\');\">" + RowData.price.split(".")[0] + "ea</button>";
                                Code += "<div class=\"ticket-cell guarantee guarantee-mobile\">Good Game Guarantee&trade;</div></div>";
								Code += "</div>";
								return Code;
							}
						}
					},
					PreferredText: "Preferred Tickets First",
					Tickets: sc_tickets.Tickets,
					AutoSwitchToStatic: true,
					PreferredFirst: true,
					TicketsListContainer: "#InventoryContainer",
					GroupsContainer: "#GroupsContainer",
					OnBeforeListRender: function() {
						var Height = $("#TuMap").outerHeight(true);
						$("#InventoryContainer").height(Height);
					},
					OnInit: function(e, MapType) {
						$("div.tuMapControl").each(function() {
							if($(this).html() == "Parking") {
								$(this).css("display", "none");
							}
						});
						//Set Values to Price Slider
						LoadComplete(true);
						//Create Zone Selection Ovelay
						$("#ZoneSelector").show().Overlay({
							Class: "ZoneOverlay",
							Content: function(Item, Callback) {
								var Zones = $("#GroupsContainer").clone(true).attr("id", "ZoneFilter").removeClass("GroupsContainer");
								Zones.find("div.tuMapGroup:not(.Disabled)").click(function() {
									if($(this).hasClass("tuMapGroupChecked")) {
										$(this).removeClass("tuMapGroupChecked");
									} else {
										$(this).addClass("tuMapGroupChecked");
									}
								});
								return Callback(Zones);
							},
							HPosition: "Left",
							VPosition: "Bottom",
							Behaviour: "Menu",
							OnActivated: function(Control) {
								Control.addClass("Active");
							},
							OnDeactivated: function(Control) {
								Control.removeClass("Active");
							}
						});
					},
					OnError: function(e, Error) {
						if(Error.Code == 0) {
							var Message = "<div style=\"padding:10px;\">";
							Message += "<span style=\"color:red;font-weight:bold;\">This Sample is Configured to run under host \'localhost\'</span>";
							Message += "<br />";
							Message += "Please configure IIS/Apache or Compatible Web Server to point \'demo\' folder in order to view the Sample. If you intend to Run it under different Domain, please contact TicketUtils Support for Activation";
							Message += "</div>";
							$("#MapContainer").html(Message);
						}
					},
					OnReset: function() {
						Reset();
					},
					TicketsSort: {
						Column: "price",
						Order: "ASC",
						SortType: "numeric"
					}
				});
				/************************************************************
				Filter Ticket List On Ticket Quantity Change (Optional)
				************************************************************/
				$("#TicketQuantity").change(function() {
					FilterTickets();
				});
				/************************************************************
				Filter Ticket List On eTicket Filter Change (Optional)
				************************************************************/
				$("#ETicket").click(function() {
					FilterTickets();
				});
				/************************************************************
				Use if Custom Parking Pass tab is Implemented. (Optional)
				Used for switching between Ticket list and Parking Passes
				************************************************************/
				$("#Parking").click(function() {
					SetSearchOptions();
					$("#MapContainer").tuMap("FilterTickets", "Parking", $("#Parking").is(":checked"));
				});
				/***********************************************************
				Sort Ticket List
				***********************************************************/
				$("#TicketSortBy").change(function() {
					var SortItem = $("#TicketSortBy > option:selected");
					$("#MapContainer").tuMap("SetOptions", {
						TicketsSort: {
							Column: $("#TicketSortBy").val(),
							Order: SortItem.data("sortorder"),
							SortType: SortItem.data("sorttype")
						}
					}).tuMap("Refresh");
				});
				
			});
			/************************************************************
			Sorting Quantity Array (Optional)
			************************************************************/
			function sortD(a, b) {
				return b - a;
			}
			/************************************************************
			Filter Ticket List On
			Ticket Quantity, Price Range or eTicket Filter Change (Optional)
			************************************************************/
			function FilterTickets() {
				SetSearchOptions();
				$("#MapContainer").tuMap("Refresh");
			}
			/************************************************************
			Set tuMap Options for Search
			************************************************************/
			function SetSearchOptions() {
				var MinPrice = sc_tickets.MaxPrice, MaxPrice = sc_tickets.MinPrice;
				$("#PriceRange input").each(function() {
					if($(this).is(":checked")) {
						var Min = parseInt($(this).data("min")), Max = parseInt($(this).data("max"));
						if(MinPrice == sc_tickets.MaxPrice || MinPrice > Min) {
							MinPrice = Min;
						}
						if(MaxPrice == sc_tickets.MinPrice || MaxPrice < Max) {
							MaxPrice = Max;
						}
					}
				});
				if(MinPrice != sc_tickets.MaxPrice && MaxPrice != sc_tickets.MinPrice) {
					$("#PriceRange input").each(function() {
						var Min = parseInt($(this).data("min")), Max = parseInt($(this).data("max"));
						if(Min >= MinPrice && Max <= MaxPrice) {
							$(this).attr("checked", true);
						}
					});
				} else {
					MinPrice = sc_tickets.MinPrice;
					MaxPrice = sc_tickets.MaxPrice;
				}
				$("#PriceRange").buttonset("refresh");
				if($("#ETicket").is(":checked")) {
					$("#MapContainer").tuMap("SetOptions", {
						TicketsFilter: {
							MinPrice: MinPrice,
							MaxPrice: MaxPrice,
							Quantity: $("#TicketQuantity").val(),
							eTicket: true
						}
					});
				} else {
					$("#MapContainer").tuMap("SetOptions", {
						TicketsFilter: {
							MinPrice: MinPrice,
							MaxPrice: MaxPrice,
							Quantity: $("#TicketQuantity").val()
						}
					});
				}
			}
			/************************************************************
			On Init/ On Error (Optional)
			************************************************************/
			function LoadComplete(ChartLoaded) {
				/*Remove the Parking Button on the Map*/
				if($("#MapContainer div.tuMapControl:contains(\'Parking\')").length > 0) {
					$("#MapContainer").tuMap("RemoveMapControl", "Parking");
				}
			}
			/************************************************************
			Custom Reset Implemented
			************************************************************/
			function Reset() {
				$("#PriceRange input, #Parking, #ETicket").removeAttr("checked");
				$("#PriceRange").buttonset("refresh");
				$("#TicketQuantity").val("");
				$("#TicketSortBy").val("price");
				var SortItem = $("#TicketSortBy > option:selected");
				$("#MapContainer").tuMap("SetOptions", {
					TicketsFilter: {
						MinPrice: sc_tickets.MinPrice,
						MaxPrice: sc_tickets.MaxPrice,
						Quantity: $("#TicketQuantity").val()
					},
					TicketsSort: {
						Column: $("#TicketSortBy").val(),
						Order: SortItem.data("sortorder"),
						SortType: SortItem.data("sorttype")
					}
				}).tuMap("Refresh");
			}
			function BuyNow(Id, Price) {
                var Qty = 1;
                if($( window ).width() > 768){
                    if($("#Qty" + Id)) {
                        Qty = parseInt($("#Qty" + Id).val());
                    }   
                }
                else {
                    if($("#QtyMob" + Id)) {
                        Qty = parseInt($("#QtyMob" + Id).val());
                    }
                }
				var data = {event_id: event_id, tgroup_id: Id, price: parseFloat(Price.substring(1).replace(/[^\d\.\-\ ]/g, "")), qty: Qty};
				$.post(\'/order/add\', data, function(data) {
					if(data.status == 1)
						window.location.href = \'/order\';
					else
						alert(\'There was an error adding your tickets to the cart. (\' + data.message + \')\');
				}, \'json\');
			}

		</script>';
	// Handle Header
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', 'ng-app="gamehedge"');
	$smarty->assign('css', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" />');
	$smarty->assign('hscripts', $hscripts);
	$header = $smarty->fetch('shared/header.tpl');
    $menu = $smarty->fetch('shared/menu2.tpl');
    $menu_mobile = $smarty->fetch('shared/header_no_menu.tpl');
	// Handle Footer
	$smarty->assign('fscripts', $fscripts);
	$footer = $smarty->fetch('shared/footer.tpl');
	// Handle Main
	$smarty->assign('header', $header);
    $smarty->assign('menu', $menu);
    $smarty->assign('menu_mobile', $menu_mobile);
	$smarty->assign('footer', $footer);
	$smarty->assign('event_name', $event_data['name']);
	//$smarty->assign('event_date', $event_data['occurs_at']);
	$smarty->assign('event_date', $date->format('D, M j, Y h:i A'));
	$smarty->assign('performer_id', $performer_id);
	$smarty->assign('performer_slug', $performer_slug);
	$smarty->assign('venue_name', $event_data['venue']['name']);
	$smarty->assign('venue_location', $event_data['venue']['location']);
	$smarty->assign('configuration', $config);
	$smarty->display('ticket.tpl');
	break;
}
?>