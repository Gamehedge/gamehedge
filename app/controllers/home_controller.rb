class HomeController < ApplicationController
	
  def index
  	
	# Update dates for events
	
	#render json: Php.unserialize(Order.where(te_order_id: 3074944).first.order_data) #=> {"foo"=>"bar"}
	# @events = Order.all
	# @events.each do |event|
	# 	date = DateTime.strptime(event.event_date, '%Y-%m-%dT%H:%M:%SZ')
	# 	event.real_event_date = date
	# 	event.save
	# end
	# render json: "success"
	#render json: Php.unserialize(@event) #=> {"foo"=>"bar"}
	#Populate performers script
	
	# @performers = @connection.performers.list({:category_id => 21})
	# @count = 0
	# @performers.each do |performer|
	#    	@client = Performer.where(te_name: performer["name"]).take
	#    	if @client == nil
	#    		Performer.create(te_name: performer["name"], te_slug: performer["slug"], te_uid: performer["id"])
	#    		@count += 1
	#    	end
	   
	# end
	# render json: @count 
	# @list = ["NFC East", "NFC North", "NFC South", "NFC West", "AFC East", "AFC North", "AFC South", "AFC West"]
	# @list.each do |performer|
	# 	Division.create(name: performer, sport_id: 3)
	# end
	#Update passwords from old database
	
	# @users = Client.all()

	# @users.each do |user|
	#   user.password = user.temporal_pass
	# 	user.password_confirmation = user.temporal_pass
	# 	user.save
	# end

	# Update order statuses from tevo

	# @connection = TicketEvolution::Connection.new({
	#   	:token => '5bfd4b6110681d224a8c1fa6333f375f',       # => (required) The API token, used to identify you
	#   	:secret => 'g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi',      # => (required) The API secret, used to sign requests
	#                       #               More info: [http://developer.ticketevolution.com/signature_tool](http://developer.ticketevolution.com/signature_tool))
	#   	:version => 9,      # => (required) API version to use - the correct version at the time of this writing is 9
	#   	:mode => :production,  # => (optional) Specifies the server environment to use Valid options: :production or :sandbox
	#   	:logger => nil      # => (optional) Object to use for logging requests and
	#                       #               responses. Any 'Logger' instance object
	#                       #               is valid. EX: Logger.new('log/te_api.log')
	# })
	
	# @orders = Order.all
	# @orders.each do |order|
	# 	@order = @connection.orders.show(order.te_order_id)
	# 	if @order['state'] != "canceled" && @order['state'] != "rejected" && @order['state'] != "completed"
	# 		order.order_status = @order['state']
	# 		order.save
	# 	end
	# end
	# render json: "success"
  end
end
