{$header}
{$menu}
<main id="checkout" ng-controller="CheckoutCtrl">
	<div class="container">
		<form name="frmCheckout" method="POST" ng-submit="process()" id="formCheckout">
        <div class="row">
                            <div class="col-md-12 text-right">
                                <p style="margin-top:10px;">Contact us:  <i style="color:#A8C94B; font-size:1.5em; vertical-align: middle;" class="fa fa-phone-square" aria-hidden="true"></i> <span style="font-size:1.5em; vertical-align: middle;"><a href="tel:908-312-3267">(908) 312-3267</a></span>
                                </p>
                                
                            </div>

                        </div>
			<div class="row order_row">
				
				<div class="col-md-7" style="height:100%">
                    <!-- <div class="row">
                        <div class="col-md-12" style="height:30px;">
                            <h1 class="hidden">Secure Checkout</h1>
                        </div>
                    </div> -->
                    <div class="order-detail-cont" >
                        
                        
                        <section id="new-customer" style="z-index: 1; position: relative;" ng-if="existing == 0" ng-if="!client">
                            <div class="hidden-md hidden-lg " style=" padding: 0;margin-bottom: 12px;">
                                <h2 class="event underlined big">{$event_name}</h2>
                                <div class="date">{$event_date}</div>
                                <div class="location">{$venue_name}, {$venue_location}</div>
                                <div class="seats">Section {$ticket_section}, Row {$ticket_row}</div>
                            </div>
                            <div class="row" ng-if="!client" >
                                <div class="col-md-12 text-right" style="margin-top: 20px;">
                                    <p id="already_acc">Already have an account? Please <a href="/member/login">login</a> before proceeding.</p>
                                </div>

                            </div>
                            <div ng-if="!client">
                                <!--h2 class="underlined big">How Many Tickets?</h2-->
                                <!--div class="form-group">
                                    <select id="qty" name="qty" class="form-control" ng-model="data.qty" ng-options="split for split in order_data.splits" ng-change="updateTotals()"></select>
                                </div-->
                                <h2 class="underlined big" >Contact Information <span class="hidden" style="font-size: 15px; margin-left: 10px;"><a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="To claim your Good Game Guarantee refund a login and password must be created">WHY?</a></span></h2> 
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="email">Email <span>*</span></label> -->
                                            <input type="email" id="email" name="email" class="form-control" ng-model="data.email" ng-required="true" placeholder="Email *" />
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="email2">Confirm Email <span>*</span></label> -->
                                            <input type="email" id="email2" name="email2" class="form-control" ng-model="data.email2" ng-required="true" placeholder="Confirm Email *"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row hidden">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="password">Create Password <span>*</span></label> -->
                                            <input type="password" id="password" name="password" class="form-control" ng-model="data.password" ng-required="false" placeholder="Create Password *" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 hidden">
                                        <div class="form-group">
                                            <!-- <label for="password2">Confirm Password <span>*</span></label> -->
                                            <input type="password" id="password2" name="password2" class="form-control" ng-model="data.password2" ng-required="false" placeholder="Confirm Password *"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="checkbox hidden">
                                    <label><input type="checkbox" ng-model="data.optin" ng-true-value="1" ng-false-value="0">I would like to receive special promotions and updates.</label>
                                </div>
                            </div>
                            
                            <h2 class="underlined big" style="height: 30px;"">Payment Information <img src="/assets/img/icon-credit-cars.png" style="height: 23px;float: right;"></h2>
                            <h2 class="hidden">Credit Card Information</h2>
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <!-- <label for="card_number">Credit Card Number <span>*</span></label> -->
                                        <input type="text" id="card_number" name="card_number" class="form-control" ng-model="data.card_number" ng-required="true" placeholder="Credit Card Number *" />
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <!-- <label for="card_cvv2">CVV2 Code <span>*</span></label> -->
                                        <input type="text" id="card_cvv2" name="card_cvv2" class="form-control" ng-model="data.card_cvv2" ng-required="true" placeholder="CVV2 Code *" />
                                    </div>
                                </div> 
                            </div> 
                            <div class="row" style="margin-top:10px;">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <!-- <label for="card_exp_month">Exp. Month <span>*</span></label> -->
                                        <select id="card_exp_month" name="card_exp_month" class="form-control" ng-model="data.card_exp_month" ng-required="true" >
                                            <option value="" disabled selected>Exp. Month *</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <!-- <label for="card_exp_year">Exp. Year <span>*</span></label> -->
                                        <select id="card_exp_year" name="card_exp_year" class="form-control" ng-model="data.card_exp_year" ng-required="true">
                                            <option value="" disabled selected>Exp. Year *</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 text-center" style="margin-top: -3px;">
                                    <span id="siteseal">
                                        <script type="text/javascript" src="https://seal.godaddy.com/getSeal?sealID=qGUZ4cVXP8fzh4gJM9WNOM8Lhm3GV8MAOuZcgI4ynEm7EcjgKcT8zguOJYzw"></script>
                                    </span>
                                    <script src="https://cdn.ywxi.net/js/inline.js?w=96"></script>
                                </div>
                            </div>
                            
                            <!--
                            <input type="checkbox" id="store_card" name="store_card" ng-model="data.store_card" ng-true-value="1" ng-false-value="0" /> Store my information in our secure system for future purchases. -->
                            <h2 class="underlined big" class="hidden">Billing Address</h2>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <!-- <label for="bfirstname">First Name <span>*</span></label> -->
                                        <input type="text" id="bfirstname" name="bfirstname" class="form-control" ng-model="data.bfirstname" ng-required="true" placeholder="First Name *" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <!-- <label for="blastname">Last Name <span>*</span></label> -->
                                        <input type="text" id="blastname" name="blastname" class="form-control" ng-model="data.blastname" ng-required="true" placeholder="Last Name *" />
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <!-- <label for="baddress1">Address <span>*</span></label> -->
                                        <input type="text" id="baddress1" name="baddress1" class="form-control" ng-model="data.baddress1" ng-required="true" placeholder="Address *" />
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <!-- <label for="baddress2" class="optional">Address Line 2</label> -->
                                        <input type="text" id="baddress2" name="baddress2" class="form-control" ng-model="data.baddress2" placeholder="Address Line 2" />
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <!-- <label for="bcity">City <span>*</span></label> -->
                                        <input type="text" id="bcity" name="bcity" class="form-control" ng-model="data.bcity" ng-required="true" placeholder="City *" />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <!-- <label for="bstate">State <span>*</span></label> -->
                                        <select id="bstate" name="bstate" class="form-control" ng-model="data.bstate" ng-required="true">
                                            <option value="" disabled selected>State *</option>
                                            <option value="AL">AL</option>
                                            <option value="AK">AK</option>
                                            <option value="AZ">AZ</option>
                                            <option value="AR">AR</option>
                                            <option value="CA">CA</option>
                                            <option value="CO">CO</option>
                                            <option value="CT">CT</option>
                                            <option value="DE">DE</option>
                                            <option value="DC">DC</option>
                                            <option value="FL">FL</option>
                                            <option value="GA">GA</option>
                                            <option value="HI">HI</option>
                                            <option value="ID">ID</option>
                                            <option value="IL">IL</option>
                                            <option value="IN">IN</option>
                                            <option value="IA">IA</option>
                                            <option value="KS">KS</option>
                                            <option value="KY">KY</option>
                                            <option value="LA">LA</option>
                                            <option value="ME">ME</option>
                                            <option value="MD">MD</option>
                                            <option value="MA">MA</option>
                                            <option value="MI">MI</option>
                                            <option value="MN">MN</option>
                                            <option value="MS">MS</option>
                                            <option value="MO">MO</option>
                                            <option value="MT">MT</option>
                                            <option value="NE">NE</option>
                                            <option value="NV">NV</option>
                                            <option value="NH">NH</option>
                                            <option value="NJ">NJ</option>
                                            <option value="NM">NM</option>
                                            <option value="NY">NY</option>
                                            <option value="NC">NC</option>
                                            <option value="ND">ND</option>
                                            <option value="OH">OH</option>
                                            <option value="OK">OK</option>
                                            <option value="OR">OR</option>
                                            <option value="PA">PA</option>
                                            <option value="RI">RI</option>
                                            <option value="SC">SC</option>
                                            <option value="SD">SD</option>
                                            <option value="TN">TN</option>
                                            <option value="TX">TX</option>
                                            <option value="UT">UT</option>
                                            <option value="VT">VT</option>
                                            <option value="VA">VA</option>
                                            <option value="WA">WA</option>
                                            <option value="WV">WV</option>
                                            <option value="WI">WI</option>
                                            <option value="WY">WY</option>
                                            <option value="AS">AS</option>
                                            <option value="GU">GU</option>
                                            <option value="MP">MP</option>
                                            <option value="PR">PR</option>
                                            <option value="UM">UM</option>
                                            <option value="VI">VI</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <!-- <label for="bzipcode">Zip Code <span>*</span></label> -->
                                        <input type="text" id="bzipcode" name="bzipcode" class="form-control" ng-model="data.bzipcode" ng-required="true" placeholder="Zip Code *" />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <!-- <label for="phone">Phone Number <span>*</span></label> -->
                                        <input type="text" id="phone" name="phone" class="form-control" ng-model="data.phone" ng-required="true" placeholder="Phone Number *" />
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div class="row">
                                <!--div class="col-md-3">
                                    <div class="form-group">
                                        <label for="phone_cc">Country Code</label>
                                        <input type="text" id="phone_cc" name="phone_cc" class="form-control" ng-model="data.phone_cc" />
                                    </div>
                                </div-->
                                <!--div class="col-md-3">
                                    <div class="form-group">
                                        <label for="phone_ext" class="optional">Extension</label>
                                        <input type="text" id="phone_ext" name="phone_ext" class="form-control" ng-model="data.phone_ext" />
                                    </div>
                                </div-->
                            </div>
                            
                        </section>
                        <section id="existing-customer" style="z-index: 1; position: relative;" ng-if="existing == 1">
                            <!--h2 class="underlined big">How Many Tickets?</h2-->
                                <!--div class="form-group">
                                    <select id="qty" name="qty" class="form-control" ng-model="data.qty" ng-options="split for split in order_data.splits" ng-change="updateTotals()"></select>
                                </div-->
                            <div class="hidden-md hidden-lg " style=" padding: 0;margin-bottom: 12px;">
                                <h2 class="event underlined big">{$event_name}</h2>
                                <div class="date">{$event_date}</div>
                                <div class="location">{$venue_name}, {$venue_location}</div>
                                <div class="seats">Section {$ticket_section}, Row {$ticket_row}</div>
                            </div>
                            <h2 class="underlined big">Shipping Information</h2>
                            <div id="shipping_holder" ng-show="!toggle_edit.shipping">
                                <div class="clearfix">
                                    <div class="pull-right"><a class="button medium gray" ng-click="toggleEdit('shipping')">Edit</a></div>
                                    -!shipping_address.name!-<br />
                                    -!shipping_address.street_address!-<br />
                                    -!shipping_address.locality!-, -!shipping_address.region!- -!shipping_address.postal_code!-
                                </div>
                            </div>
                            <div id="shipping_edit" ng-show="toggle_edit.shipping && !toggle_add.shipping">
                                <h2 class="underlined big">Your Stored Addresses</h2>
                                <ul>
                                    <li ng-repeat="a in addresses"><label><input type="radio" id="shipping_address_id--!a.id!-" name="shipping_address_id" value="-!a.id!-" ng-model="data.shipping_address_id" /> <strong>-!a.name!-</strong>, -!a.street_address!-, -!a.locality!-, -!a.region!- -!a.postal_code!- -!a.country_code!-</label></li>
                                    <li><a ng-click="toggleAdd('shipping')"><i class="fa fa-plus"></i> Add a new address</a></li>
                                </ul>
                                <div class="change_buttons"><a class="button green medium" ng-click="setShippingAddress()">Update</a> <a ng-click="toggleEdit('shipping')">Cancel</a></div>
                            </div>
                            <div id="add_shipping_address" ng-show="toggle_add.shipping">
                                <h2 class="underlined big">Add a New Address</h2>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="sfirstname">First Name <span>*</span></label> -->
                                            <input type="text" id="sfirstname" name="sfirstname" class="form-control" ng-model="sdata.firstname" placeholder="First Name *" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="slastname">Last Name <span>*</span></label> -->
                                            <input type="text" id="slastname" name="slastname" class="form-control" ng-model="sdata.lastname" placeholder="Last Name *" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <!-- <label for="saddress1">Address <span>*</span></label> -->
                                    <input type="text" id="saddress1" name="saddress1" class="form-control" ng-model="sdata.address1" placeholder="Address *" />
                                </div>
                                <div class="form-group">
                                    <!-- <label for="saddress2" class="optional">Address Line 2</label> -->
                                    <input type="text" id="saddress2" name="saddress2" class="form-control" ng-model="sdata.address2" placeholder="Address Line 2" />
                                </div>
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <!-- <label for="scity">City <span>*</span></label> -->
                                            <input type="text" id="scity" name="scity" class="form-control" ng-model="sdata.city" placeholder="City *" />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <!-- <label for="sstate">State <span>*</span></label> -->
                                            <select id="sstate" name="sstate" class="form-control" ng-model="sdata.state">
                                                <option value="" disabled selected>State *</option>
                                                <option value="AL">AL</option>
                                                <option value="AK">AK</option>
                                                <option value="AZ">AZ</option>
                                                <option value="AR">AR</option>
                                                <option value="CA">CA</option>
                                                <option value="CO">CO</option>
                                                <option value="CT">CT</option>
                                                <option value="DE">DE</option>
                                                <option value="DC">DC</option>
                                                <option value="FL">FL</option>
                                                <option value="GA">GA</option>
                                                <option value="HI">HI</option>
                                                <option value="ID">ID</option>
                                                <option value="IL">IL</option>
                                                <option value="IN">IN</option>
                                                <option value="IA">IA</option>
                                                <option value="KS">KS</option>
                                                <option value="KY">KY</option>
                                                <option value="LA">LA</option>
                                                <option value="ME">ME</option>
                                                <option value="MD">MD</option>
                                                <option value="MA">MA</option>
                                                <option value="MI">MI</option>
                                                <option value="MN">MN</option>
                                                <option value="MS">MS</option>
                                                <option value="MO">MO</option>
                                                <option value="MT">MT</option>
                                                <option value="NE">NE</option>
                                                <option value="NV">NV</option>
                                                <option value="NH">NH</option>
                                                <option value="NJ">NJ</option>
                                                <option value="NM">NM</option>
                                                <option value="NY">NY</option>
                                                <option value="NC">NC</option>
                                                <option value="ND">ND</option>
                                                <option value="OH">OH</option>
                                                <option value="OK">OK</option>
                                                <option value="OR">OR</option>
                                                <option value="PA">PA</option>
                                                <option value="RI">RI</option>
                                                <option value="SC">SC</option>
                                                <option value="SD">SD</option>
                                                <option value="TN">TN</option>
                                                <option value="TX">TX</option>
                                                <option value="UT">UT</option>
                                                <option value="VT">VT</option>
                                                <option value="VA">VA</option>
                                                <option value="WA">WA</option>
                                                <option value="WV">WV</option>
                                                <option value="WI">WI</option>
                                                <option value="WY">WY</option>
                                                <option value="AS">AS</option>
                                                <option value="GU">GU</option>
                                                <option value="MP">MP</option>
                                                <option value="PR">PR</option>
                                                <option value="UM">UM</option>
                                                <option value="VI">VI</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <!-- <label for="szipcode">Zip Code <span>*</span></label> -->
                                            <input type="text" id="szipcode" name="szipcode" class="form-control" ng-model="sdata.zipcode" placeholder="Zip Code *" />
                                        </div>
                                    </div>
                                </div>
                                <div class="change_buttons"><a ladda="processing_shipping_address" class="button green medium" ng-click="addShippingAddress()">Submit</a> <a ng-click="toggleAdd('shipping')">Cancel</a></div>
                            </div>
                            <h2 class="underlined big">Payment Method</h2>
                            <div ng-if="!has_card">
                                <h2 class="underlined big">Credit Card Information</h2>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="card_number">Credit Card Number <span>*</span></label> -->
                                            <input type="text" id="card_number" name="card_number" class="form-control" ng-model="data.card_number" ng-required="true" placeholder="Credit Card Number *" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <!-- <label for="card_exp_month">Exp. Month <span>*</span></label> -->
                                            <select id="card_exp_month" name="card_exp_month" class="form-control" ng-model="data.card_exp_month" ng-required="true">
                                                <option value="" disabled selected>Exp. Month *</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <!-- <label for="card_exp_year">Exp. Year <span>*</span></label> -->
                                            <select id="card_exp_year" name="card_exp_year" class="form-control" ng-model="data.card_exp_year" ng-required="true">
                                                <option value="" disabled selected>Exp. Year *</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <!-- <label for="card_cvv2">CVV2 Code <span>*</span></label> -->
                                            <input type="text" id="card_cvv2" name="card_cvv2" class="form-control" ng-model="data.card_cvv2" ng-required="true" placeholder="CVV2 *" />
                                        </div>
                                    </div>
                                </div>
                                <!--
                                <input type="checkbox" id="store_card" name="store_card" ng-model="data.store_card" ng-true-value="1" ng-false-value="0" /> Store my information in our secure system for future purchases. -->
                            </div>
                            <div ng-if="has_card">
                                <div class="clearfix" ng-show="!toggle_edit.credit">
                                    <div class="pull-right"><a class="button medium gray" ng-click="toggleEdit('credit')">Edit</a></div>
                                    <img ng-src="/assets/img/icon--!credit_card.card_company|lowercase!-.png" alt="-!credit_card.card_company!-" /> -!credit_card.card_company!- ending in -!credit_card.last_digits!-
                                </div>
                                <div id="card_options" ng-show="toggle_edit.credit && !toggle_add.credit">
                                    <h2 class="underlined big">Your Stored Credit Cards</h2>
                                    <ul>
                                        <li class="header">
                                            <div class="row">
                                                <div class="col-md-6">Credit Card</div>
                                                <div class="col-md-4">Name on Card</div>
                                                <div class="col-md-2">Exp. Date</div>
                                            </div>
                                        </li>
                                        <li class="item" ng-repeat="cc in credit_cards">
                                            <div class="row">
                                                <div class="col-md-6"><label><input type="radio" id="card_id-!cc.id!-" name="card_id" value="-!cc.id!-" ng-model="data.card_id" /> <img ng-src="/assets/img/icon--!cc.card_company|lowercase!-.png" alt="-!cc.card_company!-" /> -!cc.card_company!- ending in -!cc.last_digits!-</div>
                                                <div class="col-md-4">-!cc.name!-</div>
                                                <div class="col-md-2">-!cc.expiration_month!-/-!cc.expiration_year!-</div>
                                            </div>
                                        </li>
                                        <li class="item">
                                            <div class="row">
                                                <div class="col-md-6"><a ng-click="toggleAdd('credit')"><i class="fa fa-plus"></i> Add a new credit card</a></div>
                                                <div class="col-md-4"></div>
                                                <div class="col-md-2"></div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="change_buttons"><a class="button green medium" ng-click="setCreditCard()">Update</a> <a ng-click="toggleEdit('credit')">Cancel</a></div>
                                </div>
                                <div id="add_new_card" ng-show="toggle_add.credit">
                                    <h2 class="underlined big">Add New Credit Card</h2>
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <!-- <label for="card_number">Credit Card Number <span>*</span></label> -->
                                                <input type="text" id="card_number" name="card_number" class="form-control" ng-model="cdata.card_number" placeholder="Credit Card Number *" />
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <!-- <label for="card_cvv2">CVV2 Code <span>*</span></label> -->
                                                <input type="text" id="card_cvv2" name="card_cvv2" class="form-control" ng-model="cdata.card_cvv2" placeholder="CVV2 Code *" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <!-- <label for="card_exp_month">Exp. Month <span>*</span></label> -->
                                                <select id="card_exp_month" name="card_exp_month" class="form-control" ng-model="cdata.card_exp_month">
                                                    <option value="" disabled selected>Exp. Month *</option>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="card_exp_year">Exp. Year <span>*</span></label>
                                                <select id="card_exp_year" name="card_exp_year" class="form-control" ng-model="cdata.card_exp_year">
                                                    <option value="" disabled selected>Exp. Year *</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2028">2028</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <div class="change_buttons"><a ladda="processing_credit_card" class="button green medium" ng-click="addCreditCard()">Submit</a> <a ng-click="toggleAdd('credit')">Cancel</a></div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div id="billing_address">
                                <div id="billing_holder" ng-show="!toggle_edit.billing">
                                    <strong>Billing Address:</strong> -!billing_address.name!-</strong>, -!billing_address.street_address!-, -!billing_address.locality!-, -!billing_address.region!- -!billing_address.postal_code!- -!billing_address.country_code!- <a ng-click="toggleEdit('billing')">Change</a>
                                </div>
                                <div id="billing_edit" ng-show="toggle_edit.billing && !toggle_add.billing">
                                    <h2 class="underlined big">Your Stored Addresses</h2>
                                    <ul>
                                        <li ng-repeat="a in addresses"><label><input type="radio" id="billing_address_id--!a.id!-" name="billing_address_id" value="-!a.id!-" ng-model="data.billing_address_id" /> <strong>-!a.name!-</strong>, -!a.street_address!-, -!a.locality!-, -!a.region!- -!a.postal_code!- -!a.country_code!-</label></li>
                                        <li><a ng-click="toggleAdd('billing')"><i class="fa fa-plus"></i> Add a new address</a></li>
                                    </ul>
                                    <div class="change_buttons"><a class="button green medium" ng-click="setBillingAddress()">Update</a> <a ng-click="toggleEdit('billing')">Cancel</a></div>
                                </div>
                            </div>
                            <div id="add_billing_address" ng-show="toggle_add.billing">
                                <h2 class="underlined big">Add a New Address</h2>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="bfirstname">First Name <span>*</span></label> -->
                                            <input type="text" id="bfirstname" name="bfirstname" class="form-control" ng-model="bdata.firstname" placeholder="First Name *" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <!-- <label for="blastname">Last Name <span>*</span></label> -->
                                            <input type="text" id="blastname" name="blastname" class="form-control" ng-model="bdata.lastname" placeholder="Last Name *" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <!-- <label for="baddress1">Address <span>*</span></label> -->
                                    <input type="text" id="baddress1" name="baddress1" class="form-control" ng-model="bdata.address1" placeholder="Address *" />
                                </div>
                                <div class="form-group">
                                    <!-- <label for="baddress2" class="optional">Address Line 2</label> -->
                                    <input type="text" id="baddress2" name="baddress2" class="form-control" ng-model="bdata.address2" placeholder="Address Line 2" />
                                </div>
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <!-- <label for="bcity">City <span>*</span></label> -->
                                            <input type="text" id="bcity" name="bcity" class="form-control" ng-model="bdata.city" placeholder="City *" />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="bstate">State <span>*</span></label>
                                            <select id="bstate" name="bstate" class="form-control" ng-model="bdata.state">
                                                <option value="" disabled selected>Stateh *</option>
                                                <option value="AL">AL</option>
                                                <option value="AK">AK</option>
                                                <option value="AZ">AZ</option>
                                                <option value="AR">AR</option>
                                                <option value="CA">CA</option>
                                                <option value="CO">CO</option>
                                                <option value="CT">CT</option>
                                                <option value="DE">DE</option>
                                                <option value="DC">DC</option>
                                                <option value="FL">FL</option>
                                                <option value="GA">GA</option>
                                                <option value="HI">HI</option>
                                                <option value="ID">ID</option>
                                                <option value="IL">IL</option>
                                                <option value="IN">IN</option>
                                                <option value="IA">IA</option>
                                                <option value="KS">KS</option>
                                                <option value="KY">KY</option>
                                                <option value="LA">LA</option>
                                                <option value="ME">ME</option>
                                                <option value="MD">MD</option>
                                                <option value="MA">MA</option>
                                                <option value="MI">MI</option>
                                                <option value="MN">MN</option>
                                                <option value="MS">MS</option>
                                                <option value="MO">MO</option>
                                                <option value="MT">MT</option>
                                                <option value="NE">NE</option>
                                                <option value="NV">NV</option>
                                                <option value="NH">NH</option>
                                                <option value="NJ">NJ</option>
                                                <option value="NM">NM</option>
                                                <option value="NY">NY</option>
                                                <option value="NC">NC</option>
                                                <option value="ND">ND</option>
                                                <option value="OH">OH</option>
                                                <option value="OK">OK</option>
                                                <option value="OR">OR</option>
                                                <option value="PA">PA</option>
                                                <option value="RI">RI</option>
                                                <option value="SC">SC</option>
                                                <option value="SD">SD</option>
                                                <option value="TN">TN</option>
                                                <option value="TX">TX</option>
                                                <option value="UT">UT</option>
                                                <option value="VT">VT</option>
                                                <option value="VA">VA</option>
                                                <option value="WA">WA</option>
                                                <option value="WV">WV</option>
                                                <option value="WI">WI</option>
                                                <option value="WY">WY</option>
                                                <option value="AS">AS</option>
                                                <option value="GU">GU</option>
                                                <option value="MP">MP</option>
                                                <option value="PR">PR</option>
                                                <option value="UM">UM</option>
                                                <option value="VI">VI</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <!-- <label for="bzipcode">Zip Code <span>*</span></label> -->
                                            <input type="text" id="szipcode" name="bzipcode" class="form-control" ng-model="bdata.zipcode" placeholder="Zip Code *" />
                                        </div>
                                    </div>
                                </div>
                                <div class="change_buttons"><a ladda="processing_billing_address" class="button green medium" ng-click="addBillingAddress()">Submit</a> <a ng-click="toggleAdd('billing')">Cancel</a></div>
                            </div>
                        </section>
                        <h2 class="underlined big hidden">Tickets Ordered</h2>
                        <div class="row hidden">
                            <div class="col-md-6">
                                <strong>{$event_name}</strong><br />
                                {$event_date}<br />
                                <p>Section {$ticket_section}, Row {$ticket_row}</p>
                            </div>
                        </div>
                        <div class="row" id="badges-order">
                            <!-- <div class="row text-center">
                                <img src="/assets/img/Checkout-badge.jpg" width="100%">
                            </div>
                            <div class="row text-center" style="margin-top:10px;">
                                <img src="/assets/img/Checkout-pledge.jpg" width="100%">
                            </div> -->
                            <!-- <div class="row" style="height:100%;">
                                <div class="col-xs-12 col-md-6 left_badge">
                                    <div class="row pledge-checkout ">
                                        
                                        <div class="col-xs-4 text-center" style="padding:0"><img src="/assets/img/pledge.png" style="max-height:156px"></div>
                                        <div class="col-xs-8" style="padding-right: 0;">
                                            <h2 class="text-center" style="margin-bottom: 10px;"><strong>GAMEHEDGE PLEDGE</strong></h2>
                                            <p class="text-left"><strong>Tickets Will:</strong></p>
                                            
                                                <p class="text-left">- Always be in time for the event.</p>
                                                <p class="text-left">- Always be refunded if event is canceled & not rescheduled.</p>
                                                <p class="text-left">- Always be authentic.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-md-6 right_badge">
                                    <div class="row pledge-checkout " >
                                        <div class="col-xs-12">
                                            
                                        </div>
                                        <div class="col-xs-5 col-sm-4 col-md-5 text-center"  style="padding:0"><img src="/assets/img/badge-gamehedge.png"></div>
                                        <div class="col-xs-7 col-sm-8 col-md-7" style="padding-right: 0;">
                                            <h2 class="text-center" style="margin-bottom: 10px;margin-top:4px"><strong>GOOD GAME GUARANTEE</strong></h2>
                                            <p class="text-left"><strong>With every ticket:</strong></p>
                                            
                                            If the home team loses by 5 runs or more, GameHedge will refund 50% of your ticket price at no additional cost to you.
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="row" style="height:100%;">
                                <div class="col-xs-12 col-md-6 left_badge text-center">
                                   <img src="/assets/img/GameHedgePledgeWhiteLine.jpeg" style="width: 100%; max-width:433px;max-height:160px;">
                                </div>
                                <div class="col-xs-12 col-md-6 right_badge text-center">
                                    <img src="/assets/img/GGGBigWhiteLine.jpeg" style="width: 100%; max-width:433px;max-height:160px;">
                                </div>
                            </div>
                        </div>
                        <!-- <section id="co-order-submit">
                            <div class="row vertical-align-bottom" style="align-items: flex-start;">
                                <div class="col-md-8 left-section">
                                    <!-- <div class="checkbox">
                                      <label><input type="checkbox" ng-model="data.optin" ng-true-value="1" ng-false-value="0">I would like to receive special promotions and updates.</label>
                                    </div> 
                                    <div class="checkbox">
                                      <label><input type="checkbox" ng-model="accept_terms" ng-true-value="1" ng-false-value="0">I agree to GameHedge's <a target="_blank" href="/our-terms">terms and conditions</a>.</label>
                                    </div>
                                    <div class="checkbox hidden">
                                      <label><input type="checkbox" style="visibility: hidden;">I may be ordering tickets above or below face value. All sales are final.</label>
                                    </div>
                                    <!--p>Please verify your order details, and click &quot;Submit Order&quot; to complete the order process.</p
                                </div>
                                <div class="col-md-4">
                                    <div class="text-right">
                                        <div class="final-total" style="color:black;">
                                            <strong>Total -! total|currency !- </strong>
                                            <!--div ng-bind="total|currency"></div
                                        </div>
                                        <button ladda="procesingOrder" class="button green" ng-disabled="toggle_edit['shipping'] == 1 || toggle_edit['billing'] == 1 || toggle_edit['credit'] == 1">
                                            Submit Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section> 
                        <br>
                        <!--p><strong>Please Note: Gamehedge is a resale ticket marketplace, not the ticket seller. Prices are set by third-party sellers and may be above or below face value.</p-->
                        <div class="row vertical-align hidden">
                            <div class="col-md-4 text-center"><img src="/assets/img/badge-gamehedge.png" width="150"></div>
                            <div class="col-md-8"><p style="font-weight: 100;">All GameHedge tickets come with our exclusive Good Game Guarantee at no additional cost to you. So, if the home losses by 5 runs or more, we will refund 50% of the cost of your ticket.</p></div>
                        </div>
                    </div>
                    
                        
				</div>
                <div class="col-md-5"  style="height:100%">
                    
                    <!-- <div class="row">
                        <div class="col-md-12" style="height:30px;"m>
                            <h1 class="hidden">Secure Checkout</h1>
                        </div>
                    </div> -->
                    
                    <div id="co-ticket-details-div"  style="height:100%">
                        <section class="order-detail-cont">
                            <div class="hidden-xs hidden-sm col-md-12" style=" padding: 0;margin-bottom: 12px;">
                                <h2 class="event underlined big">Event Details</h2>
                                <div>{$event_name}</div>
                                <div class="date">{$event_date}</div>
                                <div class="location">{$venue_name}, {$venue_location}</div>
                                <div class="seats">Section {$ticket_section}, Row {$ticket_row}</div>
                            </div>
                            <h2 class="underlined big">Order Summary</h2>
                            <div class="row order-detail">
                                <div class="col-xs-6">Ticket Price</div>
                                <div class="col-xs-6 text-right"><span ng-bind="order_data.price|currency"></span> ea.</div>
                            </div>
                            <div class="row order-detail" style="margin-top:5px; margin-bottom: 5px;">
                                <div class="col-xs-8">Quantity</div>
                                <div class="col-xs-4">
                                    <select style="height:28px;" id="qty" name="qty" class="form-control" ng-model="data.qty" ng-options="split for split in order_data.splits" ng-change="updateTotals()"></select>
                                </div>
                                <!--div class="col-md-6 text-right" ng-bind="data.qty"></div-->
                            </div>

                                
                            <div class="row order-detail">
                                <div class="col-xs-6">Subtotal</div>
                                <div class="col-xs-6 text-right" ng-bind="subtotal|currency"></div>
                            </div>
                            <hr />
                            <div class="row order-detail">
                                <div class="col-xs-6">Service Fee</div>
                                <div class="col-xs-6 text-right" ng-bind="data.fee|currency"></div>
                            </div>
                            <!--div class="row">
                                <div class="col-md-6">Tax</div>
                                <div class="col-md-6 text-right">--</div>
                            </div-->

                            <div class="row order-detail" ng-show="data.ticket_format == 'Eticket'" style="margin-top:5px; margin-bottom: 5px;">
                                <div class="col-xs-6">Shipping</div>
                                <div class="col-xs-6 text-right">Email Delivery</div>
                            </div>

                            <div class="row order-detail" ng-show="data.ticket_format == 'Physical'" style="margin-top:5px; margin-bottom: 5px;">
                                <div class="col-xs-6">Shipping Option</div>
                                <div class="col-xs-6">
                                    <select style="height:28px;" class="form-control" name="shipping_option" ng-model="data.shipping_option" ng-change="setShipping()">
                                        <option ng-repeat="s in shipping_data" value="-!s.id!-" ng-if="s.id == '67797' || s.id == '67791'">-!s.price|currency!- -!s.name!-</option>
                                    </select>
                                    <!--div id="shipping_options">
                                        <ul>
                                            <li ng-repeat="s in shipping_data"><label><input type="radio" id="shipping_option-!s.id!-" name="shipping_option" value="-!s.id!-" ng-model="data.shipping_option" ng-change="setShipping()" /> -!s.price|currency!- -!s.name!-</label></li>
                                        </ul>
                                    </div-->
                                </div>
                            </div>
                           
                            <div class="row hidden order-detail">
                                <div class="col-xs-6">Shipping</div>
                                <div class="col-xs-6 text-right" ng-bind="shipping.price|currency"></div>
                            </div>
                            <div class="row order-detail" style="margin-top:5px; margin-bottom: 5px;">
                                <div class="col-xs-6">Good Game Guarantee</div>
                                <div class="col-xs-6 text-right">Free!</div>
                            </div>
                            {if $ticket_in_hand eq 0}
                                
                                <div class="row order-detail">
                                    <div class="col-md-4">Notes:</div>
                                    <div class="col-md-8 text-right">{$ticket_notes}</div>
                                </div>
                            {/if}
                            <div class="row order-detail" style="margin-top:5px; margin-bottom: 5px;">
                                <div class="col-xs-6"><a ng-click="show_promo()">Promo code?</a></div>
                                <div class="col-xs-6 text-right" id="promo_value"></div>
                            </div>
                            <div class="row order-detail" style="margin-top:5px; margin-bottom: 5px;" ng-show="show_prom">
                                <div class="col-xs-6">
                                    <input style="height:28px;" id="promo_code" name="promo_code" class="form-control" ng-model="data.current_code" ng-change="checkPromos()" placeholder="Promo code">
                                </div>
                            </div>
                            <hr />
                            
                            <div class="row order-detail" style="margin-top:5px; margin-bottom: 5px;">
                                <div class="col-xs-9">
                                    <div class="checkbox" style="margin-top:0;margin-bottom:20px;">
                                      <label style="margin-top:3z;"><input type="checkbox" ng-model="accept_terms" ng-true-value="1" ng-false-value="0">I agree to GameHedge's <a target="_blank" href="/our-terms">terms and conditions</a>.</label>
                                    </div>
                                    <div class="checkbox hidden">
                                      <label><input type="checkbox" style="visibility: hidden;">I may be ordering tickets above or below face value. All sales are final.</label>
                                    </div>
                                </div>
                                <div class="col-xs-3 text-right" style="font-size:14px;"><strong>Total -!total|currency!- </strong></div>
                                <div class="col-xs-12 text-center">
                                    <button ladda="procesingOrder" class="button green" ng-disabled="toggle_edit['shipping'] == 1 || toggle_edit['billing'] == 1 || toggle_edit['credit'] == 1">
                                            Submit Order
                                    </button>
                                </div>
                            </div>
                            
                            
                        </section>
                        
                        
                    </div>
                </div>
			</div>
		</form>
	</div>
</main>
<iframe frameborder="0" height="1" scrolling="no" src="/order/ks" width="1"></iframe>

<footer>
    <div class="container">
        <div class="footer-bottom clearfix">
            Copyright {$year}: GameHedge, LLC &middot; All Rights Reserved.
            <div class="pull-right">
                <nav role="navigation">
                    <a href="/privacy-policy">Privacy Policy</a> | <a href="/our-terms">Terms</a>
                </nav>
            </div>
        </div>
    </div>
</footer>
<div growl></div>
<script src="/assets/js/bundle.min.js"></script>
<script src="/assets/js/bootstrap.min.js"></script>
{$fscripts}
<script src="/assets/js/site.js?v121"></script>
<script type="text/javascript" src="https://cdn.ywxi.net/js/1.js" async></script>

{literal}
    <!-- begin olark code -->
<script data-cfasync="false" type='text/javascript'>/*<![CDATA[*/window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){
f[z]=function(){
(a.s=a.s||[]).push(arguments)};var a=f[z]._={
},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){
f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={
0:+new Date};a.P=function(u){
a.p[u]=new Date-a.p[0]};function s(){
a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){
hd="head";return["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if(!m){
return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){
b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{
b.contentWindow[g].open()}catch(w){
c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{
var t=b.contentWindow[g];t.write(p());t.close()}catch(x){
b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})({
loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});
/* custom configuration goes here (www.olark.com/documentation) */
olark.identify('2065-539-10-9682');/*]]>*/</script><noscript><a href="https://www.olark.com/site/2065-539-10-9682/contact" title="Contact us" target="_blank">Questions? Feedback?</a> powered by <a href="http://www.olark.com?welcome" title="Olark live chat software">Olark live chat software</a></noscript>
<!-- end olark code -->

<!-- Twitter universal website tag code -->
<script src="//platform.twitter.com/oct.js" type="text/javascript"></script>
<script type="text/javascript">twttr.conversion.trackPid('nuys0', { tw_sale_amount: 0, tw_order_quantity: 0 });</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://analytics.twitter.com/i/adsct?txn_id=nuys0&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />
<img height="1" width="1" style="display:none;" alt="" src="//t.co/i/adsct?txn_id=nuys0&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />
</noscript>
<!-- End Twitter universal website tag code -->
<!-- Bing Adds -->
<script>(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"5255950"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");</script><noscript><img src="//bat.bing.com/action/0?ti=5255950&Ver=2" height="0" width="0" style="display:none; visibility: hidden;" /></noscript>
<!-- End Bing Adds -->
<!-- Facebook Pixel Code -->  
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '1221171167912729');
fbq('track', "PageView");</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1221171167912729&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->

{/literal}
