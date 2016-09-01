class OrdersController < ApplicationController
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
		@section = request.POST["section"]
		@row = request.POST["row"]
		@cost = request.POST["cost"]
		@ticket_type = request.POST["ticket_type"]
		@service_fee = request.POST["service_fee"]
		@ticket_format = request.POST["ticket_format"]
		
        
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
        })
        if @order["error"]
        	puts "error"
        else
        	@event = Event.where(te_uid: @event_id)
	        Order.create(client_id: @user_id,
	         	client_name: @ship_to_name,
	         	te_order_id: @order["id"],
	         	event_name: @event.name,
	         	event_date: @event.occurs_at,
	         	event_location: @event.location,
	         	ticket_section: @section,
	         	cost: @cost,
	         	ticket_row: @row,
	         	ticket_seats: @quantity,
	         	ticket_format: @ticket_format,
	         	total: @amount,
	         	cost: @ship_to_name,
	         	order_data: @order.to_s,
	        )
	    end
        render json: @order
        
    end	
end