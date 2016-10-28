class OrdersController < ApplicationController
	def show
		@leagueList = Sport.where(active: true)
		@divisions_menu = Division.all
		@performers_menu = Performer.all
	end
	def create
		@user_id = request.POST["user_id"]
		@billing_address_id = request.POST["billing_address_id"]
		@ship_address_id = request.POST["ship_address_id"]
		@credit_card_id = request.POST["credit_card_id"]
		@quantity = request.POST["quantity"]
		@ticket_group_id = request.POST["ticket_group_id"]
		@price = request.POST["price"]
		@ticket_group_signature = request.POST["ticket_group_signature"]
		@type = request.POST["type"]
		@service_type = request.POST["service_type"]
		@ship_to_name = request.POST["ship_to_name"]
		@amount = request.POST["amount"]
		@email_address_id = request.POST["email_address_id"]
		@pay_type = request.POST["pay_type"]
		@shipment_price = request.POST["shipment_price"]
		@session_id = request.POST["session_id"]
		@user_agent = request.POST["user_agent"]
		@selectedPhone = request.POST["selectedPhone"]
		@event_id = request.POST["event_id"]
		@event_occurs_at = request.POST["event_occurs_at"]
		@event_name = request.POST["event_name"]
		@event_location = request.POST["event_location"]
		@section = request.POST["section"]
		@row = request.POST["row"]
		@cost = request.POST["cost"]
		@ticket_type = request.POST["ticket_type"]
		@service_fee = request.POST["service_fee"]
		@ticket_format = request.POST["ticket_format"]
		@discount = request.POST["discount"]
		@subtotal = request.POST["subtotal"]
		@email = request.POST["email"]
		@broker_name = request.POST["broker_name"]
		@cc_last_digits = request.POST["cc_last_digits"]
		@address = request.POST["address"]
		@phone_number = request.POST["phone_number"]
		@event_home_team = request.POST["event_home_team"]
		@event_away_team = request.POST["event_away_team"]
		@event_te_uid = request.POST["event_te_uid"]
		@ticket_notes = request.POST["ticket_notes"]
		@sport_id = request.POST["sport_id"]
		
        
        @order = TicketEvolutionService.new({id: @user_id}).createShipment({ address_id: @ship_address_id, 
        	billing_address_id: @billing_address_id, 
        	credit_card_id: @credit_card_id, 
        	event_id: @event_id, 
        	section: @section, 
        	row: @row, 
        	ticket_type: @ticket_type, 
        	quantity: @quantity, 
        	ticket_group_id: @ticket_group_id, 
        	price: @price, 
        	ticket_group_signature: @ticket_group_signature, 
        	type: @type, 
        	service_type: @service_type, 
        	ship_to_name: @ship_to_name, 
        	amount: @amount, 
        	pay_type: @pay_type, 
        	email_address_id: @email_address_id, 
        	shipment_price: @shipment_price, 
        	session_id: @session_id, 
        	user_agent: @user_agent, 
        	created_by_ip_address: request.remote_ip, 
        	selectedPhone: @selectedPhone,
        	service_fee: @service_fee,
        	discount: @discount,
        })
        if @order["error"]
        	puts "error"
        else
        	@real_event_date = Time.parse @event_occurs_at
        	o = Order.create(
        		client_id: @user_id,
        		sport_id: @sport_id,
	         	client_name: @ship_to_name,
	         	te_order_id: @order["id"],
	         	event_name: @event_name,
	         	event_date: @event_occurs_at,
	         	event_location: @event_location,
	         	ticket_section: @section,
	         	cost: @cost,
	         	ticket_row: @row,
	         	ticket_seats: @quantity,
	         	ticket_format: @ticket_format,
	         	total: @amount,
	         	customer_email: @email,
				number_of_tickets: @quantity,
				sale_price_per_ticket: @price,
				ticket_total: @subtotal,
				broker_name: @broker_name,
				service_fee: @service_fee,
				shipping_fee: @shipment_price,
				real_event_date:  @real_event_date,
				cc_last_digits:  @cc_last_digits,
				address: @address,
				phone_number: @phone_number,
				event_home_team: @event_home_team,
				event_away_team: @event_away_team,
				discount: @discount,
				event_te_uid: @event_te_uid,
				ticket_notes: @ticket_notes,
				order_data: @order.to_s,
			)
			a = TicketEvolutionService.new({:type => "orders", :id => @order["id"]}).show
	  		o.order_status = a["state"]
	  		o.save
		end
		render json: @order
    end

    def list
    	@orders = TicketEvolutionService.new({:type => "orders", :id => request.GET["id"]}).list
  		render json: @orders
    end

    def request_refund
    	@order =  Order.where(te_order_id: request.POST["id"]).first
    	@order.refund_status_id = 3
    	@order.save
        
        OrderMailer.refund_requested(@order.id).deliver
        
    	render text: "success"
    end
end